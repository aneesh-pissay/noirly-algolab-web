import fs from 'fs';

const routeTypeFiles = [
  '.next/dev/types/routes.d.ts',
  '.next/types/routes.d.ts',
];

for (const file of routeTypeFiles) {
  if (fs.existsSync(file) && fs.statSync(file).size === 0) {
    fs.unlinkSync(file);
    console.log(`Removed empty Next.js type file: ${file}`);
  }
}
