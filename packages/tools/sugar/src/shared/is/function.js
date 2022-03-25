function isFunction(value) {
  return value && {}.toString.call(value) === "[object Function]";
}
var function_default = isFunction;
export {
  function_default as default
};
