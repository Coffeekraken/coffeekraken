"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = {
    id: 'w3c',
    name: 'W3C validator',
    description: 'Check that our html is w3c compliant',
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
                        handler: () => console.log(responseJson.messages),
                    },
                };
            }
            return {
                status: 'success',
            };
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBSUE7Ozs7Ozs7Ozs7OztHQVlHO0FBRUgsa0JBQWU7SUFDWCxFQUFFLEVBQUUsS0FBSztJQUNULElBQUksRUFBRSxlQUFlO0lBQ3JCLFdBQVcsRUFBRSxzQ0FBc0M7SUFDbkQsS0FBSyxFQUFFLENBQUM7SUFDRixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUU7OztZQUNwQixvQkFBb0I7WUFDcEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNoQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMvQixRQUFRLENBQUMsTUFBTSxDQUNYLFNBQVMsRUFDVCxNQUFBLFFBQVEsQ0FBQyxTQUFTLG1DQUFJLE1BQUEsUUFBUSxDQUFDLGVBQWUsMENBQUUsU0FBUyxDQUM1RCxDQUFDO1lBRUYsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQ3hCLG1EQUFtRCxFQUNuRDtnQkFDSSxNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsUUFBUTthQUNqQixDQUNKLENBQUM7WUFDRixNQUFNLFlBQVksR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUUzQyxhQUFhO1lBQ2IsSUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtnQkFDOUIsT0FBTztvQkFDSCxNQUFNLEVBQUUsU0FBUztvQkFDakIsT0FBTyxFQUFFLCtCQUErQjtvQkFDeEMsTUFBTSxFQUFFO3dCQUNKLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxlQUFlLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHO3dCQUMzRCxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO3FCQUNwRDtpQkFDSixDQUFDO2FBQ0w7WUFDRCxPQUFPO2dCQUNILE1BQU0sRUFBRSxTQUFTO2FBQ3BCLENBQUM7O0tBQ0w7Q0FDSixDQUFDIn0=