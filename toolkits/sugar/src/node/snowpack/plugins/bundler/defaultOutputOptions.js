const __path = require('path');
const __terser = require('rollup-plugin-terser').terser;

module.exports = function defaultOutputOptions(buildDirectory) {
  return {
    format: 'es',
    plugins: [__terser()],
    manualChunks: (id) => {
      if (id.includes('web_modules')) {
        return __path.parse(id).name;
      }
    },
    assetFileNames: 'css/[name]-[hash].[ext]',
    chunkFileNames: 'chunks/[name]-[hash].chunk.js',
    compact: true,
    sourcemap: true,
    entryFileNames: '[name]-[hash].js',
    dir: buildDirectory
  };
};
