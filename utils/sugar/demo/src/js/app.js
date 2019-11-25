import "@babel/polyfill";
import "../../../dist/js/features/all";

import autoScrollAnchorLinks from "../../../dist/js/dom/autoScrollAnchorLinks";

import native from "../../../dist/js/core/sNativeWebComponent";
import SWebComponent from "../../../dist/js/core/SWebComponent";
import toggleFullscreen from "../../../dist/js/dom/toggleFullscreen";
import detectInOutDirection from "../../../dist/js/dom/detectInOutDirection";
import addAnimationClass from "../../../dist/js/dom/addAnimationClass";
import imagesLoaded from "../../../dist/js/dom/imagesLoaded";
import appendStylesheetLink from "../../../dist/js/dom/appendStylesheetLink";
import linkLoaded from "../../../dist/js/dom/linkLoaded";
import querySelectorAllWithStyle from "../../../dist/js/dom/querySelectorAllWithStyle";
import backgroundImageLoaded from "../../../dist/js/dom/backgroundImageLoaded";
import unquote from "../../../dist/js/utils/strings/unquote";

import wrap from "../../../src/js/dom/wrap";
import wrapInner from "../../../src/js/dom/wrapInner";

import STimer from "../../../dist/js/classes/STimer";

import appendScriptTag from "../../../dist/js/dom/appendScriptTag";
import scriptLoaded from "../../../dist/js/dom/scriptLoaded";

import ltrim from "../../../dist/js/utils/strings/ltrim";
import rtrim from "../../../dist/js/utils/strings/rtrim";
import queryStringToObject from "../../../dist/js/utils/strings/queryStringToObject";

import keysFirst from "../../../dist/js/utils/arrays/keysFirst";
import keysLast from "../../../dist/js/utils/arrays/keysLast";

import isSamsumgBrowser from "../../../dist/js/utils/is/samsungBrowser";

import sprintf from "../../../dist/js/utils/strings/sprintf";

import isOdd from "../../../dist/js/utils/is/odd";

import toString from "../../../dist/js/utils/strings/toString";

autoScrollAnchorLinks();

function coco() {
  console.log("coco");
}
const cocoObj = {
  id: "Hello World",
  coco: "PLop"
};
const proxyObj = new Proxy(cocoObj, {});

console.log("toString proxy", toString(proxyObj));
console.log("toString function", toString(coco));
console.log("toString object", toString(cocoObj));
console.log("toString boolean", toString(true));

console.log("isOdd 1", isOdd(1));
console.log("isOdd 2", isOdd(2));

console.log("isSamsungBrowser", isSamsumgBrowser());

console.log(sprintf("Hello %s", "World"));
console.log(sprintf("Hello %(name)s", { name: "Dolly" }));

// console.log('qs', queryStringToObject('?plop=hello&world=universe'))

console.log(keysFirst(["a", "b", "d", "g", "c"], ["d", "g", "z", "y"]));

// const $link = appendStylesheetLink('http://coffeekraken.io/dist/css/style.css');
// linkLoaded($link).then(() => {
// 	console.log('link loaded')
// })

// const $script = appendScriptTag('http://coffeekraken.io/dist/js/app.js');
// scriptLoaded($script).then(() => {
// 	console.log('script loaded')
// })

// imagesLoaded(document.querySelectorAll('img')).then(() => {
// 	console.log('loaded')
// })

// console.log('unquote "', unquote('"Hello World"'))
// console.log('unquote \'', unquote("'Hello World'"))
// console.log('unquote ”', unquote('”Hello World”'))

class MyAnchorComponent extends native(HTMLAnchorElement) {
  static get defaultState() {
    return {
      coco: "hello"
    };
  }

  componentMount() {
    super.componentMount();
    this.innerHTML = "PLOP LINK";
  }
}
MyAnchorComponent.define("my-anchor", MyAnchorComponent, "a");

// const $wrapInner = document.querySelector(".wrapInner");
// wrapInner($wrapInner, document.createElement("article"));

// const $wrap = document.querySelector(".wrap");
// wrap($wrap, document.createElement("article"));

// const timer = new STimer(1000, {
// 	loop: true
// });
// let i = 0;
// timer.onTick(() => {
// 	console.log("tick", i);
// 	if (i >= 5) {
// 		timer.pause();
// 	}
// 	i++;
// });
// timer.start();

class MyComponentClass extends SWebComponent {
  static get defaultProps() {
    return {
      hello: "world"
    };
  }
  static get requiredProps() {
    return ["hello"];
  }
  static get physicalProps() {
    return ["hello"];
  }
  static defaultCss(componentName, componentNameDash) {
    return `${componentNameDash} { content: 'hello world'; }`;
  }
}
const MyComponent = MyComponentClass.define("my-component");

setTimeout(() => {
  document.body.appendChild(
    new MyComponent({
      hello: "universe"
    })
  );
  const elm = document.createElement("my-component");
  setTimeout(() => {
    document.body.appendChild(elm);
  }, 1000);
}, 1000);

// const detectInOutDirectionElm = document.querySelector("#detectInOutDirection");
// detectInOutDirection(
// 	detectInOutDirectionElm,
// 	(direction, elm) => {
// 		addAnimationClass(elm, `in-${direction}`);
// 	},
// 	(direction, elm) => {
// 		addAnimationClass(elm, `in-${direction}`);
// 	}
// );

// const fullscreenElm = document.querySelector("#fullscreen");
// fullscreenElm.addEventListener("click", e => {
// 	toggleFullscreen(fullscreenElm);
// });

// const $elms = querySelectorAllWithStyle("*", {
// 	backgroundImage: /^url/
// });
// $elms.forEach($elm => {
// 	backgroundImageLoaded($elm).then(() => {
// 		console.log("loaded!!!");
// 	});
// });
// console.log("querySelectorAllWithStyle", $elms);
