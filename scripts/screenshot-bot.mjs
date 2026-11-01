import puppeteer from 'puppeteer-core';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));

  // 1. Screenshot of the home page showing the new logo in navbar and the floating bot trigger
  await page.screenshot({ path: 'screenshots/home-with-new-logo.png', fullPage: false });
  console.log('Saved home-with-new-logo.png');

  // 2. Click the bot trigger to open the AI advisor
  const botTrigger = await page.$('#ai-bot-trigger');
  if (botTrigger) {
    await botTrigger.click();
    await new Promise((r) => setTimeout(r, 500));

    // Type a query in the bot input
    await page.type('#bot-input-text', 'عايز مهارة وورد');
    await page.keyboard.press('Enter');
    await new Promise((r) => setTimeout(r, 1200));

    await page.screenshot({ path: 'screenshots/home-with-ai-bot.png', fullPage: false });
    console.log('Saved home-with-ai-bot.png');
  }

  await browser.close();
})();
