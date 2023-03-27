const __viteBrowserExternal_fs = new Proxy({}, {
  get(_, key) {
    throw new Error(`Module "fs" has been externalized for browser compatibility. Cannot access "fs.${key}" in client code.  See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
  }
});
export {
  __viteBrowserExternal_fs as default
};
