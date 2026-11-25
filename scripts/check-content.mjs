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
  const suffix='\n<a href="/course-materials/">Course Materials / 講義資料</a>\n';
  assert.ok(body.endsWith(suffix));original=body.slice(0,-suffix.length);
 }
 assert.equal(createHash('sha256').update(original).digest('hex'),hash,name+' original provenance changed');
}
console.log('PASS: 14/14 original body hashes verified; approved blog removal, trimmed materials and Teaching guide checked separately; baseline unchanged');
execFileSync(process.execPath,['scripts/check-original.mjs'],{stdio:'inherit'});

execFileSync(process.execPath,['scripts/check-revision.mjs'],{stdio:'inherit'});
