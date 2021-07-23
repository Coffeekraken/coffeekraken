import __SSugarConfig from '@coffeekraken/s-sugar-config';
export default function ShieldsioHandlebarsHelper(settings) {
    const shieldsConfig = __SSugarConfig.get('shieldsio');
    return function (context, options) {
        const shields = [];
        shieldsConfig.shields.forEach(shield => {
            shields.push(`![${shield}](https://shields.io/${shieldsConfig.urls[shield]})`);
        });
        return shields.join(' ');
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpZWxkc2lvSGFuZGxlYmFyc0hlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNoaWVsZHNpb0hhbmRsZWJhcnNIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUF1QjFELE1BQU0sQ0FBQyxPQUFPLFVBQVUseUJBQXlCLENBQUMsUUFBc0U7SUFFcEgsTUFBTSxhQUFhLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUV0RCxPQUFPLFVBQVUsT0FBTyxFQUFFLE9BQU87UUFFN0IsTUFBTSxPQUFPLEdBQWEsRUFBRSxDQUFDO1FBRTVCLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3BDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxNQUFNLHdCQUF3QixhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuRixDQUFDLENBQUMsQ0FBQztRQUdILE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUU3QixDQUFDLENBQUE7QUFFTCxDQUFDIn0=