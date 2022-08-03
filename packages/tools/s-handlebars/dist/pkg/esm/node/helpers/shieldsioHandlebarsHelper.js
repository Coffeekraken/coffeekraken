import __SSugarConfig from '@coffeekraken/s-sugar-config';
export default function ShieldsioHandlebarsHelper(settings) {
    const shieldsConfig = __SSugarConfig.get('shieldsio');
    return function (context, options) {
        const shields = [];
        shieldsConfig.shields.forEach((shield) => {
            shields.push(`![${shield}](https://shields.io/${shieldsConfig.urls[shield]})`);
        });
        return shields.join(' ');
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBYTFELE1BQU0sQ0FBQyxPQUFPLFVBQVUseUJBQXlCLENBQzdDLFFBQXNFO0lBRXRFLE1BQU0sYUFBYSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFdEQsT0FBTyxVQUFVLE9BQU8sRUFBRSxPQUFPO1FBQzdCLE1BQU0sT0FBTyxHQUFhLEVBQUUsQ0FBQztRQUU3QixhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLE9BQU8sQ0FBQyxJQUFJLENBQ1IsS0FBSyxNQUFNLHdCQUF3QixhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQ25FLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUM7QUFDTixDQUFDIn0=