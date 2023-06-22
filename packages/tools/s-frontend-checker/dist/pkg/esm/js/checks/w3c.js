var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @name            w3c
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check that our html is w3c compliant
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (__SFrontendChecker) {
    return {
        id: 'w3c',
        name: 'W3C validator',
        description: 'Check that our html is w3c compliant',
        category: __SFrontendChecker.CATEGORY_BEST_PRACTICES,
        level: 3,
        check({ $context }) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                // emulate form post
                const formData = new FormData();
                formData.append('out', 'json');
                formData.append('content', (_a = $context.innerHTML) !== null && _a !== void 0 ? _a : (_b = $context.documentElement) === null || _b === void 0 ? void 0 : _b.innerHTML);
                const response = yield fetch('https://validator.w3.org/nu/?out=json&level=error', {
                    method: 'post',
                    body: formData,
                });
                const responseJson = yield response.json();
                // @ts-ignore
                if (responseJson.messages.length) {
                    return {
                        status: 'warning',
                        message: 'The html is not w3c compliant',
                        action: {
                            label: () => `Log issues (${responseJson.messages.length})`,
                            handler: () => {
                                var _a, _b;
                                (_b = (_a = responseJson.messages) === null || _a === void 0 ? void 0 : _a.forEach) === null || _b === void 0 ? void 0 : _b.call(_a, (msg) => {
                                    console.log(mgs);
                                });
                            },
                        },
                    };
                }
                return {
                    status: 'success',
                };
            });
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsa0JBQXFDO0lBQzFELE9BQU87UUFDSCxFQUFFLEVBQUUsS0FBSztRQUNULElBQUksRUFBRSxlQUFlO1FBQ3JCLFdBQVcsRUFBRSxzQ0FBc0M7UUFDbkQsUUFBUSxFQUFFLGtCQUFrQixDQUFDLHVCQUF1QjtRQUNwRCxLQUFLLEVBQUUsQ0FBQztRQUNGLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRTs7O2dCQUNwQixvQkFBb0I7Z0JBQ3BCLE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7Z0JBQ2hDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUMvQixRQUFRLENBQUMsTUFBTSxDQUNYLFNBQVMsRUFDVCxNQUFBLFFBQVEsQ0FBQyxTQUFTLG1DQUFJLE1BQUEsUUFBUSxDQUFDLGVBQWUsMENBQUUsU0FBUyxDQUM1RCxDQUFDO2dCQUVGLE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUN4QixtREFBbUQsRUFDbkQ7b0JBQ0ksTUFBTSxFQUFFLE1BQU07b0JBQ2QsSUFBSSxFQUFFLFFBQVE7aUJBQ2pCLENBQ0osQ0FBQztnQkFDRixNQUFNLFlBQVksR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFFM0MsYUFBYTtnQkFDYixJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO29CQUM5QixPQUFPO3dCQUNILE1BQU0sRUFBRSxTQUFTO3dCQUNqQixPQUFPLEVBQUUsK0JBQStCO3dCQUN4QyxNQUFNLEVBQUU7NEJBQ0osS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUNSLGVBQWUsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUc7NEJBQ2xELE9BQU8sRUFBRSxHQUFHLEVBQUU7O2dDQUNWLE1BQUEsTUFBQSxZQUFZLENBQUMsUUFBUSwwQ0FBRSxPQUFPLG1EQUFHLENBQUMsR0FBRyxFQUFFLEVBQUU7b0NBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQ3JCLENBQUMsQ0FBQyxDQUFDOzRCQUNQLENBQUM7eUJBQ0o7cUJBQ0osQ0FBQztpQkFDTDtnQkFDRCxPQUFPO29CQUNILE1BQU0sRUFBRSxTQUFTO2lCQUNwQixDQUFDOztTQUNMO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==