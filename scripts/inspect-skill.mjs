async function run() {
  const res = await fetch('https://www.skillsdirectory.com/skills/obra-writing-skills', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const html = await res.text();
  console.log('Status:', res.status, 'Length:', html.length);
  const ghMatches = [...html.matchAll(/https:\/\/github\.com\/[^"\s<>]+/g)].map(m => m[0]);
  console.log('GitHub links found:', [...new Set(ghMatches)]);
}
run();
