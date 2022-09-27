// import { SComponentDefaultPropsInterface } from '@coffeekraken/s-component';
let isDefaultPropsDefined = false;
export default (pluginOptions) => (options) => {
    switch (pluginOptions.target) {
        case 'webcomponent':
            return {
                json: {
                    pre: (json) => {
                        if (json.exports.DEFAULT_PROPS) {
                            isDefaultPropsDefined = true;
                        }
                    },
                },
                code: {
                    pre: (code) => {
                        var _a;
                        // add the SComponent object
                        if (!code.match(/import __SComponent from/)) {
                            code = `
                                import __SComponent from '@coffeekraken/s-component';
                                ${code}
                            `;
                        }
                        if (!isDefaultPropsDefined) {
                            return code;
                        }
                        // // default props interface
                        // const defaultProps =
                        //     SComponentDefaultPropsInterface.defaults();
                        let typeMatch = (_a = code
                            .match(/type Props = \{[\s\S]*?\};/g)) === null || _a === void 0 ? void 0 : _a[0].split('\n').map((l) => l.trim().split(':')[0]);
                        typeMatch.pop();
                        typeMatch.shift();
                        // add default props
                        typeMatch = [
                            ...typeMatch,
                            // ...Object.keys(defaultProps),
                        ];
                        const onMountStr = 'this._root.innerHTML = `';
                        code = code.replace(onMountStr, `
                            // default props
                            const defaultProps = __SComponent.getDefaultProps(this.tagName.toLowerCase());
                            ${typeMatch
                            .map((prop) => {
                            return `this.props.${prop} = this.props.${prop} ?? defaultProps.${prop} ?? DEFAULT_PROPS.${prop};`;
                        })
                            .join('\n')}

                                ${onMountStr}
                        `);
                        return code;
                    },
                },
            };
            break;
        default: {
            return {};
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtFQUErRTtBQUUvRSxJQUFJLHFCQUFxQixHQUFHLEtBQUssQ0FBQztBQUNsQyxlQUFlLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO0lBQzFDLFFBQVEsYUFBYSxDQUFDLE1BQU0sRUFBRTtRQUMxQixLQUFLLGNBQWM7WUFDZixPQUFPO2dCQUNILElBQUksRUFBRTtvQkFDRixHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTt3QkFDVixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFOzRCQUM1QixxQkFBcUIsR0FBRyxJQUFJLENBQUM7eUJBQ2hDO29CQUNMLENBQUM7aUJBQ0o7Z0JBQ0QsSUFBSSxFQUFFO29CQUNGLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFOzt3QkFDViw0QkFBNEI7d0JBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLDBCQUEwQixDQUFDLEVBQUU7NEJBQ3pDLElBQUksR0FBRzs7a0NBRUQsSUFBSTs2QkFDVCxDQUFDO3lCQUNMO3dCQUVELElBQUksQ0FBQyxxQkFBcUIsRUFBRTs0QkFDeEIsT0FBTyxJQUFJLENBQUM7eUJBQ2Y7d0JBRUQsNkJBQTZCO3dCQUM3Qix1QkFBdUI7d0JBQ3ZCLGtEQUFrRDt3QkFFbEQsSUFBSSxTQUFTLEdBQUcsTUFBQSxJQUFJOzZCQUNmLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQywwQ0FBRyxDQUFDLEVBQ3hDLEtBQUssQ0FBQyxJQUFJLEVBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3hDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQzt3QkFDaEIsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUVsQixvQkFBb0I7d0JBQ3BCLFNBQVMsR0FBRzs0QkFDUixHQUFHLFNBQVM7NEJBQ1osZ0NBQWdDO3lCQUNuQyxDQUFDO3dCQUVGLE1BQU0sVUFBVSxHQUFHLDBCQUEwQixDQUFDO3dCQUM5QyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FDZixVQUFVLEVBQ1Y7Ozs4QkFHRSxTQUFTOzZCQUNOLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFOzRCQUNWLE9BQU8sY0FBYyxJQUFJLGlCQUFpQixJQUFJLG9CQUFvQixJQUFJLHFCQUFxQixJQUFJLEdBQUcsQ0FBQzt3QkFDdkcsQ0FBQyxDQUFDOzZCQUNELElBQUksQ0FBQyxJQUFJLENBQUM7O2tDQUVULFVBQVU7eUJBQ25CLENBQ0EsQ0FBQzt3QkFFRixPQUFPLElBQUksQ0FBQztvQkFDaEIsQ0FBQztpQkFDSjthQUNKLENBQUM7WUFDRixNQUFNO1FBQ1YsT0FBTyxDQUFDLENBQUM7WUFDTCxPQUFPLEVBQUUsQ0FBQztTQUNiO0tBQ0o7QUFDTCxDQUFDLENBQUMifQ==