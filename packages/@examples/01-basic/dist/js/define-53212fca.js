import { p as SPromise, S as SInterface, e as SFeature, c as __deepMerge, q as __uniqid, z as STheme, A as __injectStyle } from "./index.esm.js";
function __whenImageLoaded($img) {
  let imgLoadedHandler, imgErrorHandler;
  const pro = new Promise((resolve, reject) => {
    if ($img.hasAttribute("src") && $img.complete) {
      resolve($img);
    } else {
      imgLoadedHandler = (e) => {
        resolve($img);
      };
      $img.addEventListener("load", imgLoadedHandler);
      imgErrorHandler = (e) => {
        reject(e);
      };
      $img.addEventListener("error", imgErrorHandler);
    }
  });
  pro.finally(() => {
    imgLoadedHandler && $img.removeEventListener("load", imgLoadedHandler);
    imgErrorHandler && $img.removeEventListener("error", imgErrorHandler);
  });
  return pro;
}
function __whenImagesLoaded($imgs) {
  return new SPromise(({ resolve, reject, emit }) => {
    const promises = [], loadedImages = [];
    Array.from($imgs).forEach(($img) => {
      promises.push(__whenImageLoaded($img).then((_$img) => {
        loadedImages.push(_$img);
        emit("loaded", _$img);
        if (loadedImages.length === $imgs.length) {
          resolve(loadedImages);
        }
      }).catch((error) => {
        reject(error);
      }));
    });
  });
}
/*! @license Rematrix v0.7.2

	Copyright 2021 Julian Lloyd.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/
function format(source) {
  if (source && source.constructor === Array) {
    var values = source.filter(function(value) {
      return typeof value === "number";
    }).filter(function(value) {
      return !isNaN(value);
    });
    if (source.length === 6 && values.length === 6) {
      var matrix = identity();
      matrix[0] = values[0];
      matrix[1] = values[1];
      matrix[4] = values[2];
      matrix[5] = values[3];
      matrix[12] = values[4];
      matrix[13] = values[5];
      return matrix;
    } else if (source.length === 16 && values.length === 16) {
      return source;
    }
  }
  throw new TypeError("Expected a `number[]` with length 6 or 16.");
}
function fromString(source) {
  if (typeof source === "string") {
    var match = source.match(/matrix(3d)?\(([^)]+)\)/);
    if (match) {
      var raw = match[2].split(",").map(parseFloat);
      return format(raw);
    }
    if (source === "none" || source === "") {
      return identity();
    }
  }
  throw new TypeError("Expected a string containing `matrix()` or `matrix3d()");
}
function identity() {
  var matrix = [];
  for (var i = 0; i < 16; i++) {
    i % 5 == 0 ? matrix.push(1) : matrix.push(0);
  }
  return matrix;
}
function multiply(matrixA, matrixB) {
  var fma = format(matrixA);
  var fmb = format(matrixB);
  var product = [];
  for (var i = 0; i < 4; i++) {
    var row = [fma[i], fma[i + 4], fma[i + 8], fma[i + 12]];
    for (var j = 0; j < 4; j++) {
      var k = j * 4;
      var col = [fmb[k], fmb[k + 1], fmb[k + 2], fmb[k + 3]];
      var result = row[0] * col[0] + row[1] * col[1] + row[2] * col[2] + row[3] * col[3];
      product[i + k] = result;
    }
  }
  return product;
}
function rotateX(angle) {
  var theta = Math.PI / 180 * angle;
  var matrix = identity();
  matrix[5] = matrix[10] = Math.cos(theta);
  matrix[6] = matrix[9] = Math.sin(theta);
  matrix[9] *= -1;
  return matrix;
}
function rotateY(angle) {
  var theta = Math.PI / 180 * angle;
  var matrix = identity();
  matrix[0] = matrix[10] = Math.cos(theta);
  matrix[2] = matrix[8] = Math.sin(theta);
  matrix[2] *= -1;
  return matrix;
}
function rotateZ(angle) {
  var theta = Math.PI / 180 * angle;
  var matrix = identity();
  matrix[0] = matrix[5] = Math.cos(theta);
  matrix[1] = matrix[4] = Math.sin(theta);
  matrix[4] *= -1;
  return matrix;
}
function toString(source) {
  return "matrix3d(" + format(source).join(", ") + ")";
}
function translate3d(distanceX, distanceY, distanceZ) {
  var matrix = identity();
  if (distanceX !== void 0 && distanceY !== void 0 && distanceZ !== void 0) {
    matrix[12] = distanceX;
    matrix[13] = distanceY;
    matrix[14] = distanceZ;
  }
  return matrix;
}
class SSugarElement {
  get matrix() {
    var _a;
    return (_a = this._tmpMatrix) !== null && _a !== void 0 ? _a : fromString(this.matrixStr);
  }
  /**
   * @name        matrixStr
   * @type        String
   * @readonly
   *
   * Get the matrix string of the current element
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get matrixStr() {
    return window.getComputedStyle(this.$elm).transform;
  }
  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  constructor($elm) {
    this.$elm = $elm;
  }
  /**
   * @name       simulateTransform
   * @type      Function
   *
   * Allows you to get back a new matrix by adding the properties passed
   * to the current element matrix. This mean that if the element is currently
   * in translateX 50 and you pass to the translateX argument 10, it will be 60 at the end.
   * To override the
   *
   * @param       {Number}        [x=null]            The x translation in px
   * @param       {Number}        [y=null]            The y translation in px
   * @param      {Number}        [z=null]            The z translation in px
   * @return     {SSugarElement}                     The sugar element instance
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  simulateTransform(transform) {
    var _a, _b, _c, _d, _e, _f;
    const translateMatrix = translate3d((_a = transform.translateX) !== null && _a !== void 0 ? _a : 0, (_b = transform.translateY) !== null && _b !== void 0 ? _b : 0, (_c = transform.translateZ) !== null && _c !== void 0 ? _c : 0), rotateXMatrix = rotateX((_d = transform.rotateX) !== null && _d !== void 0 ? _d : 0), rotateYMatrix = rotateY((_e = transform.rotateY) !== null && _e !== void 0 ? _e : 0), rotateZMatrix = rotateZ((_f = transform.rotateZ) !== null && _f !== void 0 ? _f : 0);
    let newMatrix = this.matrix;
    newMatrix = [newMatrix, translateMatrix, rotateXMatrix, rotateYMatrix, rotateZMatrix].reduce(multiply);
    const newTranslates = this.getTranslates(newMatrix), newRotates = this.getRotates(newMatrix);
    return {
      translateX: newTranslates.x,
      translateY: newTranslates.y,
      translateZ: newTranslates.z,
      rotateX: newRotates.x,
      rotateY: newRotates.y,
      rotateZ: newRotates.z,
      matrix: toString(newMatrix)
    };
  }
  /**
   * @name            applyMatrix
   * @type        Function
   *
   * Apply a matrix to the current element
   *
   * @param       {Array[]}           matrix           The matrix to apply
   * @return          {SSugarElement}                     The sugar element instance
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  applyMatrix(...matrix) {
    var _a;
    let newMatrix = (_a = this._tmpMatrix) !== null && _a !== void 0 ? _a : this.matrix;
    matrix.forEach((m) => {
      newMatrix = multiply(newMatrix, m);
    });
    this._tmpMatrix = newMatrix;
    setTimeout(() => {
      this.$elm.style.transform = toString(newMatrix);
      this._tmpMatrix = null;
    });
    return this;
  }
  /**
   * @name            overrideMatrix
   * @type        Function
   *
   * Apply a matrix to the current element
   *
   * @param       {Array[]}           matrix           The matrix to apply
   * @return          {SSugarElement}                     The sugar element instance
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  overrideMatrix(matrix) {
    this._tmpMatrix = matrix;
    setTimeout(() => {
      this.$elm.style.transform = toString(matrix);
      this._tmpMatrix = null;
    });
    return this;
  }
  /**
   * @name        getTranslates
   * @type       Function
   *
   * This method allows you to get the current translation of the element at a this specific time
   *
   * @return      {ISSugarElementTranslates}          The translates object
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  getTranslates(fromMatrix = this.matrix) {
    return {
      x: isNaN(fromMatrix[12]) ? 0 : fromMatrix[12],
      y: isNaN(fromMatrix[13]) ? 0 : fromMatrix[13],
      z: isNaN(fromMatrix[14]) ? 0 : fromMatrix[14]
    };
  }
  /**
   * @name        getRotates
   * @type       Function
   *
   * This method allows you to get the current translation of the element at a this specific time
   *
   * @return      {ISSugarElementTranslates}          The translates object
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  getRotates(fromMatrix = this.matrix) {
    const matrix = fromMatrix.toString();
    var values = matrix.split(","), pi = Math.PI, sinB = parseFloat(values[8]), b = Math.round(Math.asin(sinB) * 180 / pi), cosB = Math.cos(b * pi / 180), matrixVal10 = parseFloat(values[9]), a = Math.round(Math.asin(-matrixVal10 / cosB) * 180 / pi), matrixVal1 = parseFloat(values[0]), c = Math.round(Math.acos(matrixVal1 / cosB) * 180 / pi);
    return {
      x: a,
      y: b,
      z: c
    };
  }
  /**
   * @name       setTranslate
   * @type      Function
   *
   * Allows you to set the translate of an HTMLElement by setting his translates properties.
   * This will override the previous matrix translates. If you want to "add" a translation, use the `translate` method instead;
   *
   * @param       {Number}        [x=null]            The x translation in px
   * @param       {Number}        [y=null]            The y translation in px
   * @param      {Number}        [z=null]            The z translation in px
   * @return     {SSugarElement}                     The sugar element instance
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  setTranslate(x, y, z) {
    const newMatrix = this.matrix;
    if (x !== void 0)
      newMatrix[12] = x;
    if (y !== void 0)
      newMatrix[13] = y;
    if (z !== void 0)
      newMatrix[14] = z;
    return this.overrideMatrix(newMatrix);
  }
  /**
   * @name       translate
   * @type      Function
   *
   * Allows you to translate an HTMLElement by setting his translate properties
   *
   * @param       {Number}        [x=null]            The x translation in px
   * @param       {Number}        [y=null]            The y translation in px
   * @param      {Number}        [z=null]            The z translation in px
   * @return     {SSugarElement}                     The sugar element instance
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  translate(x, y, z) {
    const translateMatrix = translate3d(x !== null && x !== void 0 ? x : 0, y !== null && y !== void 0 ? y : 0, z !== null && z !== void 0 ? z : 0);
    return this.applyMatrix(translateMatrix);
  }
  /**
   * @name       rotate
   * @type      Function
   *
   * Allows you to rotate an HTMLElement by setting his transformation properties
   *
   * @param       {Number}        [x=null]            The x rotation in px
   * @param       {Number}        [y=null]            The y rotation in px
   * @param      {Number}        [z=null]            The z rotation in px
   * @return     {SSugarElement}                     The sugar element instance
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  rotate(x, y, z) {
    const rotateXMatrix = rotateX(x !== null && x !== void 0 ? x : 0), rotateYMatrix = rotateY(y !== null && y !== void 0 ? y : 0), rotateZMatrix = rotateZ(z !== null && z !== void 0 ? z : 0);
    return this.applyMatrix(rotateXMatrix, rotateYMatrix, rotateZMatrix);
  }
  /**
   * @name       setRotates
   * @type      Function
   *
   * Allows you to set the rotates of any HTMLElement by setting his transformation properties
   *
   * @param       {Number}        [x=null]            The x rotation in px
   * @param       {Number}        [y=null]            The y rotation in px
   * @param      {Number}        [z=null]            The z rotation in px
   * @return     {SSugarElement}                     The sugar element instance
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  setRotate(x, y, z) {
    const rotateMatrix = [rotateX(x !== null && x !== void 0 ? x : 0), rotateX(y !== null && y !== void 0 ? y : 0), rotateX(z !== null && z !== void 0 ? z : 0)].reduce(multiply);
    const newMatrix = this.matrix;
    if (x !== void 0) {
      newMatrix[5] = rotateMatrix[5];
      newMatrix[6] = rotateMatrix[6];
      newMatrix[9] = rotateMatrix[9];
    }
    if (y !== void 0) {
      newMatrix[0] = rotateMatrix[0];
      newMatrix[2] = rotateMatrix[2];
    }
    if (z !== void 0) {
      newMatrix[0] = rotateMatrix[0];
      newMatrix[1] = rotateMatrix[1];
      newMatrix[4] = rotateMatrix[4];
    }
    return this.overrideMatrix(newMatrix);
  }
}
class SAppearFeatureInterface extends SInterface {
  static get _definition() {
    return {
      in: {
        description: "Specify the animation you want to use to display your element",
        type: "String",
        default: "bottom",
        physical: true
      },
      out: {
        description: "Specify the animation you want to use to hide your item",
        type: "String",
        physical: true
      },
      delay: {
        description: "Specify a delay before animation in or out your element. Can be an array of two number that define the min delay and the max delay. The real delay will be random between these two numbers",
        type: {
          type: "Array<Number>",
          splitChars: [","]
        },
        default: [500]
      },
      duration: {
        description: "Specify the duration of the animation in ms. Can be an array of two number that define the min delay and the max duration. The real duration will be random between these two numbers",
        type: {
          type: "Array<Number>",
          splitChars: [","]
        },
        default: [500]
      },
      distance: {
        description: 'Specify the distance that your element will move if you have set an "in" direction. Can be an array of two number that define the min delay and the max distance. The real duration will be random between these two numbers',
        type: {
          type: "Array<Number>",
          splitChars: [","]
        },
        default: [100, 120]
      },
      appear: {
        description: "Specify if the element has to appear. This is usually setted automatically when needed",
        type: "Boolean",
        default: false,
        physical: true
      }
    };
  }
}
const __css = "/* [s-appear] {\n    opacity: 0;\n\n    &[appear] {\n        opacity: 1;\n    }\n} */\n";
var __awaiter = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class SAppearFeature extends SFeature {
  // @ts-ignore
  constructor(name, node, settings) {
    super(name, node, __deepMerge({
      name: "s-appear",
      interface: SAppearFeatureInterface,
      style: __css
    }, settings !== null && settings !== void 0 ? settings : {}));
    if (!this.node.hasAttribute("s-appear")) {
      this.node.setAttribute("s-appear", "true");
    }
  }
  mount() {
    return __awaiter(this, void 0, void 0, function* () {
      switch (this.node.tagName.toLowerCase()) {
        case "img":
          yield __whenImageLoaded(this.node);
          this.appear();
          break;
        default:
          const $imgs = this.node.querySelectorAll("img");
          if ($imgs.length) {
            yield __whenImagesLoaded($imgs);
          }
          this.appear();
          break;
      }
    });
  }
  appear() {
    const appearId = __uniqid();
    let delay = this.props.delay[0];
    if (this.props.delay.length === 2) {
      const minDelay = this.props.delay[0], maxDelay = this.props.delay[1];
      delay = minDelay + (maxDelay - minDelay) * Math.random();
    }
    let duration = this.props.duration[0];
    if (this.props.duration.length === 2) {
      const minDuration = this.props.duration[0], maxDuration = this.props.duration[1];
      duration = minDuration + (maxDuration - minDuration) * Math.random();
    }
    let distance = this.props.distance[0];
    if (this.props.distance.length === 2) {
      const minDistance = this.props.distance[0], maxDistance = this.props.distance[1];
      distance = minDistance + (maxDistance - minDistance) * Math.random();
    }
    const sugarElement = new SSugarElement(this.node);
    setTimeout(() => {
      this.props.appear = true;
      let distanceX = 0, distanceY = 0;
      switch (this.props.in) {
        case "top":
          distanceY = distance * -1;
          break;
        case "bottom":
          distanceY = distance;
          break;
        case "left":
          distanceX = distance * -1;
          break;
        case "right":
          distanceX = distance;
          break;
      }
      const newTransforms = sugarElement.simulateTransform({
        translateX: distanceX,
        translateY: distanceY
      });
      const animationStr = `
                @keyframes s-appear-${appearId} {
                    from {
                        transform: ${newTransforms.matrix};
                        opacity: 0;
                    }
                    to {
                        transform: ${sugarElement.matrixStr};
                        opacity: 1;
                    }
                }
                [s-appear-id="${appearId}"] {
                    animation: s-appear-${appearId} ${duration / 1e3}s ${STheme.get("easing.default")} forwards;
                }
            `;
      const $style = __injectStyle(animationStr);
      this.node.setAttribute("s-appear-id", appearId);
      setTimeout(() => {
        this.node.removeAttribute("s-appear-id");
        $style.remove();
      }, duration);
    }, delay);
  }
}
function define(props = {}, name = "s-appear") {
  SAppearFeature.define(name, SAppearFeature, Object.assign({ mountWhen: "entersViewport" }, props));
}
export {
  define as default
};
