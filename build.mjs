import { mkdir, copyFile, cp, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const destination = path.join(root, 'dist');
await mkdir(destination, { recursive: true });
for (const file of ['index.html', 'our-story.html', 'style.css', 'app.js', '_headers']) {
  await copyFile(path.join(root, file), path.join(destination, file));
  if (file.endsWith('.html')) {
    const html = await readFile(path.join(destination, file), 'utf8');
    await writeFile(path.join(destination, file), html
      .replaceAll('LOCAL TRIAL', 'DEVELOPMENT PREVIEW')
      .replaceAll('Local website trial', 'Development website preview'));
  }
}
await cp(path.join(root, 'assets'), path.join(destination, 'assets'), { recursive: true });
console.log('Website prepared in dist. Internal notes and local tools are excluded.');
