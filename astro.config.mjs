import {defineConfig} from 'astro/config';
export default defineConfig({output:'static',site:'https://shigekiisogai.github.io',base:'/',outDir:process.env.DEPLOY_TARGET==='cloudflare'?'./dist-cloudflare':'./dist-github',trailingSlash:'always',devToolbar:{enabled:false}});
