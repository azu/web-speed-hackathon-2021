import { join } from "path";
import { globby } from "globby";
import { dirname } from 'path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'url';
import { createFFmpeg } from "@ffmpeg/ffmpeg";

const ffmpeg = createFFmpeg({ log: false });
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * 先頭 5 秒のみ、正方形にくり抜かれた無音動画を作成します
 * @param {Buffer} buffer
 * @param {object} options
 * @param {number} [options.extension]
 * @param {number} [options.size]
 * @returns {Promise<Uint8Array>}
 */
async function convertMovie(buffer, options = {}) {
    const cropOptions = [
        "'min(iw,ih)':'min(iw,ih)'",
        options.size ? `scale=${options.size}:${options.size}` : undefined
    ]
        .filter(Boolean)
        .join(",");
    
    const exportFile = `export.${options.extension ?? "mp4"}`;
    
    if (ffmpeg.isLoaded() === false) {
        await ffmpeg.load();
    }
    
    ffmpeg.FS("writeFile", "file", new Uint8Array(buffer));
    
    await ffmpeg.run(...["-i", "file", "-t", "5", "-r", "10", "-vf", `crop=${cropOptions}`, "-an", exportFile]);
    return ffmpeg.FS("readFile", exportFile);
}

const images = await globby(join(__dirname, "../../../public/movies") + "**/*.gif")
for (const image of images) {
    await convertMovie(await fs.readFile(image)).then(async resizeBuffer => {
        await fs.writeFile(image, resizeBuffer);
    })
}
