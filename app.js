// Bookmarks to the former story teaser now open the full story.
function routeLegacyStory() {
  if (location.hash === '#our-story') location.replace('our-story.html');
}
routeLegacyStory();
addEventListener('hashchange', routeLegacyStory);
const products=window.GTW_PRODUCTS;
const $=s=>document.querySelector(s);let category='All';const dialog=$('#product-dialog');
function openDialog(html){$('#dialog-content').innerHTML=html;dialog.showModal();}
$('.close-dialog').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
let selectedProduct='';dialog.addEventListener('click',e=>{const b=e.target.closest('[data-plan]');if(b){selectedProduct=b.dataset.plan;dialog.close();location.hash='your-way';updateSummary();$('#setup-status').textContent=selectedProduct+' added to your planning brief.'}});
const setup=$('#setup-form');function setupData(){const fd=new FormData(setup);return {ownership:fd.get('ownership'),coverage:fd.get('coverage'),trundle:fd.get('trundle'),mounting:fd.get('mounting'),base:fd.get('ownership')==='yours'?'Fit out my existing canopy':fd.get('base'),use:fd.get('use'),vehicle:$('#vehicle').value.trim(),modules:fd.getAll('module'),product:selectedProduct};}function updateSummary(){const d=setupData();$('#setup-summary').textContent=`${d.base||'Starting point to discuss'} · ${d.mounting} · ${d.use}${d.vehicle?' · '+d.vehicle:''}. ${d.modules.length?d.modules.join(' + '):'Choose storage ideas above.'}${d.coverage?' Canopy: '+d.coverage+'.':''}${d.trundle?' Under-tray option: '+d.trundle+'.':''}${d.product?' Starting option: '+d.product+'.':''}`;}setup.addEventListener('change',updateSummary);$('#vehicle').addEventListener('input',updateSummary);
setup.addEventListener('submit',e=>{e.preventDefault();const d=setupData();const text=`GTW OUTBACK | MY SETUP BRIEF\n\nStarting point: ${d.base||'To discuss'}\nUse: ${d.use}\nMounting: ${d.mounting}\nVehicle: ${d.vehicle||'To confirm'}\nStarting product: ${d.product||'To discuss'}\nFit-out choices: ${d.modules.join(', ')||'To discuss'}\n\nLocal trial planning brief only. Fitment, dimensions, availability and price require confirmation.\n`;const u=URL.createObjectURL(new Blob([text],{type:'text/plain'}));const a=document.createElement('a');a.href=u;a.download='GTW-Outback-my-setup.txt';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);$('#setup-status').textContent='Your brief has been downloaded. Nothing has been sent.';});
$('.menu-toggle').addEventListener('click',()=>{const open=$('#main-nav').classList.toggle('open');$('.menu-toggle').setAttribute('aria-expanded',open)});document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{$('#main-nav').classList.remove('open');$('.menu-toggle').setAttribute('aria-expanded','false')}));
$('#build-sources').addEventListener('click',()=>openDialog(`<div class="notes-list"><p class="eyebrow rust">LOCAL TRIAL / MANUFACTURING NOTES</p><h2>What we can support so far.</h2><h3>Fabrication and finish</h3><p>The supplier describes laser cutting, CNC bending, welding and powder coating in its production process. <a href="https://www.utetraypro.com/about-us" target="_blank" rel="noopener">Supplier production process ↗</a></p><h3>Weather and dust</h3><p>The aluminium camping canopy listing describes weather- and dust-resistant seals. This is not a verified waterproof rating. <a href="https://www.utetraypro.com/ute-canopy/aluminium-ute-canopy/aluminium-camping-canopy.html" target="_blank" rel="noopener">Product source ↗</a></p><h3>Claims still to confirm</h3><p><strong>AkzoNobel powder coating:</strong> brand, coating system and application to the chosen products need supplier confirmation.</p><p><strong>ADR:</strong> no product-specific approval documentation has been verified for this trial. We have not labelled the GTW range ADR approved.</p><p><strong>Quality certification:</strong> the supplier states ISO 9001:2015; certificate validity and manufacturing scope need checking before launch.</p></div>`));
document.querySelectorAll('[data-merch]').forEach(b=>b.addEventListener('click',()=>openDialog(`<div class="merch-detail"><p class="eyebrow rust">SUNSET COLLECTION / CONCEPT</p><h2>${b.dataset.merch}</h2><img src="${b.querySelector('img').getAttribute('src')}" alt="${b.dataset.merch} concept"><p>Current design concept. Sizing, production, pricing and availability will be confirmed before orders open.</p></div>`)));
function clubMode(photo){$('#club-form').hidden=photo;$('#photo-form').hidden=!photo;$('#join-tab').classList.toggle('active',!photo);$('#photo-tab').classList.toggle('active',photo);$('#join-tab').setAttribute('aria-pressed',!photo);$('#photo-tab').setAttribute('aria-pressed',photo)}$('#join-tab').addEventListener('click',()=>clubMode(false));$('#photo-tab').addEventListener('click',()=>clubMode(true));$('#club-form').addEventListener('submit',e=>{e.preventDefault();$('#club-status').textContent='That is how joining will feel. This is a trial: you have not been subscribed and your details have not been sent.';});
let photoUrl;$('#photo-file').addEventListener('change',()=>{const file=$('#photo-file').files[0];if(photoUrl)URL.revokeObjectURL(photoUrl);$('#photo-preview').hidden=true;$('#photo-status').textContent='';if(!file)return;if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>15*1024*1024){$('#photo-status').textContent='Please choose a JPG, PNG or WebP image under 15 MB.';$('#photo-file').value='';return}photoUrl=URL.createObjectURL(file);$('#photo-preview').src=photoUrl;$('#photo-preview').hidden=false});$('#photo-form').addEventListener('submit',e=>{e.preventDefault();$('#photo-status').textContent='Your photo is previewed locally. Nothing has been uploaded or submitted.'});
updateSummary();

