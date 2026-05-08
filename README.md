# AISender — лендинг

Astro + Tailwind CSS, mobile-first, 10 секций.

## Запуск

```bash
cd site
npm install
npm run dev
```

Откройте http://localhost:4321

## Сборка под продакшн

```bash
npm run build
```

Готовая статика — в `dist/`. Можно деплоить на Vercel, Netlify, Cloudflare Pages, или любой статический хостинг.

## Структура

```
src/
  layouts/
    Layout.astro          # HTML wrapper, meta, шрифты
  pages/
    index.astro           # Главная страница, импорт секций
  components/sections/
    Header.astro          # Шапка с навигацией и burger
    Hero.astro            # H1, dashboard, stats bar
    Audience.astro        # 6 отраслей (Кому подходит)
    HowItWorks.astro      # 4 шага
    Features.astro        # Bento-grid возможностей
    Comparison.astro      # Инфографика сравнения
    Cases.astro           # 3 кейса + цитата
    Pricing.astro         # 4 тарифа
    FAQ.astro             # Аккордеон
    FinalCTA.astro
    Footer.astro          # Юр. реквизиты
  styles/
    global.css            # Tailwind + кастомные классы
public/
  avatar-realestate.png   # Аватар клиента в кейсах
  favicon.svg
```

## Дизайн-токены

См. `tailwind.config.mjs`:
- `bg.dark / bg.dark-2 / bg.light / bg.footer`
- `brand.orange / brand.orange-light` (`#FF6A00 → #FF9500`)
- `accent.green / accent.red / accent.purple`
- `muted / muted.dark`
- `bg-brand-gradient-h` — горизонтальный оранжевый градиент

## Важное

- Все формы и точки сбора ПДн (имя/телефон) сейчас ведут на Telegram `@leonaisupport` — потому что компания пока не зарегистрирована в Роскомнадзоре как оператор персональных данных. До регистрации не возвращать форму с полями имя/телефон на сайт — это нарушение 152-ФЗ.
- На сайте сознательно нет упоминаний 152-ФЗ, обработки ПДн, документации API — продукт не описывается через юридические рамки до получения статуса.

## Деплой

Рекомендую Vercel:
1. Подключить репозиторий
2. Root directory: `site/`
3. Framework: Astro (определится автоматически)
4. Build: `npm run build`, output: `dist/`
