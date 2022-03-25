function staticBuilder_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    input: "[config.storage.package.rootDir]/sitemap.xml",
    outDir: "[config.storage.package.rootDir]/static",
    host: "http://[config.frontendServer.hostname]:[config.frontendServer.port]",
    failAfter: -1,
    requestTimeout: 5e3,
    requestRetry: 5,
    requestRetryTimeout: 1e3,
    clean: false,
    incremental: true,
    assets: {
      docmap: {
        from: "[config.staticBuilder.host]/docmap.json",
        to: "[config.staticBuilder.outDir]/docmap.json"
      },
      manifest: {
        from: "[config.storage.package.rootDir]/manifest.json",
        to: "[config.staticBuilder.outDir]/manifest.json"
      },
      sitemap: {
        from: "[config.storage.package.rootDir]/sitemap.xml",
        to: "[config.staticBuilder.outDir]/sitemap.xml"
      },
      favicon: {
        from: "[config.storage.package.rootDir]/favicon.ico",
        to: "[config.staticBuilder.outDir]/favicon.ico"
      },
      dist: {
        from: "[config.storage.dist.rootDir]",
        to: "[config.staticBuilder.outDir]"
      }
    }
  };
}
export {
  staticBuilder_config_default as default
};
