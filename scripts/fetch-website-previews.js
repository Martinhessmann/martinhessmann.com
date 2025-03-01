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
const metadataPath = path.join(__dirname, '..', 'data', 'website-metadata.json');

async function ensureDirectoryExists(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
    console.log(`Directory created: ${dir}`);
  } catch (error) {
    console.error(`Failed to create directory: ${error}`);
  }
}

async function extractMetadata(page, url) {
  return await page.evaluate(() => {
    // Extract Open Graph metadata
    const ogTitle = document.querySelector('meta[property="og:title"]')?.content ||
      document.querySelector('meta[name="twitter:title"]')?.content ||
      document.title || '';

    const ogDescription = document.querySelector('meta[property="og:description"]')?.content ||
      document.querySelector('meta[name="twitter:description"]')?.content ||
      document.querySelector('meta[name="description"]')?.content || '';

    // Get theme color from manifest or meta tags
    const themeColor = document.querySelector('meta[name="theme-color"]')?.content ||
      document.querySelector('meta[name="msapplication-TileColor"]')?.content || '';

    // Get site name
    const siteName = document.querySelector('meta[property="og:site_name"]')?.content || '';

    // Get favicon
    const favicon = document.querySelector('link[rel="icon"]')?.href ||
      document.querySelector('link[rel="shortcut icon"]')?.href || '';

    return {
      ogTitle,
      ogDescription,
      themeColor,
      siteName,
      favicon
    };
  });
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

    // Extract metadata
    const metadata = await extractMetadata(page, url);

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
    return {
      url,
      imagePath: `/images/clients/${filename}`,
      ...metadata
    };
  } catch (error) {
    console.error(`Error capturing ${url}: ${error}`);
    return {
      url,
      error: error.message
    };
  } finally {
    await page.close();
  }
}

async function saveMetadata(results) {
  try {
    const dataDir = path.join(__dirname, '..', 'data');
    await ensureDirectoryExists(dataDir);

    await fs.writeFile(
      metadataPath,
      JSON.stringify(results, null, 2),
      'utf8'
    );
    console.log(`Metadata saved to ${metadataPath}`);
  } catch (error) {
    console.error(`Error saving metadata: ${error}`);
  }
}

async function main() {
  await ensureDirectoryExists(outputDir);

  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: { width: 1200, height: 800 }
  });

  const results = [];

  try {
    for (const website of websites) {
      const result = await getWebsitePreview(browser, website);
      results.push(result);
    }

    // Save metadata to a JSON file
    await saveMetadata(results);
  } finally {
    await browser.close();
  }

  console.log('All website previews captured!');
}

main().catch(error => {
  console.error('Error in main process:', error);
  process.exit(1);
});