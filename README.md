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

## Range testing and manufacturing copy review

The experience panel uses approved forward-looking wording describing the involvement of qualified tradespeople/engineers and manufacturing partners. Before changing it to completed-tense launch claims, confirm actual testing coverage, qualifications and established manufacturing arrangements. Do not automatically replace this copy or schedule a replacement.

## Fit-out-first concept revision — 28 October 2026

The homepage now leads with “Your canopy. Your way.” and “It's what you put inside that counts.” Existing GTW artwork, sunset scene and brand intro remain. The fit-out hub prioritises interiors and exterior accessories, followed by bolt-down and removable mounting directions. Work-to-weekend copy includes “When the work is done, make room for play” and the secondary campaign line “Boots off. Drawers out. Weekend on.”

The supporting complete-pack page has three directions: trade, touring and work-to-weekend. Two supplied trade tray references replace the earlier tray catalogue selections. The canopy page retains only two supporting package directions. The setup planner now records mounting choice and package direction, including these in its local brief download.

The removable system remains unnamed and explicitly conceptual. Detailed connection drawings and proprietary mechanism geometry are not included in website assets. The new interior lifestyle scene is generated inspiration, not an actual product photograph. Craig authorised pushing this revision to GitHub main on 28 October 2026; Netlify can build from the connected branch. Earlier hosting instructions remain available above.

## Whole-system direction — 28 October 2026

The homepage now leads with “Boots off. Tools out. Camping gear in. Weekend sorted.” Storage, tent, ladder, awning and shower box form the coordinated canopy system. Trays remain supporting options. This supersedes earlier headline notes. See [resources library](resources/README.md) for the approved core image shared by the homepage and Our Story.

## Campaign reveal — 28 October 2026

On the first homepage visit per tab session, the branding iron runs for 3.8 seconds. The headline starts after 1.4 seconds, while the iron settles; its four staggered lines fade up at 0.55-second intervals. The white reply follows at 2.6 seconds. Lines remain visible. Replay restarts both sequences; Skip, resizing or changing motion preferences reveals the finished state. Reduced motion and JavaScript-disabled visits show all copy immediately. Later visits in the same tab stay static.

## Sequential reading order — 28 October 2026

Supersedes earlier animation timing notes: the iron lands in 1.8 seconds, followed by the complete brand line. The headline begins 0.9 seconds later, with 0.75 seconds between lines, then the white reply and telex. Individual G/T/W emphasis is disabled to avoid simultaneous movement. Replay, reduced motion, skip and static repeat visits retain their previous behavior.

## Local audio mock-up — not published

The intro now requests sound by default, with a visible mute control. Browser autoplay restrictions show “Play with sound”; clicking restarts the visual and audio sequence together. Audio is synthesized locally: short branding-iron hiss, gentle breeze, bird-like whistles and telex ticks. It stops after the sequence, on skip, resize, navigation or a hidden tab. Explicit muting is remembered for the tab session. These are sound-design placeholders, not field recordings. The kitchen panel now includes an Explore more link to the fit-out hub. Preview locally and publish only when Craig asks to push it live.

Voice preview is optional and off by default. It selects a named Australian male voice (such as Microsoft James) from the browser voice inventory, with a measured pace and slightly lower pitch. If none is available the control says so, rather than substituting another accent or gender. Voice mode spaces the headline lines 1.7 seconds apart and shifts the reply/telex accordingly. The brand line now closes below the telex. No audio changes have been published.

## Kookaburra sound revision — local only

Craig rejected the synthetic voice preview. Voice controls and speech synthesis are removed. The local intro instead uses a real public-domain laughing kookaburra recording by Kuco, alongside the short synthetic iron sizzle and telex clicks. The source master and provenance are in `resources/audio/`. The browser plays a faded excerpt, without looping. The sign-off remains below the telex, and the kitchen panel retains Explore more. This supersedes the earlier voice-preview notes; no local audio changes have been pushed to GitHub or Netlify.

## Local quick-connect panel and synchronized sound

A new quick-connect explanation panel precedes Great gear. Better together. The hero Explore more points to this new next section. The kookaburra begins near the iron and its actual source-ended event gates the telex, with a short pause. Each visible character triggers its click in the same frame; there is no independent pre-scheduled telex audio track. The brand sign-off appears when typing completes. Audio is prepared before the visual sequence starts so delayed browser unlocking cannot introduce a late soundtrack. All of these revisions remain local.

## Approved release — 28 October 2026

Craig approved pushing the local changes to main after shortening the kookaburra. The excerpt is now four seconds with a 0.45-second fade-out; typing still waits for the actual call to finish. This release includes the quick-connect introduction, sound controls and synchronized telex, relocated brand sign-off and second Explore more link. Earlier local-only notes above describe the review history.
