function imagesBuilder_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    glob: "**/*",
    compressExts: ["jpg", "jpeg", "png", "svg", "webp"],
    inDir: "[config.storage.src.imgDir]",
    outDir: "[config.storage.dist.imgDir]",
    quality: 80,
    webp: true,
    width: null,
    height: null,
    resolution: [1, 2],
    clear: true,
    specificParams: {}
  };
}
export {
  imagesBuilder_config_default as default
};
