import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
async function read() {
  return navigator.clipboard.readText();
}
export {
  read as default
};
