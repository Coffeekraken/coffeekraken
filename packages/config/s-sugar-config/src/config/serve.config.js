function postprocess(env, serveConfig, config) {
  return serveConfig;
}
var serve_config_default = (env, config) => {
  return {
    img: {
      url: "/dist/img"
    },
    js: {
      url: "/dist/js"
    },
    css: {
      url: "/dist/css"
    },
    icons: {
      url: "/dist/icons"
    },
    fonts: {
      url: "/dist/fonts"
    },
    cache: {
      url: "/cache"
    }
  };
};
export {
  serve_config_default as default,
  postprocess
};
