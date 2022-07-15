import __SSugarConfig from '@coffeekraken/s-sugar-config';
export default {
    id: 'classname',
    args: {
        classes: ''
    },
    process: function classname({ classes, settings }) {
        settings = Object.assign({ classPrefix: __SSugarConfig.get('docblockRenderer.html.classPrefix') }, (settings !== null && settings !== void 0 ? settings : {}));
        if (!settings.classPrefix ||
            typeof settings.classPrefix !== 'string' ||
            settings.classPrefix === '')
            return classes;
        const processedClasses = classes
            .split(/\s+/)
            .map((cls) => {
            return `${settings.classPrefix}${cls}`;
        })
            .join(' ');
        return processedClasses;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3NuYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2xhc3NuYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFELGVBQWU7SUFDYixFQUFFLEVBQUUsV0FBVztJQUNmLElBQUksRUFBRTtRQUNKLE9BQU8sRUFBRSxFQUFFO0tBQ1o7SUFDRCxPQUFPLEVBQUUsU0FBUyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFO1FBRS9DLFFBQVEsbUJBQ04sV0FBVyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsbUNBQW1DLENBQUMsSUFDakUsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztRQUVGLElBQ0UsQ0FBQyxRQUFRLENBQUMsV0FBVztZQUNyQixPQUFPLFFBQVEsQ0FBQyxXQUFXLEtBQUssUUFBUTtZQUN4QyxRQUFRLENBQUMsV0FBVyxLQUFLLEVBQUU7WUFFM0IsT0FBTyxPQUFPLENBQUM7UUFFakIsTUFBTSxnQkFBZ0IsR0FBRyxPQUFPO2FBQzdCLEtBQUssQ0FBQyxLQUFLLENBQUM7YUFDWixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNYLE9BQU8sR0FBRyxRQUFRLENBQUMsV0FBVyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ3pDLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUViLE9BQU8sZ0JBQWdCLENBQUM7SUFDMUIsQ0FBQztDQUNGLENBQUMifQ==