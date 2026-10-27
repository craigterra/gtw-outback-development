const rangeProducts=window.GTW_PRODUCTS.filter(p=>p.category===document.body.dataset.range);
const rangeDialog=document.querySelector('#range-dialog');
function rangePhoto(p){
  if(!p.image)return `<div class="product-placeholder">${p.name}<small>Product image to confirm</small></div>`;
  if(p.crop)return `<svg role="img" aria-label="${p.name} supplier photo detail" viewBox="${p.crop.join(' ')}" preserveAspectRatio="xMidYMid meet"><defs><clipPath id="crop-${p.id}"><rect x="${p.crop[0]}" y="${p.crop[1]}" width="${p.crop[2]}" height="${p.crop[3]}"/></clipPath></defs><image href="${p.image}" width="${p.imageSize[0]}" height="${p.imageSize[1]}" clip-path="url(#crop-${p.id})"/></svg>`;
  return `<img src="${p.image}" alt="${p.name} reference photo" loading="lazy">`;
}
document.querySelector('#range-grid').innerHTML=rangeProducts.map(p=>`<button class="product-card" data-item="${p.id}"><span class="product-image">${rangePhoto(p)}</span><span class="category">${p.category} / ${p.caption?.startsWith('Industry reference')?'Industry reference':'Range preview'}</span><h3>${p.name}</h3><span class="card-description">${p.description}</span><span class="more">View details ↗</span></button>`).join('');
document.querySelector('#range-grid').addEventListener('click',e=>{
  const id=e.target.closest('[data-item]')?.dataset.item;if(!id)return;
  const p=rangeProducts.find(p=>p.id===id);
  document.querySelector('#range-detail').innerHTML=`<div class="detail-grid"><div class="range-detail-photo">${rangePhoto(p)}<small>${p.caption||'Product-development placeholder. Final GTW specification to confirm.'}</small></div><div><p class="eyebrow rust">${p.category.toUpperCase()} / RANGE PREVIEW</p><h2>${p.name}</h2><p>${p.description}</p><ul>${p.details.map(d=>`<li>${d}</li>`).join('')}</ul><a class="button orange" href="gear.html?product=${encodeURIComponent(p.id)}#your-way">Add to my setup brief ↗</a><small>Final fitment, specifications, package inclusions, pricing and availability to be confirmed. ${p.source?`<a href="${p.source}" target="_blank" rel="noopener">View photo or supplier reference ↗</a>`:''}</small></div></div>`;
  rangeDialog.showModal();
});
document.querySelector('.close-dialog').addEventListener('click',()=>rangeDialog.close());
rangeDialog.addEventListener('click',e=>{if(e.target===rangeDialog){const r=rangeDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)rangeDialog.close();}});
document.querySelector('.menu-toggle').addEventListener('click',()=>{const open=document.querySelector('#main-nav').classList.toggle('open');document.querySelector('.menu-toggle').setAttribute('aria-expanded',open);});
