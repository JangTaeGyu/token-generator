const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const outputDir = path.join(__dirname, '../public/icons');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// SVG icon with gradient background
const createSvg = (size, maskable = false) => {
  const padding = maskable ? size * 0.1 : 0;
  const iconSize = size - padding * 2;
  const cx = size / 2;
  const cy = size / 2;

  return `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#00f5ff"/>
          <stop offset="100%" style="stop-color:#a855f7"/>
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" fill="url(#bg)" rx="${size * 0.15}"/>
      <g transform="translate(${cx - iconSize * 0.3}, ${cy - iconSize * 0.3}) scale(${iconSize * 0.025})">
        <path fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
      </g>
    </svg>
  `;
};

async function generateIcons() {
  console.log('Generating PWA icons...');

  for (const size of sizes) {
    // Regular icon
    const svg = createSvg(size, false);
    await sharp(Buffer.from(svg))
      .png()
      .toFile(path.join(outputDir, `icon-${size}.png`));
    console.log(`Generated icon-${size}.png`);
  }

  // Maskable icons (with safe zone padding)
  for (const size of [192, 512]) {
    const svg = createSvg(size, true);
    await sharp(Buffer.from(svg))
      .png()
      .toFile(path.join(outputDir, `icon-maskable-${size}.png`));
    console.log(`Generated icon-maskable-${size}.png`);
  }

  console.log('Done!');
}

generateIcons().catch(console.error);
