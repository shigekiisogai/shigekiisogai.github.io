import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {load} from 'cheerio';
const origin='https://shigekiisogai.github.io';
const expected=['404.html','index.html','ja/index.html','research/index.html'];
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)]);}
let refs=0; const external=new Set();
for(const dir of ['dist-github','dist-cloudflare']){
 const htmls=files(dir).filter(f=>f.endsWith('.html'));
 assert.deepEqual(htmls.map(f=>path.relative(dir,f)).sort(),expected);
 assert(!fs.existsSync(path.join(dir,'teaching')));
 for(const file of htmls){
  const rel=path.relative(dir,file);const route=rel==='index.html'?'/':rel==='404.html'?'/404.html':'/'+rel.replace(/index\.html$/,'');
  const $=load(fs.readFileSync(file,'utf8'));
  assert.equal($('link[rel=canonical]').attr('href'),origin+route);
  assert($('title').text().includes('磯貝 茂樹 / Shigeki ISOGAI'));
  assert($('meta[name=description]').attr('content')?.length>30);
  assert.equal(($('meta[name=robots]').attr('content')||'').includes('noindex'),route==='/404.html');
  assert(!$('body').text().includes('Migration preview'));
  if(['/', '/ja/'].includes(route)){
   assert.equal($('link[hreflang=en]').attr('href'),origin+'/');
   assert.equal($('link[hreflang=ja]').attr('href'),origin+'/ja/');
  }
  for(const el of $('[href],[src]').toArray())for(const attr of ['href','src']){
   const ref=$(el).attr(attr);if(!ref)continue;refs++;
   if(/^(mailto:|tel:|data:)/.test(ref))continue;
   const url=new URL(ref,origin+route);
   // Explicit absolute link belongs to the untouched existing teaching project Pages.
   if(/^https:\/\/shigekiisogai\.github\.io\/teaching\//.test(ref)){external.add(ref);continue;}
   if(url.origin!==origin){external.add(ref);continue;}
   let dest=decodeURIComponent(url.pathname);if(dest.endsWith('/'))dest+='index.html';
   const target=path.join(dir,dest);
   assert(fs.existsSync(target),`${file} ${attr}=${ref} missing ${target}`);
   if(url.hash && target.endsWith('.html')){
    const doc=load(fs.readFileSync(target,'utf8'));
    assert(doc('[id]').toArray().some(e=>doc(e).attr('id')===decodeURIComponent(url.hash.slice(1))),`fragment ${ref}`);
   }
  }
 }
 const sm=load(fs.readFileSync(dir+'/sitemap.xml','utf8'),{xml:true});
 assert.deepEqual(sm('loc').toArray().map(e=>sm(e).text()).sort(),['/','/ja/','/research/'].map(r=>origin+r).sort());
 assert.match(fs.readFileSync(dir+'/robots.txt','utf8'),/Allow: \/\nSitemap: https:\/\/shigekiisogai.github.io\/sitemap.xml/);
}
console.log(JSON.stringify({pass:true,html_per_build:4,href_src_checked:refs,external_urls:[...external]},null,2));
