import puppeteer from 'puppeteer-core';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  console.log('Navigating to live skill detail page...');
  const url = 'https://sayedgameasayed.github.io/top-100-agent-skills/skill.html?id=git-workflow';
  const response = await page.goto(url, { waitUntil: 'networkidle0' });
  console.log('Detail Page HTTP Status:', response.status());

  await new Promise((r) => setTimeout(r, 1000));

  // Click the copy prompt button
  const copyBtn = await page.$('#copy-ready-prompt-btn');
  if (copyBtn) {
    await copyBtn.click();
    console.log('Clicked copy prompt button');
    await new Promise((r) => setTimeout(r, 600));

    const btnText = await page.$eval('#copy-ready-prompt-btn', (el) => el.innerText);
    console.log('Button text after click:', btnText);

    const toast = await page.$('#toast');
    const toastText = toast ? await page.$eval('#toast', (el) => el.innerText) : '';
    console.log('Toast text:', toastText);
  }

  await page.screenshot({ path: 'screenshots/live-skill-detail.png', fullPage: false });
  console.log('Saved screenshots/live-skill-detail.png');

  await browser.close();
})();
