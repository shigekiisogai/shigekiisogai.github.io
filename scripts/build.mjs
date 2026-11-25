import {spawnSync} from 'node:child_process';
const target=process.argv[2]||'github';
if(!['github','cloudflare'].includes(target))throw new Error('Invalid target');
const r=spawnSync(process.execPath,['node_modules/astro/bin/astro.mjs','build'],{stdio:'inherit',env:{...process.env,DEPLOY_TARGET:target,ASTRO_TELEMETRY_DISABLED:'1'}});
process.exit(r.status??1);
