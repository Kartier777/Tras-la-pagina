const SUPABASE_URL = 'https://pwsfsprvogugyuwqbnti.supabase.co';
const SUPABASE_KEY = 'sb_publishable_4dokQQ3cq558ZQfb0-KIug_z0L4rKUM';

const booksEl=document.querySelector('#books'), statusEl=document.querySelector('#status'), titleEl=document.querySelector('#resultTitle'), form=document.querySelector('#searchForm'), input=document.querySelector('#query'), dialog=document.querySelector('#bookDialog'), detail=document.querySelector('#detail');
const fallback='data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="300" height="440"><rect width="100%" height="100%" fill="#eee8da"/><text x="50%" y="48%" text-anchor="middle" font-family="serif" font-size="24" fill="#315344">Entre Libros</text><text x="50%" y="56%" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#6b766f">Sin portada</text></svg>`);
function clean(s=''){return s.replace(/<[^>]*>/g,'').replace(/&nbsp;/g,' ').trim()}
function img(v){return (v.imageLinks?.thumbnail||v.imageLinks?.smallThumbnail||fallback).replace('http:','https:')}
async function search(q='ficción contemporánea'){
 statusEl.textContent='Buscando…'; booksEl.innerHTML=''; titleEl.textContent=q==='ficción contemporánea'?'Libros recomendados para ti':`Resultados para “${q}”`;
 try{const r=await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&printType=books&maxResults=16&langRestrict=es`);const data=await r.json();const items=(data.items||[]).filter(x=>x.volumeInfo?.title).slice(0,12);statusEl.textContent=`${items.length} libros`;
 if(!items.length){booksEl.innerHTML='<p>No encontramos libros. Prueba con otro título, autor, género o tema.</p>';return}
 booksEl.innerHTML=items.map((b,i)=>{const v=b.volumeInfo,d=clean(v.description||'Descripción no disponible en la fuente.');return `<article class="card"><div class="cover"><img src="${img(v)}" alt="Portada de ${v.title.replaceAll('"','&quot;')}"></div><div class="cardBody"><h3>${v.title}</h3><span class="muted">${(v.authors||['Autor no disponible']).join(', ')}</span>${v.averageRating?`<span class="rating">★ ${v.averageRating} ${v.ratingsCount?`(${v.ratingsCount})`:''}</span>`:''}<p class="desc">${d}</p><button data-i="${i}">Ver libro</button></div></article>`}).join('');
 booksEl.querySelectorAll('button').forEach(btn=>btn.onclick=()=>show(items[+btn.dataset.i]));
 }catch(e){statusEl.textContent='';booksEl.innerHTML='<p>No se pudo conectar con Google Books. Revisa tu conexión e inténtalo de nuevo.</p>'}
}
function show(b){const v=b.volumeInfo;detail.innerHTML=`<div class="detailGrid"><img src="${img(v)}"><div><p class="eyebrow">FICHA DEL LIBRO</p><h2>${v.title}</h2><p class="muted">${(v.authors||['Autor no disponible']).join(', ')} · ${v.publishedDate||'Fecha no disponible'}</p><div>${(v.categories||[]).map(x=>`<span class="pill">${x}</span>`).join('')}</div><h3>¿De qué trata?</h3><p>${clean(v.description||'Google Books no proporciona una descripción para esta edición.')}</p>${v.pageCount?`<p><b>${v.pageCount}</b> páginas</p>`:''}<p class="muted">Información bibliográfica y descripción: Google Books.</p><button onclick="alert('En la siguiente fase conectaremos usuarios, listas y base de datos.')">Quiero leer</button></div></div>`;dialog.showModal()}
form.onsubmit=e=>{e.preventDefault();search(input.value.trim())};document.querySelectorAll('.mode').forEach(b=>b.onclick=()=>b.dataset.focus?input.focus():search(b.dataset.q));document.querySelector('#closeDialog').onclick=()=>dialog.close();dialog.onclick=e=>{if(e.target===dialog)dialog.close()};search();
const signupBtn = document.querySelector('#signupBtn');
const signupDialog = document.querySelector('#signupDialog');
const cancelSignup = document.querySelector('#cancelSignup');

signupBtn.onclick = () => signupDialog.showModal();
cancelSignup.onclick = () => signupDialog.close();
