import { readdirSync, readFileSync, existsSync } from 'fs';
import { format } from 'prettier';

let files = readdirSync('test/printer/samples').filter(
  (name) => name.endsWith('.html') || name.endsWith('.md')
);
