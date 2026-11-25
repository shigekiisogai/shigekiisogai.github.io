import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {load} from 'cheerio';
const revision=JSON.parse(fs.readFileSync('provenance/approved-revision.json'));
const records=JSON.parse(fs.readFileSync('provenance/materials-reconciliation.json'));
const baseline=JSON.parse(fs.readFileSync('provenance/pages.json'));
const walk=p=>fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(p,e.name)):[path.join(p,e.name)]);
const links=s=>{const $=load(s);return $('a[href]').toArray().map(a=>({name:$(a).text().trim(),url:$(a).attr('href')}));};
const originalMaterials=baseline.find(p=>p.id==='course-materials').links;
for(const course of revision.excludedCourses){
 const source=fs.readFileSync(`src/content/pages/${course}.md`,'utf8');
 const actual=links(source.split('---').slice(2).join('---'));
 const inventory=records.filter(r=>r.course===course);
 assert.deepEqual(inventory.map(({name,url})=>({name,url})),actual,course+' complete source link inventory');
 for(const r of inventory){
  const expected=revision.excludedDriveIds.some(id=>r.url.includes(id))||!r.url.startsWith('https://drive.google.com/')?'指定除外':originalMaterials.some(l=>l.href===r.url)?'既存':'追加';
  assert.equal(r.status,expected,r.url+' reconciliation state');
 }
}
for(const dir of ['dist-github','dist-cloudflare']){
 const materialHtml=fs.readFileSync(dir+'/course-materials/index.html','utf8');
 const materials=links(materialHtml), materialPage=load(materialHtml);
 for(const course of revision.excludedCourses){
  const title=records.find(r=>r.course===course).courseTitle;
  assert(materialPage('h2').toArray().some(h=>materialPage(h).text()===title),course+': original course title heading');
 }
 assert(!materialHtml.includes('EXAM DATE:')&&!materialHtml.includes('日時：'),'Exam administration remains in source and REPORT');
 for(const r of records.filter(r=>r.status!=='指定除外'))assert(materials.some(l=>l.name===r.name&&l.url===r.url),r.course+': '+r.name+' exact name/URL coverage');
 for(const course of revision.excludedCourses)assert(!fs.existsSync(`${dir}/${course}`),'Excluded course generated: '+course);
 for(const file of walk(dir)){
  const data=fs.readFileSync(file,'utf8');
  for(const id of revision.excludedDriveIds)assert(!data.includes(id),file+': excluded Drive');
  if(file.endsWith('.html'))for(const l of links(data)){
   const pathname=decodeURIComponent(new URL(l.url,'https://shigekiisogai.github.io/').pathname);
   assert(!revision.excludedCourses.some(id=>pathname===`/${id}/`),file+': excluded course link');
   assert(!pathname.includes('ゲーム理論（2025年度前期）'),file+': legacy excluded course link');
  }
 }
 const teaching=load(fs.readFileSync(dir+'/courses/index.html','utf8'));
 assert.deepEqual(teaching('.entry-content a').toArray().map(a=>teaching(a).attr('href')),['/course-materials/']);
 assert.equal(teaching('.resource-links,.course-directory').length,0,'Teaching resource links');
 const old=baseline.find(p=>p.id==='teaching').text;
 assert.equal(teaching('.entry-content').text().replace(/\s+/gu,''),old+'CourseMaterials/講義資料','Teaching course names and history preserved');
 const japanese=load(fs.readFileSync(dir+'/ja/index.html','utf8'));
 assert(!japanese('a').toArray().some(a=>revision.excludedCourses.some(id=>japanese(a).attr('href')?.includes(id))));
}
console.log(`PASS: six course pages excluded; two Drive IDs absent from every build artifact; ${records.length} source links reconciled; Teaching list preserved`);
