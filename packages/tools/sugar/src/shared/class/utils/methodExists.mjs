import "../../../../../../chunk-JETN4ZEY.mjs";
function methodExists(instance, ...methods) {
  const missingMethodsArray = [];
  if (!Array.isArray(methods))
    methods = [methods];
  methods.forEach((method) => {
    if (typeof instance[method] !== "function")
      missingMethodsArray.push(method);
  });
  return !missingMethodsArray.length ? true : missingMethodsArray;
}
var methodExists_default = methodExists;
export {
  methodExists_default as default
};
