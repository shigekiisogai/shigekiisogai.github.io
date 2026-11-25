import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {load} from 'cheerio';
import {createHash} from 'node:crypto';
const hash=s=>createHash('sha256').update(s).digest('hex');
const expected=JSON.parse(fs.readFileSync('provenance/interactive-inline.json'));
const walk=p=>fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(p,e.name)):[path.join(p,e.name)]);
for(const dir of ['dist-github','dist-cloudflare']){
 assert(!fs.existsSync(dir+'/teaching'));assert(!walk(dir).some(p=>p.includes('applied-micro')));
 const canonical=[],graph=new Map();let redirects=0;
 for(const file of walk(dir).filter(f=>f.endsWith('.html'))){
  const html=fs.readFileSync(file,'utf8'),$=load(html),isRedirect=$('meta[http-equiv=refresh]').length>0,is404=file.endsWith('/404.html');
  assert($('title').text().includes('磯貝 茂樹 / Shigeki ISOGAI'));
  assert($('meta[name=description]').attr('content')?.length>30);
  assert.equal(($('meta[name=robots]').attr('content')||'').includes('noindex'),is404||isRedirect);
  assert(!$('a[href]').toArray().some(a=>/applied-micro|sisogai.github.io/.test($(a).attr('href'))));
  const url=$('link[rel=canonical]').attr('href');assert(url.startsWith('https://shigekiisogai.github.io/'));
  if(!is404&&!isRedirect){canonical.push(url);graph.set(url,$('a[href]').toArray().map(e=>{const u=new URL($(e).attr('href'),url);u.hash='';u.search='';if(u.pathname.endsWith('/index.html'))u.pathname=u.pathname.slice(0,-10);return u.href;}));}if(isRedirect)redirects++;
  if(file.includes('/materials/interactive/'))assert.deepEqual($('script:not([src])').toArray().map(e=>hash($(e).html())),expected[path.basename(file)],file+' scripts changed');
 }
 const sm=load(fs.readFileSync(dir+'/sitemap.xml','utf8'),{xml:true});
 assert.deepEqual(sm('loc').toArray().map(e=>sm(e).text()).sort(),canonical.sort());
 assert.equal(canonical.length,16);assert.equal(redirects,4);
 const distance=new Map([['https://shigekiisogai.github.io/',0]]),queue=[...distance.keys()];
 for(const u of queue)for(const v of graph.get(u)||[])if(graph.has(v)&&!distance.has(v)){distance.set(v,distance.get(u)+1);queue.push(v);}
 assert.equal(distance.size,16,'Every public canonical must be reachable from Home');
 fs.mkdirSync('.local',{recursive:true});fs.writeFileSync(`.local/reachability-${dir}.json`,JSON.stringify(Object.fromEntries(distance),null,2));
 assert.match(fs.readFileSync(dir+'/robots.txt','utf8'),/Allow: \/\nSitemap: https:\/\/shigekiisogai.github.io\/sitemap.xml/);
 for(const file of ['index.html','ja/index.html']){
  const $=load(fs.readFileSync(dir+'/'+file,'utf8'));
  assert.equal($('link[hreflang=en]').attr('href'),'https://shigekiisogai.github.io/');
  assert.equal($('link[hreflang=ja]').attr('href'),'https://shigekiisogai.github.io/ja/');
 }
}
console.log('PASS: 21 HTML/build, 16 indexed canonicals, 4 noindex redirects + 404, original interactive scripts unchanged, excluded namespace and casebook absent');
