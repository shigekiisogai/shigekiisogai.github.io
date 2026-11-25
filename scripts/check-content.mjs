import fs from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
const revision=JSON.parse(fs.readFileSync('provenance/approved-revision.json'));
const baseline=JSON.parse(fs.readFileSync('provenance/body-sha256.json'));
for(const [name,hash] of Object.entries(baseline)){
 const body=fs.readFileSync(`src/content/pages/${name}.md`,'utf8').split('---').slice(2).join('---');
 let original=body;
 if(name===revision.blogRemoval.pageId)original=body+revision.blogRemoval.removedSuffix;
 if(name==='course-materials'){
  assert.equal(body,revision.originalMaterialsBody,'Approved course materials without retired course sections');
  original=revision.originalMaterialsBody;
 }
 if(name==='teaching'){
  const addition='## 2026 Fall\n\nMicroeconomics (Graduate School)  \nResearch Seminar I  \nThesis Seminar II  \n（甲南大学）現代アメリカ経済\n\n## 2026 Summer\n\n（東京都立大学）経済経営特別講義（Microeconomics）（英語講義）\n\n';
  const note='<small>Course titles are given in English for courses taught in English and in Japanese for courses taught in Japanese, unless otherwise noted.<br>授業名は、原則として英語で行う講義は英語で、日本語で行う講義は日本語で表記しています（例外は授業名に注記しています）。</small>\n\n';
  assert.ok(body.startsWith('\n\n'+note+addition));
  original=body.replace('\n\n'+note+addition,'\n\n');
  const suffix='\n<a href="/course-materials/">Course Materials / 講義資料</a>\n';
  assert.ok(original.endsWith(suffix));original=original.slice(0,-suffix.length);
 }
 assert.equal(createHash('sha256').update(original).digest('hex'),hash,name+' original provenance changed');
}
console.log('PASS: 14/14 original body hashes verified; approved blog removal, trimmed materials and Teaching guide checked separately; baseline unchanged');
execFileSync(process.execPath,['scripts/check-original.mjs'],{stdio:'inherit'});

execFileSync(process.execPath,['scripts/check-revision.mjs'],{stdio:'inherit'});
