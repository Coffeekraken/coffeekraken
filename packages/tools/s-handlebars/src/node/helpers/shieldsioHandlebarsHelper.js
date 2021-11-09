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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpZWxkc2lvSGFuZGxlYmFyc0hlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNoaWVsZHNpb0hhbmRsZWJhcnNIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFjMUQsTUFBTSxDQUFDLE9BQU8sVUFBVSx5QkFBeUIsQ0FDN0MsUUFBc0U7SUFFdEUsTUFBTSxhQUFhLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUV0RCxPQUFPLFVBQVUsT0FBTyxFQUFFLE9BQU87UUFDN0IsTUFBTSxPQUFPLEdBQWEsRUFBRSxDQUFDO1FBRTdCLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDckMsT0FBTyxDQUFDLElBQUksQ0FDUixLQUFLLE1BQU0sd0JBQXdCLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FDbkUsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQztBQUNOLENBQUMifQ==