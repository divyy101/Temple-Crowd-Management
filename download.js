const fs = require('fs');
const https = require('https');

const urls = [
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Somnath_mandir_%28cropped%29.jpg/800px-Somnath_mandir_%28cropped%29.jpg', file: './public/images/somnath.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Dwarkadhish_Temple.jpg/800px-Dwarkadhish_Temple.jpg', file: './public/images/dwarka.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Ambaji_Temple_main_front_view.JPG/800px-Ambaji_Temple_main_front_view.JPG', file: './public/images/ambaji.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Pavagadh_hill.jpg/800px-Pavagadh_hill.jpg', file: './public/images/pavagadh.jpg' }
];

fs.mkdirSync('./public/images', { recursive: true });

urls.forEach(({ url, file }) => {
  https.get(url, { headers: { 'User-Agent': 'TempleInsightApp/1.0 (Contact: demo@example.com)' } }, (res) => {
    if (res.statusCode !== 200) {
      console.error(`Failed to download ${url}: ${res.statusCode}`);
      return;
    }
    const fileStream = fs.createWriteStream(file);
    res.pipe(fileStream);
    fileStream.on('finish', () => console.log('Downloaded', file));
  }).on('error', (err) => {
    console.error(`Error downloading ${url}:`, err);
  });
});
