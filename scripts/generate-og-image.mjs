import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const logoBase64 = fs.readFileSync('site/assets/logo.png').toString('base64');
const resendBrainPath = 'C:/Users/syedg/.gemini/antigravity/brain/987b2f99-0fd9-46e7-a2bf-765b28e5dc4c/resend-home-1280px.png';
const brainBase64 = fs.existsSync(resendBrainPath) 
  ? fs.readFileSync(resendBrainPath).toString('base64')
  : fs.readFileSync('site/assets/logo.png').toString('base64');

const htmlContent = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1200px;
      height: 630px;
      background-color: #000000;
      color: #ffffff;
      font-family: 'Cairo', sans-serif;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 56px 64px;
      overflow: hidden;
      position: relative;
      border: 1px solid #292d30;
    }
    
    .text-content {
      flex: 1.35;
      z-index: 2;
      max-width: 660px;
    }

    .brand-header {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 24px;
    }
    .brand-logo {
      width: 42px;
      height: 42px;
      object-fit: contain;
    }
    .kicker-tag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #000000;
      border: 1px solid #292d30;
      border-radius: 9999px;
      padding: 6px 16px;
      font-size: 14px;
      font-weight: 600;
      color: #f0f0f0;
      letter-spacing: 0.02em;
    }
    .kicker-tag span:first-child {
      color: #9281f7;
    }

    .title {
      font-size: 52px;
      font-weight: 800;
      line-height: 1.18;
      color: #ffffff;
      margin-bottom: 18px;
      letter-spacing: -0.5px;
    }
    .title span {
      color: #9281f7;
    }

    .description {
      font-size: 20px;
      font-weight: 400;
      line-height: 1.6;
      color: #a1a4a5;
      margin-bottom: 32px;
    }

    .footer-tags {
      display: flex;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
    }

    .tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #000000;
      border: 1px solid #292d30;
      border-radius: 6px;
      padding: 8px 14px;
      font-size: 13px;
      font-weight: 600;
      color: #f0f0f0;
      font-family: 'JetBrains Mono', 'Cairo', monospace;
    }
    .tag-accent {
      color: #9281f7;
      border-color: rgba(146, 129, 247, 0.4);
      background: rgba(146, 129, 247, 0.06);
    }
    .tag-stars {
      color: #ffca16;
    }

    .visual-col {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 2;
    }

    .visual-brain-crop {
      width: 480px;
      height: 480px;
      border: 1px solid #292d30;
      border-radius: 16px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #000000;
      position: relative;
    }
    .visual-brain-crop img {
      width: 290%;
      height: 290%;
      object-fit: cover;
      object-position: 3% 28%;
    }
  </style>
</head>
<body>

  <div class="text-content">
    <div class="brand-header">
      <img src="data:image/png;base64,${logoBase64}" class="brand-logo" alt="Logo">
      <div class="kicker-tag">
        <span>✧</span>
        <span>دليل مهارات الذكاء الاصطناعي العالمي</span>
      </div>
    </div>

    <h1 class="title">أفضل 100 مهارة <span>ذكاء اصطناعي</span>.</h1>
    <p class="description">
      دليل عربي تفاعلي موثّق لأشهر <bdi dir="ltr">AI Agent Skills</bdi>، مع لوحة صدارة يومية وفق نجوم <bdi dir="ltr">GitHub</bdi>، وقوالب <bdi dir="ltr">Prompts</bdi> جاهزة لمحادثتك أو بيئة التطوير.
    </p>

    <div class="footer-tags">
      <div class="tag tag-accent" dir="ltr"># 100 SKILLS VERIFIED</div>
      <div class="tag tag-stars" dir="ltr">★ DAILY GITHUB LEADERBOARD</div>
      <div class="tag" dir="ltr">⚡ READY-TO-USE PROMPTS</div>
    </div>
  </div>

  <div class="visual-col">
    <div class="visual-brain-crop">
      <img src="data:image/png;base64,${brainBase64}" alt="Resend 3D Brain Visual">
    </div>
  </div>
</body>
</html>
`;

fs.writeFileSync('temp_og_preview.html', htmlContent, 'utf8');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.goto('file://' + path.resolve('temp_og_preview.html'), { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));

  await page.screenshot({ path: 'site/assets/og-preview.png' });
  console.log('Saved perfected Resend site/assets/og-preview.png (1200x630)');

  await browser.close();
  fs.unlinkSync('temp_og_preview.html');
})();
