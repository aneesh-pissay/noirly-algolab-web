import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const logo = resolve(root, 'public/logo.png');
const icon = resolve(root, 'app/icon.png');
const appleIcon = resolve(root, 'app/apple-icon.png');

for (const target of [icon, appleIcon]) {
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(logo, target);
}

console.log('Synced favicon from public/logo.png → app/icon.png, app/apple-icon.png');
