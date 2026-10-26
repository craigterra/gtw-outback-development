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

## Brand intro preview

The homepage retains the original assets/logo.svg unchanged. A silent 3.8-second intro stamps a large copy of that exact mark (640px maximum desktop, 82vw mobile), settles it into the header, then emphasises G / T / W sequentially. Navigation stays interactive. The sequence runs once per tab session on homepage entry; reloads and deeper hash links stay static. Replay and Skip intro are below the hero actions. Reduced motion shows the original logo and heading without animation. Resizing cancels the animation to avoid an incorrect landing position. Storage restrictions allow the intro to run on each fresh load.

## Hero landing preview

index.html contains the hero and compact footer only. Catalogue, setup, manufacturing notes, story introduction, merchandise, warranty and club remain together in gear.html. Homepage navigation/CTAs link to that page or its section anchors. Legacy homepage hashes for the moved sections redirect to matching gear.html anchors. The existing standalone our-story.html is preserved. This layout revision awaits release approval.

Replay intro is a high-contrast 44px control, including keyboard focus styling. In reduced motion it remains focusable and announces why the finished state is shown. Three short CSS/SVG smoke wisps rise after iron contact and disappear before the mark settles. Reduced motion disables the wisps.

The iron uses the exact original SVG paths as an open metal head, with offset depth layers, mottled rust texture, a bent mounting bracket, long forged shaft and dark wooden grip. The supplied reference is a cold rusty iron on white; it shows no burn or smoke. Scorch/contact and smoke are separately requested animation treatments. The broad backing is a soft shadow, not a rectangular brand plate.
