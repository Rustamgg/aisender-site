import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const URL = process.env.URL || 'http://localhost:4321/';
const OUT = process.env.OUT || join(__dirname, 'shots');
mkdirSync(OUT, { recursive: true });

const viewports = [
  { name: '375-mobile', width: 375, height: 812, isMobile: true },
  { name: '768-tablet', width: 768, height: 1024, isMobile: false },
  { name: '1440-desktop', width: 1440, height: 900, isMobile: false },
  { name: '1920-desktop', width: 1920, height: 1080, isMobile: false },
];

const browser = await chromium.launch();
for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
    hasTouch: vp.isMobile,
    isMobile: vp.isMobile,
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  // Full page screenshot
  await page.screenshot({
    path: join(OUT, `${vp.name}-full.png`),
    fullPage: true,
  });

  // Section-by-section
  const sections = [
    { name: 'header', sel: 'header' },
    { name: 'hero', sel: 'main > section:nth-of-type(1)' },
    { name: 'audience', sel: 'main > section:nth-of-type(2)' },
    { name: 'how', sel: 'main > section:nth-of-type(3)' },
    { name: 'features', sel: 'main > section:nth-of-type(4)' },
    { name: 'comparison', sel: 'main > section:nth-of-type(5)' },
    { name: 'cases', sel: 'main > section:nth-of-type(6)' },
    { name: 'pricing', sel: 'main > section:nth-of-type(7)' },
    { name: 'faq', sel: 'main > section:nth-of-type(8)' },
    { name: 'final-cta', sel: 'main > section:nth-of-type(9)' },
    { name: 'footer', sel: 'footer' },
  ];
  for (const s of sections) {
    const el = await page.locator(s.sel).first();
    if ((await el.count()) === 0) continue;
    try {
      await el.screenshot({ path: join(OUT, `${vp.name}-${s.name}.png`) });
    } catch (e) {
      console.warn(`Skipped ${vp.name}-${s.name}: ${e.message}`);
    }
  }

  // Detect overflow / out-of-viewport elements
  const issues = await page.evaluate((vw) => {
    const out = [];
    const all = document.querySelectorAll('main *, header *, footer *');
    for (const el of all) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      // Element extending beyond viewport horizontally
      if (r.right > vw + 1) {
        out.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className || '').toString().slice(0, 60),
          text: (el.textContent || '').trim().slice(0, 40),
          right: Math.round(r.right),
          width: Math.round(r.width),
        });
      }
    }
    return out.slice(0, 30);
  }, vp.width);
  console.log(`\n=== ${vp.name} (${vp.width}x${vp.height}) — overflow horizontal:`);
  if (issues.length === 0) console.log('  OK, no horizontal overflow');
  else for (const i of issues) console.log(`  <${i.tag}.${i.cls}> w=${i.width} right=${i.right} "${i.text}"`);

  await ctx.close();
}
await browser.close();
console.log('\nDone. Shots in', OUT);
