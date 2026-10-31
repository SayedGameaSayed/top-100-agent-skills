import fs from 'node:fs';

const html = fs.readFileSync('temp-stars-page.html', 'utf8');

// Regex or pattern matcher for the React stream JSON in the page
function extractSkillsFromHtml(html) {
  const items = [];
  
  // Look for each skill href block:
  // href="/skills/([a-zA-Z0-9_-]+)"
  // Followed by title, description, category, stars, votes
  const skillRegex = /"href":"\/skills\/([^"]+)"[\s\S]*?"truncate text-title text-primary","children":"([^"]+)"[\s\S]*?"Security grade ([A-F])"[\s\S]*?"line-clamp-2 text-ui text-subtle","children":"([^"]+)"[\s\S]*?"bg-control px-2 py-0\.5 text-meta text-primary","children":"([^"]+)"[\s\S]*?"Votes: "\],"([^"]+)"[\s\S]*?"GitHub stars: "\],"([^"]+)"/g;
  
  let match;
  while ((match = skillRegex.exec(html)) !== null) {
    const [_, slug, title, grade, description, category, votesStr, starsStr] = match;
    const votes = parseInt(votesStr.replace(/,/g, ''), 10) || 0;
    const stars = parseInt(starsStr.replace(/,/g, ''), 10) || 0;
    
    items.push({
      slug,
      title,
      grade,
      description,
      category,
      votes,
      stars
    });
  }
  
  return items;
}

const extracted = extractSkillsFromHtml(html);
console.log('Extracted count:', extracted.length);
if (extracted.length > 0) {
  console.log('Sample item 0:', extracted[0]);
  console.log('Sample item last:', extracted[extracted.length - 1]);
}
