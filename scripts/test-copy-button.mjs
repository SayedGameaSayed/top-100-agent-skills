import puppeteer from 'puppeteer-core';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://localhost:3000/skill.html?id=superpowers', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 800));

  // Find copy button
  const copyBtn = await page.$('#copy-ready-prompt-btn');
  if (!copyBtn) {
    console.error('ERROR: #copy-ready-prompt-btn not found!');
    await browser.close();
    process.exit(1);
  }

  const initialText = await page.evaluate(el => el.textContent.trim(), copyBtn);
  console.log('Initial Button Text:', initialText);

  // Click the button
  await copyBtn.click();
  await new Promise((r) => setTimeout(r, 400));

  const clickedText = await page.evaluate(el => el.textContent.trim(), copyBtn);
  console.log('Clicked Button Text:', clickedText);

  const toastText = await page.evaluate(() => {
    const t = document.getElementById('toast-notification');
    return t ? t.textContent : 'NO TOAST';
  });
  console.log('Toast Text:', toastText);

  // Screenshot of copied state
  await page.screenshot({ path: 'screenshots/skill-copy-success.png', fullPage: false });
  console.log('Saved skill-copy-success.png');

  await browser.close();
})();
