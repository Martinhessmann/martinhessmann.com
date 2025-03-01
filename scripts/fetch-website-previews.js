const fs = require('fs').promises;
const path = require('path');
const puppeteer = require('puppeteer');

const websites = [
  'afurnet.org',
  'brasseriecolette.de',
  'dpf-investment.de',
  'ras-services.de',
  'tertianum-premiumresidences.de',
  'tertianum.de',
  'eon.com/de/c/whatsnetz.html',
  'spotsup.rent',
  'electronica.group',
  'fairworks.com',
  'gruen-berlin.de',
  'infrasignal.de',
  'stadtweideland.de',
  'partner.easycredit.de',
  'press.porsche-design.com',
  'teambank.de',
  'dein-womo.de',
  'womofonds.de'
];

const outputDir = path.join(__dirname, '..', 'public', 'images', 'clients');

async function ensureDirectoryExists() {
  try {
    await fs.mkdir(outputDir, { recursive: true });
    console.log(`Directory created: ${outputDir}`);
  } catch (error) {
    console.error(`Failed to create directory: ${error}`);
  }
}

async function getWebsitePreview(browser, url) {
  const page = await browser.newPage();

  try {
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;

    // Set viewport to a common size
    await page.setViewport({ width: 1200, height: 800 });

    // Navigate to the website
    await page.goto(fullUrl, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Create a clean filename
    const filename = url
      .replace(/https?:\/\//, '')
      .replace(/\//g, '-')
      .replace(/\.html$/, '')
      .replace(/\.$/, '') + '.jpg';

    const filePath = path.join(outputDir, filename);

    // Take a screenshot
    await page.screenshot({
      path: filePath,
      type: 'jpeg',
      quality: 80,
      clip: {
        x: 0,
        y: 0,
        width: 1200,
        height: 800
      }
    });

    console.log(`Screenshot saved for ${url}`);
    return filePath;
  } catch (error) {
    console.error(`Error capturing ${url}: ${error}`);
    return null;
  } finally {
    await page.close();
  }
}

async function main() {
  await ensureDirectoryExists();

  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: { width: 1200, height: 800 }
  });

  try {
    for (const website of websites) {
      await getWebsitePreview(browser, website);
    }
  } finally {
    await browser.close();
  }

  console.log('All website previews captured!');
}

main().catch(error => {
  console.error('Error in main process:', error);
  process.exit(1);
});