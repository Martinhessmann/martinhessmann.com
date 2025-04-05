const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { createWriteStream } = require('fs');
const { pipeline } = require('stream/promises');

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

const metadataPath = path.join(__dirname, '..', 'data', 'website-metadata.json');
const imagesDir = path.join(__dirname, '..', 'public', 'images', 'clients');

async function ensureDirectoryExists(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
    console.log(`Directory created: ${dir}`);
  } catch (error) {
    console.error(`Failed to create directory: ${error}`);
  }
}

async function downloadImage(url, imagePath) {
  try {
    // Generate a full local file path
    const fullImagePath = path.join(imagesDir, path.basename(imagePath));

    // Create a write stream for the image
    const writer = createWriteStream(fullImagePath);

    // Download the image
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    // Pipe the response data to the file
    await pipeline(response.data, writer);

    console.log(`Image downloaded: ${fullImagePath}`);
    return true;
  } catch (error) {
    console.error(`Error downloading image: ${error.message}`);
    return false;
  }
}

async function extractMetadata(url) {
  try {
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    console.log(`Fetching metadata for: ${fullUrl}`);

    // Set a reasonable timeout
    const response = await axios.get(fullUrl, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // Extract Open Graph metadata
    const ogTitle = $('meta[property="og:title"]').attr('content') ||
      $('meta[name="twitter:title"]').attr('content') ||
      $('title').text() || '';

    const ogDescription = $('meta[property="og:description"]').attr('content') ||
      $('meta[name="twitter:description"]').attr('content') ||
      $('meta[name="description"]').attr('content') || '';

    // Get theme color from manifest or meta tags
    const themeColor = $('meta[name="theme-color"]').attr('content') ||
      $('meta[name="msapplication-TileColor"]').attr('content') || '';

    // Get site name
    const siteName = $('meta[property="og:site_name"]').attr('content') || '';

    // Get favicon
    const faviconLink = $('link[rel="icon"]').attr('href') ||
      $('link[rel="shortcut icon"]').attr('href') || '/favicon.ico';

    // Normalize favicon URL
    let favicon = faviconLink;
    if (!favicon.startsWith('http') && !favicon.startsWith('//')) {
      if (!favicon.startsWith('/')) {
        favicon = `/${favicon}`;
      }
      favicon = new URL(favicon, fullUrl).href;
    } else if (favicon.startsWith('//')) {
      favicon = `https:${favicon}`;
    }

    // Get image if available
    const ogImage = $('meta[property="og:image"]').attr('content') ||
      $('meta[name="twitter:image"]').attr('content') || '';

    // Clean URL for file naming
    const cleanedUrl = url.replace(/https?:\/\//, '').replace(/\//g, '-').replace(/\.html$/, '').replace(/\.$/, '');

    // Image path for default screenshot
    const defaultImagePath = `/images/clients/${cleanedUrl}.jpg`;

    // Image path for OG image if we download it
    const ogImageFileName = ogImage ? `${cleanedUrl}-og.jpg` : null;
    const ogImagePath = ogImageFileName ? `/images/clients/${ogImageFileName}` : null;

    // Download the OG image if available
    let downloadedOgImage = false;
    if (ogImage) {
      // Resolve the full URL if relative
      const absoluteOgImageUrl = ogImage.startsWith('http')
        ? ogImage
        : ogImage.startsWith('//')
          ? `https:${ogImage}`
          : `${fullUrl}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

      downloadedOgImage = await downloadImage(absoluteOgImageUrl, ogImageFileName);
    }

    return {
      url,
      imagePath: defaultImagePath,
      ogTitle,
      ogDescription,
      themeColor,
      siteName,
      favicon,
      ogImage: downloadedOgImage ? ogImagePath : ogImage, // If downloaded, use local path
      ogImageDownloaded: downloadedOgImage
    };
  } catch (error) {
    console.error(`Error fetching metadata for ${url}: ${error.message}`);
    return {
      url,
      imagePath: `/images/clients/${url.replace(/https?:\/\//, '').replace(/\//g, '-').replace(/\.html$/, '').replace(/\.$/, '')}.jpg`,
      error: error.message
    };
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
  // Ensure the images directory exists
  await ensureDirectoryExists(imagesDir);

  const results = [];

  for (const website of websites) {
    const result = await extractMetadata(website);
    results.push(result);
  }

  // Save metadata to a JSON file
  await saveMetadata(results);

  console.log('All website metadata collected!');
}

main().catch(error => {
  console.error('Error in main process:', error);
  process.exit(1);
});