import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {legacyCourse, legacyStatus, reconciliationStatus, retainLegacyUrl} from '../scripts/materials-policy.mjs';
const revision=JSON.parse(fs.readFileSync('provenance/approved-revision.json'));
const records=JSON.parse(fs.readFileSync('provenance/materials-reconciliation.json'));
const original=JSON.parse(fs.readFileSync('provenance/pages.json')).find(p=>p.id==='course-materials').links;
test('all 30 WP 431 links retain their original names and URLs with legacy nontransfer status',()=>{
 const source=JSON.parse(fs.readFileSync('provenance/pages.json')).find(p=>p.id===legacyCourse).links;
 const legacy=records.filter(r=>r.course===legacyCourse);
 assert.equal(legacy.length,30);
 assert.deepEqual(legacy.map(r=>({text:r.name,href:r.url})),source);
 assert(legacy.every(r=>r.status===legacyStatus));
});
test('legacy status takes precedence for original links and excluded Drive IDs',()=>{
 for(const url of ['https://drive.google.com/example',...revision.excludedDriveIds.map(id=>'https://drive.google.com/'+id)])
  assert.equal(reconciliationStatus({course:legacyCourse,url},revision,[{href:url}]),legacyStatus);
});
test('original Course Materials URLs and other course additions survive legacy exclusion',()=>{
 const url='https://drive.google.com/example';
 assert(retainLegacyUrl(url,[],[{href:url}]));
 assert(retainLegacyUrl(url,[{course:'other',url,status:'追加'}],[]));
 assert(!retainLegacyUrl(url,[{course:legacyCourse,url,status:legacyStatus}],[]));
 assert(!retainLegacyUrl(url,[{course:'other',url,status:'指定除外'}],[]));
 const shared=records.filter(r=>r.course===legacyCourse&&retainLegacyUrl(r.url,records,original));
 assert.equal(shared.length,1);
});
test('other five courses retain policy and two Drive exclusions',()=>{
 const other=records.filter(r=>r.course!==legacyCourse);
 assert.equal(new Set(other.map(r=>r.course)).size,5);
 assert.equal(other.filter(r=>r.status==='追加').length,138);
 for(const record of other)assert.equal(record.status,reconciliationStatus(record,revision,original));
 for(const id of revision.excludedDriveIds)assert(!revision.materialsAppendix.includes(id));
});
