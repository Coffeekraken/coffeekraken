const __fs = new Proxy({}, {
  get(_, key) {
    throw new Error(`Module "fs" has been externalized for browser compatibility. Cannot access "fs.${key}" in client code.  See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
  }
});
const __viteBrowserExternal_fs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __fs
}, Symbol.toStringTag, { value: "Module" }));
export {
  __fs as _,
  __viteBrowserExternal_fs as a
};
