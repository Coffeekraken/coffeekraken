function o(e,t){var r;return e.nodeName!="#comment"&&e.nodeName!="#text"&&((r=Element.prototype).matches||r.webkitMatchesSelector||r.mozMatchesSelector||r.msMatchesSelector||function(n){return[].indexOf.call(document.querySelectorAll(n),this)!==-1}).call(e,t)}function c(e,t){var r=e;for(e=e.parentNode;e&&e!=r.ownerDocument;){if(typeof t=="function"){if(t(e))return e}else if(typeof t=="string"&&o(e,t))return e;e=e.parentNode}return null}export{c as _};
