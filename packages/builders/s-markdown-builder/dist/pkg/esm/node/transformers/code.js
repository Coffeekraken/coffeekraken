var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default {
    reg: /```([a-zA-Z0-9]+)([^```]*)```/g,
    transform(data, target) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (target) {
                case 'html':
                    return [
                        `<s-code-example>`,
                        `   <template language="${data[0]}">`,
                        data[1],
                        `   </template>`,
                        `</s-code-example>`,
                    ].join('\n');
                    break;
            }
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGVBQWU7SUFDWCxHQUFHLEVBQUUsZ0NBQWdDO0lBQy9CLFNBQVMsQ0FBQyxJQUFJLEVBQUUsTUFBTTs7WUFDeEIsUUFBUSxNQUFNLEVBQUU7Z0JBQ1osS0FBSyxNQUFNO29CQUNQLE9BQU87d0JBQ0gsa0JBQWtCO3dCQUNsQiwwQkFBMEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJO3dCQUNyQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNQLGdCQUFnQjt3QkFDaEIsbUJBQW1CO3FCQUN0QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDYixNQUFNO2FBQ2I7UUFDTCxDQUFDO0tBQUE7Q0FDSixDQUFDIn0=