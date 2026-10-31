import fs from 'node:fs';

const slugs = [
  'davila7-clean-code',
  'imbad0202-deep-research',
  'wshobson-responsive-design',
  'affaan-m-marketing-campaign',
  'secondsky-seo-optimizer',
  'yamadashy-browser-extension-developer',
  'veelenga-mermaid-diagrams',
  'davila7-email-composer'
];

async function checkSlugs() {
  for (const slug of slugs) {
    try {
      const res = await fetch(`https://www.skillsdirectory.com/skills/${slug}`, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      const html = await res.text();
      const ghMatches = [...html.matchAll(/https:\/\/github\.com\/([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)(\/blob\/[^\s"'\\]+)?/g)];
      if (ghMatches.length > 0) {
        const [full, owner, repo, blob] = ghMatches[0];
        console.log(`${slug} -> ${owner}/${repo} (${blob || 'root'})`);
      } else {
        console.log(`${slug} -> No GH match`);
      }
    } catch (e) {
      console.error(slug, e.message);
    }
  }
}

checkSlugs();
