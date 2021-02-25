// @ts-nocheck
/**
 * @name 		        settings
 * @namespace           js.core
 * @type 		{Object}
 *
 * Store all the sugar settings grabed from your scss settings
 *
 * @example    js
 * import settings from '@coffeekraken/sugar/js/core/settings';
 * console.log(settings.unit); // => 'rem'
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// imports
import domReady from '../dom/domready';
// prepare a settings object to store
// the getted settings from the css
const settings = {};
// wait the css to be loaded
domReady(() => {
    const settingsElm = document.createElement('div');
    settingsElm.classList.add('s-settings');
    document.body.appendChild(settingsElm);
    let _settings = window
        .getComputedStyle(settingsElm, ':after')
        .getPropertyValue('content')
        .trim();
    if (_settings && _settings !== '' && _settings !== 'none') {
        _settings = _settings.replace(/\\"/g, '"');
        // handle numbers that does not have initial 0.65
        _settings = _settings.replace(/([:|\s])(\.\d+)([\s|,|}]?)/g, '$10$2$3');
        _settings = _settings.slice(1, _settings.length - 1);
        _settings = JSON.parse(_settings);
        Object.assign(settings, _settings);
    }
});
// export the settings
module.exports = settings;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7OztHQVlHO0FBRUgsVUFBVTtBQUNWLE9BQU8sUUFBUSxNQUFNLGlCQUFpQixDQUFDO0FBRXZDLHFDQUFxQztBQUNyQyxtQ0FBbUM7QUFDbkMsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBRXBCLDRCQUE0QjtBQUM1QixRQUFRLENBQUMsR0FBRyxFQUFFO0lBQ1osTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsRCxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN4QyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN2QyxJQUFJLFNBQVMsR0FBRyxNQUFNO1NBQ25CLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUM7U0FDdkMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO1NBQzNCLElBQUksRUFBRSxDQUFDO0lBQ1YsSUFBSSxTQUFTLElBQUksU0FBUyxLQUFLLEVBQUUsSUFBSSxTQUFTLEtBQUssTUFBTSxFQUFFO1FBQ3pELFNBQVMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMzQyxpREFBaUQ7UUFDakQsU0FBUyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsNkJBQTZCLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDeEUsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDckQsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUVILHNCQUFzQjtBQUN0QixNQUFNLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyJ9