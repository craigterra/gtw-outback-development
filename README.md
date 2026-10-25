# GTW Outback development website

Static development preview for GTW Outback. Catalogue, setup planner, merchandise and founder story. Forms and photo previews remain demonstrations: no orders, messages or uploads are sent.

## Netlify

Connect this directory as the root of a private GitHub repository, suggested name `gtw-outback-development`.

- Production branch: `main`
- Base directory: leave blank
- Build command: `node build.mjs`
- Publish directory: `dist`
- Environment variables: none required

These settings are included in `netlify.toml`. Netlify can rebuild when updates reach the connected branch.

Only website files and assets are copied into `dist`; internal notes, generation prompts and local preview helpers are excluded. The `_headers` file asks search engines not to index the preview. This is not password protection. Configure the site's visitor access in Netlify if private access is required; repository visibility does not control website visibility.

## Local build

Run `node build.mjs`, then serve the `dist` folder with any static web server.

## Preview status

Supplier photographs were selected from utetraypro.com and casecase.en.alibaba.com. Product details link to their source listings. Hero and setup inspiration images are generated concepts. Final products, prices, fitment, warranty terms and manufacturing certification remain subject to confirmation.
