import { join } from "path";
import { globby } from "globby";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { convertImage} from "./convert_image.js"
const __dirname = dirname(fileURLToPath(import.meta.url));
const images = await globby(join(__dirname, "../../../public/images") +"**/*.jpg")
const all = images.map(async image => {
    return convertImage(await fs.readFile(image), {
        width: 2000
    });
});
await Promise.all(all);
