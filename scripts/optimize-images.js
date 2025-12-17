/**
 * Image Optimization Script
 * 
 * This script converts large JPG/JPEG images to WebP format with optimized compression
 * Expected savings: ~1,592 KiB (based on Lighthouse report)
 * 
 * Usage: node scripts/optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');

// Images to optimize (from Lighthouse report)
const imagesToOptimize = [
  {
    input: 'Rapat_2025_08_12.jpg',
    expectedSize: '398.5 KiB',
    targetSize: '120 KiB',
    quality: 80,
    resize: { width: 1500, height: 792 } // Resize for displayed dimensions
  },
  {
    input: 'Pura Luhur POTEN.JPG',
    expectedSize: '398.8 KiB',
    targetSize: '200 KiB',
    quality: 75,
    resize: null // Keep original size for hero images
  },
  {
    input: 'WhatsApp_Image_2025-09-21_at_20.07.38 2.jpeg',
    expectedSize: '155.9 KiB',
    targetSize: '80 KiB',
    quality: 80,
    resize: { width: 1258, height: 663 }
  },
  {
    input: 'WhatsApp Image 2025-11-08 at 10.20.47 PM.jpeg',
    expectedSize: '105.2 KiB',
    targetSize: '40 KiB',
    quality: 80,
    resize: { width: 1280, height: 676 }
  },
  {
    input: 'DSC08518.JPG',
    expectedSize: '56.1 KiB',
    targetSize: '40 KiB',
    quality: 85, // Higher quality for LCP image
    resize: { width: 1500, height: 790 }
  },
  {
    input: 'Rapat 2025_11_14.jpg',
    expectedSize: 'unknown',
    targetSize: '120 KiB',
    quality: 80,
    resize: { width: 1500, height: 792 }
  }
];

async function optimizeImage(imageConfig) {
  const inputPath = path.join(publicDir, imageConfig.input);
  const outputPath = inputPath.replace(/\.(jpg|jpeg|JPG|JPEG)$/i, '.webp');

  try {
    // Check if input file exists
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Skipped: ${imageConfig.input} (file not found)`);
      return;
    }

    // Get original file size
    const originalStats = fs.statSync(inputPath);
    const originalSizeKB = (originalStats.size / 1024).toFixed(1);

    // Process image
    let sharpInstance = sharp(inputPath);

    // Resize if specified
    if (imageConfig.resize) {
      sharpInstance = sharpInstance.resize(
        imageConfig.resize.width,
        imageConfig.resize.height,
        {
          fit: 'cover',
          position: 'center'
        }
      );
    }

    // Convert to WebP
    await sharpInstance
      .webp({ 
        quality: imageConfig.quality,
        effort: 6 // Maximum compression effort (0-6)
      })
      .toFile(outputPath);

    // Get new file size
    const newStats = fs.statSync(outputPath);
    const newSizeKB = (newStats.size / 1024).toFixed(1);
    const savings = ((originalStats.size - newStats.size) / 1024).toFixed(1);
    const savingsPercent = (((originalStats.size - newStats.size) / originalStats.size) * 100).toFixed(1);

    console.log(`✅ ${imageConfig.input}`);
    console.log(`   Original: ${originalSizeKB} KB → WebP: ${newSizeKB} KB`);
    console.log(`   Savings: ${savings} KB (${savingsPercent}%)\n`);

  } catch (error) {
    console.error(`❌ Error processing ${imageConfig.input}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Starting image optimization...\n');
  console.log('📁 Public directory:', publicDir, '\n');

  let totalOriginalSize = 0;
  let totalNewSize = 0;

  for (const imageConfig of imagesToOptimize) {
    await optimizeImage(imageConfig);
  }

  console.log('\n✨ Image optimization complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Update image references in components to use .webp extension');
  console.log('2. Or keep original filenames and Next.js will auto-serve WebP');
  console.log('3. Run: npm run build');
  console.log('4. Test: npm run start');
  console.log('5. Run Lighthouse to verify improvements\n');
}

main().catch(console.error);

