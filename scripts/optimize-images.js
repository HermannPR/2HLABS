/**
 * Image Optimization Script
 * Converts all PNG images to WebP format with optimal quality
 * Preserves original PNGs as fallback for older browsers
 */

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'assets');

// Configuration
const CONFIG = {
  webp: {
    quality: 85, // High quality WebP
    effort: 6,   // Compression effort (0-6, higher = smaller file but slower)
  },
  png: {
    quality: 90,        // Optimize original PNGs too
    compressionLevel: 9, // Maximum PNG compression
  }
};

// Statistics tracking
const stats = {
  processed: 0,
  webpCreated: 0,
  pngOptimized: 0,
  totalOriginalSize: 0,
  totalWebPSize: 0,
  totalPngOptimizedSize: 0,
  errors: []
};

/**
 * Recursively find all PNG files in a directory
 */
async function findPNGFiles(dir, fileList = []) {
  const files = await fs.readdir(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      await findPNGFiles(filePath, fileList);
    } else if (file.toLowerCase().endsWith('.png')) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

/**
 * Get file size in bytes
 */
async function getFileSize(filePath) {
  try {
    const stat = await fs.stat(filePath);
    return stat.size;
  } catch {
    return 0;
  }
}

/**
 * Format bytes to human-readable size
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

/**
 * Convert PNG to WebP
 */
async function convertToWebP(pngPath) {
  const webpPath = pngPath.replace(/\.png$/i, '.webp');
  const originalSize = await getFileSize(pngPath);

  try {
    // Convert to WebP
    await sharp(pngPath)
      .webp(CONFIG.webp)
      .toFile(webpPath);

    const webpSize = await getFileSize(webpPath);
    const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);

    stats.webpCreated++;
    stats.totalOriginalSize += originalSize;
    stats.totalWebPSize += webpSize;

    console.log(`  ✓ ${path.basename(pngPath)} → ${path.basename(webpPath)}`);
    console.log(`    ${formatBytes(originalSize)} → ${formatBytes(webpSize)} (${savings}% smaller)`);

    return true;
  } catch (error) {
    stats.errors.push({ file: pngPath, error: error.message });
    console.error(`  ✗ Failed to convert ${path.basename(pngPath)}:`, error.message);
    return false;
  }
}

/**
 * Optimize original PNG
 */
async function optimizePNG(pngPath) {
  const tempPath = pngPath + '.tmp';
  const originalSize = await getFileSize(pngPath);

  try {
    // Optimize PNG with sharp
    await sharp(pngPath)
      .png({
        quality: CONFIG.png.quality,
        compressionLevel: CONFIG.png.compressionLevel,
        palette: true, // Use palette if possible
      })
      .toFile(tempPath);

    const optimizedSize = await getFileSize(tempPath);

    // Only replace if optimized version is smaller
    if (optimizedSize < originalSize) {
      await fs.unlink(pngPath);
      await fs.rename(tempPath, pngPath);

      const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
      stats.pngOptimized++;
      stats.totalPngOptimizedSize += optimizedSize;

      console.log(`    PNG optimized: ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (${savings}% smaller)`);
    } else {
      // Optimization didn't help, keep original
      await fs.unlink(tempPath);
      stats.totalPngOptimizedSize += originalSize;
      console.log(`    PNG already optimal`);
    }

    return true;
  } catch (error) {
    // Clean up temp file if it exists
    try {
      await fs.unlink(tempPath);
    } catch {}

    console.error(`    Failed to optimize PNG:`, error.message);
    stats.totalPngOptimizedSize += originalSize;
    return false;
  }
}

/**
 * Process a single PNG file
 */
async function processImage(pngPath) {
  const relativePath = path.relative(PUBLIC_DIR, pngPath);
  console.log(`\n📷 Processing: ${relativePath}`);

  stats.processed++;

  // Convert to WebP
  await convertToWebP(pngPath);

  // Optimize original PNG as fallback
  await optimizePNG(pngPath);
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting Image Optimization...\n');
  console.log(`📁 Scanning directory: ${PUBLIC_DIR}\n`);

  // Find all PNG files
  const pngFiles = await findPNGFiles(PUBLIC_DIR);

  if (pngFiles.length === 0) {
    console.log('⚠️  No PNG files found!');
    return;
  }

  console.log(`Found ${pngFiles.length} PNG file(s) to optimize\n`);
  console.log('━'.repeat(60));

  // Process each image
  for (const pngFile of pngFiles) {
    await processImage(pngFile);
  }

  // Print summary
  console.log('\n' + '━'.repeat(60));
  console.log('\n📊 OPTIMIZATION SUMMARY\n');
  console.log(`Images processed:     ${stats.processed}`);
  console.log(`WebP files created:   ${stats.webpCreated}`);
  console.log(`PNGs optimized:       ${stats.pngOptimized}`);

  if (stats.errors.length > 0) {
    console.log(`\n❌ Errors:            ${stats.errors.length}`);
    stats.errors.forEach(({ file, error }) => {
      console.log(`  - ${path.basename(file)}: ${error}`);
    });
  }

  console.log('\n📦 SIZE COMPARISON\n');
  console.log(`Original PNGs:        ${formatBytes(stats.totalOriginalSize)}`);
  console.log(`Optimized PNGs:       ${formatBytes(stats.totalPngOptimizedSize)}`);
  console.log(`WebP versions:        ${formatBytes(stats.totalWebPSize)}`);

  const totalPngSavings = stats.totalOriginalSize - stats.totalPngOptimizedSize;
  const totalWebPSavings = stats.totalOriginalSize - stats.totalWebPSize;
  const pngSavingsPercent = ((totalPngSavings / stats.totalOriginalSize) * 100).toFixed(1);
  const webpSavingsPercent = ((totalWebPSavings / stats.totalOriginalSize) * 100).toFixed(1);

  console.log(`\nPNG optimization:     -${formatBytes(totalPngSavings)} (${pngSavingsPercent}%)`);
  console.log(`WebP savings:         -${formatBytes(totalWebPSavings)} (${webpSavingsPercent}%)`);

  console.log('\n' + '━'.repeat(60));
  console.log('\n✅ Image optimization complete!\n');
  console.log('Next steps:');
  console.log('1. Update image references to use <picture> elements');
  console.log('2. Test images in your application');
  console.log('3. Deploy optimized assets\n');
}

// Run the script
main().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
