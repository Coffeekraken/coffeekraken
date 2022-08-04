"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const replaceTags_1 = __importDefault(require("../replaceTags"));
describe('sugar.shared.html.replaceTags', () => {
    const html = `
  <div>
    <bold>Hello world</bold>
    <h1>
      How are you?
    </h1>
  </div>
`;
    const res = (0, replaceTags_1.default)(html, {
        bold: (tag, content) => `<yop>${content}</yop>`,
        h1: (tag, content) => content,
    });
    it('Should have replace the tags correctly', () => {
        expect(res.replace(/\s/g, '')).toBe(`
<div>
<yop>Hello world</yop>

  How are you?

</div>
`.replace(/\s/g, ''));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaUVBQTJDO0FBRTNDLFFBQVEsQ0FBQywrQkFBK0IsRUFBRSxHQUFHLEVBQUU7SUFDM0MsTUFBTSxJQUFJLEdBQUc7Ozs7Ozs7Q0FPaEIsQ0FBQztJQUVFLE1BQU0sR0FBRyxHQUFHLElBQUEscUJBQWEsRUFBQyxJQUFJLEVBQUU7UUFDNUIsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsUUFBUSxPQUFPLFFBQVE7UUFDL0MsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTztLQUNoQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsd0NBQXdDLEVBQUUsR0FBRyxFQUFFO1FBQzlDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDL0I7Ozs7Ozs7Q0FPWCxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQ1gsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==