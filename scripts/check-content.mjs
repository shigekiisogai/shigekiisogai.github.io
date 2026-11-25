import fs from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
const baseline=JSON.parse(fs.readFileSync('provenance/body-sha256.json'));
for(const [name,hash] of Object.entries(baseline)){
 const body=fs.readFileSync(`src/content/pages/${name}.md`,'utf8').split('---').slice(2).join('---');
 assert.equal(createHash('sha256').update(body).digest('hex'),hash,name+' body changed');
}
console.log('PASS: 14/14 original Markdown bodies byte-identical; no acceptance baseline updated');
execFileSync(process.execPath,['scripts/check-original.mjs'],{stdio:'inherit'});
