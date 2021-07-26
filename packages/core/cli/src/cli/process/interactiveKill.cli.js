var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as Enquirer from 'enquirer';
export default function interactiveKill({ log, exec }) {
    return __awaiter(this, void 0, void 0, function* () {
        let prompt = new Enquirer.default.Select({
            message: 'How would you like to kill your process?',
            choices: ['by id', 'by port']
        });
        let res = yield prompt.run();
        let command;
        switch (res) {
            case 'by id':
                prompt = new Enquirer.default.Input({
                    message: 'Specify the process id you want to kill',
                    validate(...args) {
                        if (!args[0].match(/^[0-9]+$/))
                            return `Process id must be an integer`;
                        return true;
                    }
                });
                res = yield prompt.run();
                command = `sugar process.kill --id ${res}`;
                log(`> Running command: <yellow>${command}</yellow>`);
                exec(command);
                break;
            case 'by port':
                prompt = new Enquirer.default.Input({
                    message: 'Specify the port on which the process you want to kill is running',
                    validate(...args) {
                        if (!args[0].match(/^[0-9]+$/))
                            return `Process id must be an integer`;
                        return true;
                    }
                });
                res = yield prompt.run();
                command = `sugar process.kill --port ${res}`;
                log(`> Running command: <yellow>${command}</yellow>`);
                exec(command);
                break;
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJhY3RpdmVLaWxsLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImludGVyYWN0aXZlS2lsbC5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxLQUFLLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFFckMsTUFBTSxDQUFDLE9BQU8sVUFBZ0IsZUFBZSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTs7UUFHdkQsSUFBSSxNQUFNLEdBQUcsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUN2QyxPQUFPLEVBQUUsMENBQTBDO1lBQ25ELE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBQyxTQUFTLENBQUM7U0FDN0IsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxHQUFHLEdBQUcsTUFBTSxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFN0IsSUFBSSxPQUFPLENBQUM7UUFFWixRQUFPLEdBQUcsRUFBRTtZQUNSLEtBQUssT0FBTztnQkFDUixNQUFNLEdBQUcsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztvQkFDaEMsT0FBTyxFQUFFLHlDQUF5QztvQkFDbEQsUUFBUSxDQUFDLEdBQUcsSUFBSTt3QkFDWixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7NEJBQUUsT0FBTywrQkFBK0IsQ0FBQzt3QkFDdkUsT0FBTyxJQUFJLENBQUM7b0JBQ2hCLENBQUM7aUJBQ0osQ0FBQyxDQUFDO2dCQUNILEdBQUcsR0FBRyxNQUFNLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDekIsT0FBTyxHQUFHLDJCQUEyQixHQUFHLEVBQUUsQ0FBQztnQkFDM0MsR0FBRyxDQUFDLDhCQUE4QixPQUFPLFdBQVcsQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2xCLE1BQU07WUFDTixLQUFLLFNBQVM7Z0JBQ1YsTUFBTSxHQUFHLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7b0JBQ2hDLE9BQU8sRUFBRSxtRUFBbUU7b0JBQzVFLFFBQVEsQ0FBQyxHQUFHLElBQUk7d0JBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDOzRCQUFFLE9BQU8sK0JBQStCLENBQUM7d0JBQ3ZFLE9BQU8sSUFBSSxDQUFDO29CQUNoQixDQUFDO2lCQUNKLENBQUMsQ0FBQztnQkFDSCxHQUFHLEdBQUcsTUFBTSxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ3pCLE9BQU8sR0FBRyw2QkFBNkIsR0FBRyxFQUFFLENBQUM7Z0JBQzdDLEdBQUcsQ0FBQyw4QkFBOEIsT0FBTyxXQUFXLENBQUMsQ0FBQztnQkFDdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNsQixNQUFNO1NBQ1Q7SUFDTCxDQUFDO0NBQUEifQ==