document.querySelectorAll('[data-base]').forEach(link=>link.addEventListener('click',()=>{setCanopyOwner('ours');const option=Array.from(setup.elements).find(el=>el.name==='base'&&el.value===link.dataset.base);if(option){option.checked=true;updateSummary();$('#setup-status').textContent=link.dataset.base+' selected as your starting point.';}}));

function setCanopyOwner(value){
  Array.from(setup.elements).filter(el=>el.name==='ownership').forEach(el=>el.checked=el.value===value);
  const ours=value==='ours';
  // Complete-package introduction remains visible to all visitors.
  $('#new-base-options').hidden=!ours;
  $('#new-base-options').disabled=!ours;




  updateSummary();
}
document.querySelectorAll('[data-owner]').forEach(link=>link.addEventListener('click',()=>{setCanopyOwner(link.dataset.owner);$('#setup-status').textContent=link.dataset.owner==='yours'?'Your canopy selected. Let’s plan your fit-out.':'Our range selected. Choose your new base.';}));
setup.addEventListener('change',e=>{if(e.target.name==='ownership')setCanopyOwner(e.target.value);});
const initialCanopyOwner=new URLSearchParams(location.search).get('canopy');
if(['yours','ours'].includes(initialCanopyOwner))setCanopyOwner(initialCanopyOwner);

const requestedProduct=products.find(p=>p.id===new URLSearchParams(location.search).get('product'));
if(requestedProduct){const matchingOption=Array.from(setup.elements).find(el=>el.name==='module'&&el.value===requestedProduct.name);if(matchingOption){matchingOption.checked=true;}else{selectedProduct=requestedProduct.name;}updateSummary();$('#setup-status').textContent=requestedProduct.name+' added to your planning brief.';}

// Fit-out choices share the existing brief download and summary.
document.querySelectorAll('[data-mount]').forEach(a=>a.addEventListener('click',()=>{const option=Array.from(setup.elements).find(el=>el.name==='mounting'&&el.value===a.dataset.mount);if(option)option.checked=true;updateSummary();}));
const requestedPack=new URLSearchParams(location.search).get('pack');
if(requestedPack){const option=Array.from(setup.elements).find(el=>el.name==='base'&&el.value===requestedPack);if(option){setCanopyOwner('ours');option.checked=true;if(requestedPack==='Work-to-weekend concept package'){const mount=Array.from(setup.elements).find(el=>el.name==='mounting'&&el.value==='Removable fit-out concept');if(mount)mount.checked=true;}updateSummary();}}
