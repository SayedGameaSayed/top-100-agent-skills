import puppeteer from 'puppeteer-core';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 950 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));

  // Click on lightbulb morph pill
  const lightbulbBtn = await page.$('button[data-shape="lightbulb"]');
  if (lightbulbBtn) {
    await lightbulbBtn.click();
    console.log('Clicked lightbulb');
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: 'screenshots/home-dala-lightbulb-1280px.png', fullPage: false });
    console.log('Saved lightbulb screenshot');
  }

  // Click on globe morph pill
  const globeBtn = await page.$('button[data-shape="globe"]');
  if (globeBtn) {
    await globeBtn.click();
    console.log('Clicked globe');
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: 'screenshots/home-dala-globe-1280px.png', fullPage: false });
    console.log('Saved globe screenshot');
  }

  await browser.close();
})();
