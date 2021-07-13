/**
*
* @name 		handleInputAttributes
* @namespace            js.feature
* @type      Feature
* @platform          js
* @platform          ts
* @status        beta
*
* Add some events on some DOM Elements. Here's the list:
* - enter (onenter): Triggered when user tap ```enter``` on his keyboard from a **input*** or **textarea** element
* - escape (onescape): Triggered when user tap ```escape``` on his keyboard from a **input*** or **textarea** element
*
* @param       {Object}        [settings={}]         An object of settings to configure your feature
*
* @setting       {Boolean}       [enter=true]        Specify if you want to "enter" keyboard event
* @setting       {Boolean}       [escape=true]        Specify if you want to "escape" keyboard event
*
* @todo        interface
* @todo        doc
* @todo        tests
* @todo        add setting to specify on which elements you want to enable the feature
*
* @example 	js
* import inputAdditionalEvents from '@coffeekraken/sugar/js/feature/inputAdditionalEvents';
* inputAdditionalEvents();
*
* @since         1.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/