import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
function whenDomReady() {
  return new Promise((resolve) => {
    if (document.readyState === "complete") {
      resolve();
    } else {
      document.onreadystatechange = () => {
        if (document.readyState === "complete") {
          resolve();
        }
      };
    }
  });
}
export {
  whenDomReady as default
};
