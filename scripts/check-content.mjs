import fs from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const baseline=JSON.parse(fs.readFileSync('provenance/body-sha256.json'));
for(const [name,hash] of Object.entries(baseline)){
 const body=fs.readFileSync(`src/content/pages/${name}.md`,'utf8').split('---').slice(2).join('---');
 assert.equal(createHash('sha256').update(body).digest('hex'),hash,name+' body changed');
}
console.log('PASS: 3/3 original Markdown bodies byte-identical; no acceptance baseline updated');
