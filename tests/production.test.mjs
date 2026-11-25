import {test} from 'node:test';
import {execFileSync} from 'node:child_process';
for(const script of ['check-site','check-content','check-publish'])test(script,()=>{execFileSync(process.execPath,[`scripts/${script}.mjs`],{stdio:'inherit'});});
test('approved public scope and complete course materials reconciliation',()=>{execFileSync(process.execPath,['scripts/check-revision.mjs'],{stdio:'inherit'});});
