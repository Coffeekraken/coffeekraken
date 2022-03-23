import "../../../../../chunk-JETN4ZEY.mjs";
import __encodeObject from "object-encode";
var object_default = {
  encrypt: function(object, salt = "coffeekraken.sugar.crypt.object") {
    return __encodeObject.encode_object(object, "base64", salt);
  },
  decrypt: function(encodedObject, salt = "coffeekraken.sugar.crypt.object") {
    return __encodeObject.decode_object(encodedObject, "base64", salt);
  }
};
export {
  object_default as default
};
