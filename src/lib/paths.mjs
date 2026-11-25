import routes from './routes.json' with {type:'json'};
import redirects from './redirects.json' with {type:'json'};
export function canonicalRoute(route){return route==='/teaching/'?'/courses/':redirects[route]||route;}
export const sourceOrigin='https://shigekiisogai.wordpress.com';
export function withBase(path,base='/'){return base.replace(/\/$/,'')+'/'+path.replace(/^\//,'');}
export function rewriteLink(href,base='/'){
 if(!href||href.startsWith('#'))return href;
 // Explicit legacy interactive-link migration, not a change to research URLs.
 if(href==='https://sisogai.github.io/teaching/index.html')return withBase('/materials/interactive/',base);
 let url;try{url=new URL(href,sourceOrigin);}catch{return href;}
 if(url.origin!==sourceOrigin)return href;
 const route=canonicalRoute(decodeURIComponent(url.pathname));
 if(!routes.some(p=>p.route===route))return href;
 return withBase(route,base)+url.search+url.hash;
}
