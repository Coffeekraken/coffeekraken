// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SDobby from '../node/SDobby.js';
export default (stringArgs = '') => {
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        const dobby = new __SDobby();
        dobby.events.on('ready', () => {
            return;
            dobby.addTask({
                uid: 'responseTime',
                type: 'responseTime',
                name: 'Response time',
                schedule: '*/5 * * * * *',
            });
        });
        dobby.server();
        const result = yield dobby.start(stringArgs);
        resolve(result);
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFFBQVEsTUFBTSxtQkFBbUIsQ0FBQztBQUV6QyxlQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQy9CLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtRQUNqQyxNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBRTdCLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDMUIsT0FBTztZQUNQLEtBQUssQ0FBQyxPQUFPLENBQUM7Z0JBQ1YsR0FBRyxFQUFFLGNBQWM7Z0JBQ25CLElBQUksRUFBRSxjQUFjO2dCQUNwQixJQUFJLEVBQUUsZUFBZTtnQkFDckIsUUFBUSxFQUFFLGVBQWU7YUFDNUIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFZixNQUFNLE1BQU0sR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0MsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMifQ==