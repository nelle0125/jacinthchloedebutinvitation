import fs from "fs";
import path from "path";
import sharp from "sharp";

const inputDir = "./photos";
const outputDir = "./optimized";

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Recursively get JPG files
function getJpgFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getJpgFiles(filePath));
    } else if (/\.(jpg|jpeg)$/i.test(file)) {
      results.push(filePath);
    }
  });

  return results;
}

(async () => {
  const files = getJpgFiles(inputDir);

  for (const file of files) {
    const relativePath = path.relative(inputDir, file);
    const outputPath = path.join(
      outputDir,
      relativePath.replace(/\.(jpg|jpeg)$/i, ".webp")
    );

    const outputFolder = path.dirname(outputPath);
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
    }

    try {
      await sharp(file)
        .resize({ width: 1920, withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(outputPath);

      console.log(`✅ Optimized: ${relativePath}`);
    } catch (err) {
      console.error(`❌ Failed: ${relativePath}`, err);
    }
  }

  console.log("\n🎉 All JPG images optimized successfully!");
})();