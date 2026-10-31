import fs from 'node:fs';

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  return await res.text();
}

async function run() {
  const html = await fetchPage('https://www.skillsdirectory.com/skills?securityGrade=all&sort=stars');
  fs.writeFileSync('temp-stars-page.html', html, 'utf8');
  console.log('Saved temp-stars-page.html, size:', html.length);
  
  // Find skill links
  const regex = /href="\/skills\/([^"/?#]+)"/g;
  let m;
  const skills = new Set();
  while ((m = regex.exec(html)) !== null) {
    const slug = m[1];
    if (!['all', 'best', 'security', 'advertise'].includes(slug)) {
      skills.add(slug);
    }
  }
  console.log('Found skills count on page 1:', skills.size);
  console.log('Skills list:', Array.from(skills));
}

run();
