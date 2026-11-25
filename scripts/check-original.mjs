import fs from 'node:fs';
import assert from 'node:assert/strict';
import {load} from 'cheerio';
import {approvedBlogPage} from './blog-policy.mjs';
import {rewriteLink,canonicalRoute} from '../src/lib/paths.mjs';
const pages=JSON.parse(fs.readFileSync('provenance/pages.json'));
const revision=JSON.parse(fs.readFileSync('provenance/approved-revision.json'));
const normalize=s=>s.replace(/\s+/gu,'');
let checks=0;
for(const [dir,base] of [['dist-github','/'],['dist-cloudflare','/']]){
 for(const baseline of pages.filter(p=>!revision.excludedCourses.includes(p.id))){
  const p=approvedBlogPage(baseline,revision.blogRemoval);
  const path=`${dir}${canonicalRoute(p.route)}index.html`;
  const html=fs.readFileSync(path,'utf8');const $=load(html);
  const suffix=p.id==='teaching'?'Course Materials / 講義資料':'';
  assert.equal(normalize($('.entry-content').text()),(p.id==='teaching'?normalize('Course titles are given in English for courses taught in English and in Japanese for courses taught in Japanese, unless otherwise noted. 授業名は、原則として英語で行う講義は英語で、日本語で行う講義は日本語で表記しています。 2026 Fall Microeconomics (Graduate School) Research Seminar I Thesis Seminar II （甲南大学）現代アメリカ経済 2026 Summer （東京都立大学）経済経営特別講義（Microeconomics）（英語講義）'):'')+(p.id==='teaching'?p.text.replace('過去に担当した授業','2024年以前に担当した授業').replace('(2019-2023,2026)','(2019-2023)'):p.text)+normalize(suffix),`${dir}: text ${p.id}`);
  const links=$('.entry-content a[href]').toArray().map(el=>({text:$(el).text().trim(),href:$(el).attr('href')}));
  assert.deepEqual(links,[...p.links,...(p.id==='teaching'?[{text:'Course Materials / 講義資料',href:'/course-materials/'}]:[])].map(l=>({...l,href:rewriteLink(l.href,base)})),`${dir}: links ${p.id}`);
  for(const anchor of p.anchors)assert.ok($('[id]').toArray().some(e=>$(e).attr('id')===anchor),`${p.id}: missing anchor ${anchor}`);
  assert.ok(!($('meta[name="robots"]').attr('content')||'').includes('noindex'));
  assert.equal($('script,iframe,object,embed,form').length,0,'No active third-party content');
  assert.ok(!html.includes('\uFFFD'),'No replacement characters');
  assert.equal($('h1.entry-title').length,1);
  for(const el of $('a[href],link[href]').toArray()){
   const href=$(el).attr('href');
   if(/^(https?:|mailto:)/.test(href))continue;
   const u=new URL(href,'https://preview.test'+base.replace(/\/$/,'')+canonicalRoute(p.route));
   const local=decodeURIComponent(u.pathname);
   assert.ok(local.startsWith(base),`Base escaped: ${href}`);
   const target=local.slice(base.length);
   const file=`${dir}/${target}${target.endsWith('/')||!target?'index.html':''}`;
   assert.ok(fs.existsSync(file),`Missing file: ${file}`);
   if(u.hash){const t=load(fs.readFileSync(file,'utf8'));assert.ok(t('[id]').toArray().some(e=>t(e).attr('id')===decodeURIComponent(u.hash.slice(1))),`Missing fragment ${href}`);}
  }
  checks++;
 }
 const err=load(fs.readFileSync(`${dir}/404.html`,'utf8'));
 assert.match(err('meta[name=robots]').attr('content'),/noindex/);
 assert.ok(err('a').toArray().some(e=>err(e).attr('href')===base));
}
const current=load(fs.readFileSync('dist-github/course-materials/index.html','utf8'));
const summary={originalBaselinePages:pages.length,publicContentPages:pages.length-revision.excludedCourses.length,buildPageComparisons:checks,courseMaterialsLinks:current('.entry-content a[href]').length,courseMaterialsDriveLinks:current('.entry-content a[href]').toArray().filter(a=>current(a).attr('href').includes('drive.google.com')).length,result:'PASS'};
fs.mkdirSync('.local',{recursive:true});fs.writeFileSync('.local/content-results.json',JSON.stringify(summary,null,2));
console.log(summary);
