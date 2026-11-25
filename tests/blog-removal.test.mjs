import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {test} from 'node:test';

test('retired blog host is absent from all public sources and both complete builds',()=>{
 const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>{
  const file=path.join(dir,entry.name);
  return entry.isDirectory()?walk(file):[file];
 });
 for(const dir of ['src','public','dist-github','dist-cloudflare']){
  const files=walk(dir);
  assert.ok(files.length>0,dir+' contains files');
  for(const file of files)assert.ok(!fs.readFileSync(file).toString('utf8').toLowerCase().includes('sisogaiblog.wordpress.com'),file+': retired blog host');
 }
});
