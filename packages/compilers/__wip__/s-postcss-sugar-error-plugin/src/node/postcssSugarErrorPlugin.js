import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
export default (opts = {}) => {
    return {
        postcssPlugin: 'sugar-error',
        Once(root, { result }) {
            var _a, _b;
            if (result.warnings().length > 0) {
                const warnObj = result.warnings()[0];
                console.error([
                    `<yellow>[${warnObj.plugin}]</yellow> ${warnObj.text}`,
                    `<cyan>${warnObj.node.source.input.file.replace(`${__packageRoot()}/`, '')}</cyan>:<yellow>${warnObj.line}</yellow>:<yellow>${warnObj.column}</yellow>`,
                    ' ',
                    `${warnObj.node.source.input.css
                        .split('\n')
                        .slice((_a = warnObj.line - 2) !== null && _a !== void 0 ? _a : 0, (_b = warnObj.line + 1) !== null && _b !== void 0 ? _b : 2)
                        .map((l, i) => {
                        return `<bgBlack> ${warnObj.line + i - 1} </bgBlack> <yellow>${l.replace(/^\s+/, '')}</yellow>`;
                    })
                        .join('\n')}`
                ].join('\n'));
            }
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzc1N1Z2FyRXJyb3JQbHVnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwb3N0Y3NzU3VnYXJFcnJvclBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUV0RSxlQUFlLENBQUMsSUFBSSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQzNCLE9BQU87UUFDTCxhQUFhLEVBQUUsYUFBYTtRQUM1QixJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFOztZQUNuQixJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNoQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLE9BQU8sQ0FBQyxLQUFLLENBQ1g7b0JBQ0UsWUFBWSxPQUFPLENBQUMsTUFBTSxjQUFjLE9BQU8sQ0FBQyxJQUFJLEVBQUU7b0JBQ3RELFNBQVMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQzdDLEdBQUcsYUFBYSxFQUFFLEdBQUcsRUFDckIsRUFBRSxDQUNILG1CQUFtQixPQUFPLENBQUMsSUFBSSxxQkFDOUIsT0FBTyxDQUFDLE1BQ1YsV0FBVztvQkFDWCxHQUFHO29CQUNILEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUc7eUJBQzdCLEtBQUssQ0FBQyxJQUFJLENBQUM7eUJBQ1gsS0FBSyxDQUFDLE1BQUEsT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLG1DQUFJLENBQUMsRUFBRSxNQUFBLE9BQU8sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxtQ0FBSSxDQUFDLENBQUM7eUJBQ25ELEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDWixPQUFPLGFBQ0wsT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FDckIsdUJBQXVCLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUM7b0JBQzFELENBQUMsQ0FBQzt5QkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7aUJBQ2hCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNiLENBQUM7YUFDSDtRQUNILENBQUM7S0FDRixDQUFDO0FBQ0osQ0FBQyxDQUFDIn0=