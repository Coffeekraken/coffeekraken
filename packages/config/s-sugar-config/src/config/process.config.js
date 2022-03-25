function process_config_default(env) {
  if (env.platform !== "node")
    return;
  return {
    killOnError: true,
    stdio: "inherit",
    throw: true,
    exitAtEnd: false,
    runAsChild: false,
    processPath: null
  };
}
export {
  process_config_default as default
};
