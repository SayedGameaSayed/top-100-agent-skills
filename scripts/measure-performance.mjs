import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const urls = [
    { name: 'Home Page', url: 'http://localhost:3000/' },
    { name: 'Detail Page (git-workflow)', url: 'http://localhost:3000/skill/git-workflow' }
  ];

  const results = [];

  for (const item of urls) {
    const page = await browser.newPage();
    await page.setViewport({ width: 360, height: 740, isMobile: true });

    // Collect performance timing
    const start = Date.now();
    await page.goto(item.url, { waitUntil: 'networkidle0' });
    const loadTime = Date.now() - start;

    const perfMetrics = await page.evaluate(() => {
      const timing = performance.getEntriesByType('navigation')[0] || {};
      const paint = performance.getEntriesByType('paint') || [];
      const fcp = paint.find((p) => p.name === 'first-contentful-paint')?.startTime || 0;
      const domNodes = document.querySelectorAll('*').length;

      return {
        dns: timing.domainLookupEnd - timing.domainLookupStart,
        ttfb: timing.responseStart - timing.requestStart,
        domContentLoaded: timing.domContentLoadedEventEnd - timing.fetchStart,
        fcp: Math.round(fcp),
        domNodes
      };
    });

    results.push({
      page: item.name,
      loadTimeMs: loadTime,
      ...perfMetrics
    });

    await page.close();
  }

  await browser.close();
  console.log('\n=============================================');
  console.log('📊 Real Mobile Performance Audit Results (360px)');
  console.log('=============================================');
  console.table(results);
})();
