import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const allowed=['.github','.gitignore','.nvmrc','README.md','astro.config.mjs','docs','package-lock.json','package.json','provenance','public','scripts','src','tests'];
for(const e of fs.readdirSync('.'))assert(allowed.includes(e)||['.git','.astro','node_modules','dist-github','dist-cloudflare'].includes(e),'Unexpected root path '+e);
function walk(p){return fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(p,e.name)):[path.join(p,e.name)]);}
for(const p of ['src','public','docs','scripts','tests','provenance','.github'].flatMap(walk)){
 assert(!/assistant|oauth|privacy|terms/i.test(p),'Unapproved file '+p);
 const text=fs.readFileSync(p,'utf8');
 assert(!/https:\/\/sisogai\.github\.io|\/Users\/|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY|gh[pousr]_[A-Za-z0-9]{20}/.test(text),'Unsafe/obsolete string '+p);
}
assert(!fs.existsSync('public/teaching'));
console.log('PASS: selected public-source paths, no legacy owner URL, no local paths/key patterns, no teaching namespace');
