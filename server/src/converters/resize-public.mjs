import { join } from "path";
import { globby } from "globby";
import { dirname } from 'path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'url';
import sharp from "sharp";

/**
 * @param {Buffer} buffer
 * @param {object} options
 * @param {number} [options.extension]
 * @param {number} [options.height]
 * @param {number} [options.width]
 * @returns {Promise<Uint8Array>}
 */
async function convertImage(buffer, options) {
    return sharp(buffer)
        .resize({
            fit: "cover",
            height: options.height,
            width: options.width,
            withoutEnlargement: true
        })
        .toFormat(options.extension ?? "webp")
        .toBuffer();
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const uploadImages = await globby([join(__dirname, "../../../public/images") + "**/*.jpg"])
await Promise.all(uploadImages.map(async image => {
    return convertImage(await fs.readFile(image), {
        height: 1080
    }).then(async resizeBuffer => {
        await fs.writeFile(image.replace(".jpg", ".webp"), resizeBuffer);
    })
}));
const profileImages = await globby([join(__dirname, "../../../public/images") + "**/profiles/*.jpg"])
await Promise.all(uploadImages.map(async image => {
    return convertImage(await fs.readFile(image), {
        width: 46,
        height: 46
    }).then(async resizeBuffer => {
        await fs.writeFile(image.replace(".jpg", ".webp"), resizeBuffer);
    })
}));
