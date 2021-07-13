/**
*
* @name 		imagesLazySrcAttribute
* @namespace            js.feature
* @type      Feature
* @platform          js
* @platform          ts
* @status      beta
*
* Add support for the `lazy-src` attribute on `img` elements.
* The video `src` attribute will be populated when the `img` element enter the viewport
*
* @param       {Object}        [settings={}]         An object of settings to configure your feature
*
* @setting       {Number}      [offset=50]         The offset before entering in the viewport to set the "src" attribute
*
* @todo            interface
* @todo            doc
* @todo            tests
*
* @example       js
* import imagesLazySrcAttribute from '@coffeekraken/sugar/js/feature/imagesLazySrcAttribute';
* imagesLazySrcAttribute();
*
* @example    html
* <img lazy-src="my-cool-image.jpg" />
*
* @since     2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/