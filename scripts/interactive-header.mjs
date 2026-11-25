import fs from 'node:fs';
import path from 'node:path';
import {siteHeader} from '../src/lib/navigation.mjs';
export function integrateInteractiveHeader(dir){
 const root=path.join(dir,'materials/interactive');
 for(const file of fs.readdirSync(root).filter(f=>f.endsWith('.html'))){
  const target=path.join(root,file);let html=fs.readFileSync(target,'utf8');
  const previous=/<nav aria-label="Personal website"[^>]*>[\s\S]*?<\/nav>/;
  if(!previous.test(html))throw new Error(file+': missing legacy navigation');
  html=html.replace(previous,siteHeader('/','/courses/'));
  html=html.replace(/<meta name="robots"[^>]*>\s*/g,'');
  const title=html.match(/<title>([^<]*)<\/title>/)[1];
  html=html.replace(/<title>[^<]*<\/title>/,`<title>${title} — 磯貝 茂樹 / Shigeki ISOGAI</title>`);
  const route=file==='index.html'?'/materials/interactive/':'/materials/interactive/'+file;
  html=html.replace('</head>',`<meta name="description" content="${title} — Interactive Microeconomics by Shigeki ISOGAI / 磯貝 茂樹. Interactive course materials."><link rel="canonical" href="https://shigekiisogai.github.io${route}"><link rel="stylesheet" href="/site-header.css"></head>`);
  fs.writeFileSync(target,html);
 }
}
