import assert from 'node:assert/strict';
import {load} from 'cheerio';

// Apply only the explicitly approved removal to the immutable page inventory.
export function approvedBlogPage(page, removal) {
 if(page.id!==removal.pageId)return page;
 const $=load(removal.removedSuffix);
 const text=$.text().replace(/\s+/gu,'');
 assert.ok(text.length>0);
 assert.ok(page.text.endsWith(text),'Approved blog paragraph must be the original suffix');
 const removed=page.links.filter(link=>link.href===removal.url);
 assert.equal(removed.length,1,'Exactly one approved original blog link');
 assert.equal($('a').attr('href'),removal.url);
 return {...page,text:page.text.slice(0,-text.length),links:page.links.filter(link=>link.href!==removal.url)};
}
