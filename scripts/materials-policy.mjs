export const legacyCourse = 'microeconomics-grad-school';
export const legacyStatus = '旧大学院ミクロのため非移管';

export function reconciliationStatus(record, revision, originalLinks) {
 if (record.course === legacyCourse) return legacyStatus;
 if (revision.excludedDriveIds.some(id => record.url.includes(id)) || !record.url.startsWith('https://drive.google.com/')) return '指定除外';
 return originalLinks.some(link => link.href === record.url) ? '既存' : '追加';
}

export function retainLegacyUrl(url, records, originalLinks) {
 return originalLinks.some(link => link.href === url) || records.some(record => record.course !== legacyCourse && ['追加', '既存'].includes(record.status) && record.url === url);
}
