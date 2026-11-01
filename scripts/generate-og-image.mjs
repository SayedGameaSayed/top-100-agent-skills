import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const logoBase64 = fs.readFileSync('site/assets/logo.png').toString('base64');
const brainBase64 = fs.readFileSync('screenshots/home-dala-anatomical-brain.png').toString('base64');

const htmlContent = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1200px;
      height: 630px;
      background-color: #07070a;
      color: #ffffff;
      font-family: 'Cairo', sans-serif;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 50px 70px;
      overflow: hidden;
      position: relative;
    }
    
    /* Background subtle ambient glows */
    .glow-amber {
      position: absolute;
      top: -60px;
      left: 10%;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(255, 184, 41, 0.15) 0%, transparent 70%);
      filter: blur(50px);
      pointer-events: none;
    }
    .glow-violet {
      position: absolute;
      bottom: -80px;
      right: 10%;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(128, 82, 255, 0.20) 0%, transparent 70%);
      filter: blur(60px);
      pointer-events: none;
    }

    .text-content {
      flex: 1.25;
      z-index: 2;
      max-width: 630px;
    }

    .brand-header {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 24px;
    }
    .brand-logo {
      width: 44px;
      height: 44px;
      object-fit: contain;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(128, 82, 255, 0.18);
      border: 1px solid rgba(128, 82, 255, 0.45);
      border-radius: 9999px;
      padding: 6px 18px;
      font-size: 15px;
      font-weight: 700;
      color: #c084fc;
    }

    .title {
      font-size: 54px;
      font-weight: 900;
      line-height: 1.22;
      color: #ffffff;
      margin-bottom: 18px;
      letter-spacing: -0.5px;
    }
    .title span {
      color: #ffb829;
    }

    .description {
      font-size: 21px;
      font-weight: 400;
      line-height: 1.6;
      color: #cbd5e1;
      margin-bottom: 30px;
    }

    .footer-tags {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 9999px;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 600;
      color: #e2e8f0;
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
      border-radius: 24px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .visual-brain-crop img {
      width: 200%;
      height: 200%;
      object-fit: cover;
      object-position: 22% 38%;
      filter: contrast(1.1) brightness(1.1);
    }
  </style>
</head>
<body>
  <div class="glow-amber"></div>
  <div class="glow-violet"></div>

  <div class="text-content">
    <div class="brand-header">
      <img src="data:image/png;base64,${logoBase64}" class="brand-logo" alt="Logo">
      <div class="badge">
        <span>✨</span>
        <span>دليل مهارات الذكاء الاصطناعي</span>
      </div>
    </div>

    <h1 class="title">افهم المهارة <span>قبل أن تستخدمها</span>.</h1>
    <p class="description">
      دليل عربي لأشهر مهارات الذكاء الاصطناعي، مع برومبتات إنجليزية فورية جاهزة للنسخ لأي شات أو أداة تطوير، وتصنيف تفاعلي محدث يومياً.
    </p>

    <div class="footer-tags">
      <div class="tag">🏆 لوحة صدارة بالنجوم</div>
      <div class="tag">⚡ برومبت جاهز بنقرة</div>
      <div class="tag">🤖 مساعد ذكي مدمج</div>
    </div>
  </div>

  <div class="visual-col">
    <div class="visual-brain-crop">
      <img src="data:image/png;base64,${brainBase64}" alt="3D Neural Brain">
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
  console.log('Saved perfected site/assets/og-preview.png (1200x630)');

  await browser.close();
  fs.unlinkSync('temp_og_preview.html');
})();
