const fs = require('fs');
const https = require('https');
const http = require('http');

const urls = [
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Ambaji_Temple_in_Night.jpg/800px-Ambaji_Temple_in_Night.jpg', file: './public/images/ambaji.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Kalika_Mata_Temple_Pavagadh.jpg/800px-Kalika_Mata_Temple_Pavagadh.jpg', file: './public/images/pavagadh.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Dwarkadhish_Temple.jpg/800px-Dwarkadhish_Temple.jpg', file: './public/images/dwarka.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Somnath_mandir_%28cropped%29.jpg/800px-Somnath_mandir_%28cropped%29.jpg', file: './public/images/somnath.jpg' }
];

fs.mkdirSync('./public/images', { recursive: true });

function download(url, file, redirects = 0) {
  if (redirects > 5) {
    console.error(`Too many redirects for ${file}`);
    return;
  }
  const client = url.startsWith('https') ? https : http;
  client.get(url, { headers: { 'User-Agent': 'TempleInsightApp/1.0 (Contact: demo@example.com)' } }, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      console.log(`Redirecting ${file} to ${res.headers.location}`);
      download(res.headers.location, file, redirects + 1);
      return;
    }
    if (res.statusCode !== 200) {
      console.error(`Failed to download ${url}: ${res.statusCode}`);
      return;
    }
    const fileStream = fs.createWriteStream(file);
    res.pipe(fileStream);
    fileStream.on('finish', () => {
      const stats = fs.statSync(file);
      console.log(`Downloaded ${file} (${stats.size} bytes)`);
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${url}:`, err.message);
  });
}

urls.forEach(({ url, file }) => download(url, file));
