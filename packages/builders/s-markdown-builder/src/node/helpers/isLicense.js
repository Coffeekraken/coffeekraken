import __SSugarConfig from '@coffeekraken/s-sugar-config';
const packageJson = __SSugarConfig.get('packageJson');
export default function isLicense(conditional, options) {
    var _a;
    let license = (_a = this.license) !== null && _a !== void 0 ? _a : packageJson.license;
    if (license.toLowerCase() === conditional.toLowerCase()) {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNMaWNlbnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXNMaWNlbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFELE1BQU0sV0FBVyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFdEQsTUFBTSxDQUFDLE9BQU8sVUFBVSxTQUFTLENBQUMsV0FBVyxFQUFFLE9BQU87O0lBQ2xELElBQUksT0FBTyxHQUFHLE1BQUEsSUFBSSxDQUFDLE9BQU8sbUNBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQztJQUVsRCxJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxXQUFXLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDckQsT0FBTyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzNCO1NBQU07UUFDSCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDaEM7QUFFTCxDQUFDIn0=