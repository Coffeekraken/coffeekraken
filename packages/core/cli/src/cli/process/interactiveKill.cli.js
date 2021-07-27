var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default function interactiveKill({ emit, ask, exec }) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        res = yield ask({
            type: 'select',
            message: 'How would you like to kill your process?',
            choices: ['by id', 'by port']
        });
        let command;
        switch (res) {
            case 'by id':
                res = yield ask({
                    type: 'input',
                    validate(...args) {
                        if (!args[0].match(/^[0-9]+$/))
                            return `Process id must be an integer`;
                        return true;
                    }
                });
                command = `sugar process.kill --id ${res}`;
                emit('log', {
                    value: `> Running command: <yellow>${command}</yellow>`
                });
                exec(command);
                break;
            case 'by port':
                res = yield ask({
                    type: 'input',
                    message: 'Specify the port on which the process you want to kill is running',
                    validate(...args) {
                        if (!args[0].match(/^[0-9]+$/))
                            return `Process id must be an integer`;
                        return true;
                    }
                });
                command = `sugar process.kill --port ${res}`;
                emit('log', {
                    value: `> Running command: <yellow>${command}</yellow>`
                });
                exec(command);
                break;
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJhY3RpdmVLaWxsLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImludGVyYWN0aXZlS2lsbC5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsTUFBTSxDQUFDLE9BQU8sVUFBZ0IsZUFBZSxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7O1FBRTdELElBQUksR0FBRyxDQUFDO1FBRVIsR0FBRyxHQUFHLE1BQU0sR0FBRyxDQUFDO1lBQ1osSUFBSSxFQUFFLFFBQVE7WUFDZCxPQUFPLEVBQUUsMENBQTBDO1lBQ25ELE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBQyxTQUFTLENBQUM7U0FDL0IsQ0FBQyxDQUFDO1FBRUgsSUFBSSxPQUFPLENBQUM7UUFFWixRQUFPLEdBQUcsRUFBRTtZQUNSLEtBQUssT0FBTztnQkFDUixHQUFHLEdBQUcsTUFBTSxHQUFHLENBQUM7b0JBQ1osSUFBSSxFQUFFLE9BQU87b0JBQ1osUUFBUSxDQUFDLEdBQUcsSUFBSTt3QkFDYixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7NEJBQUUsT0FBTywrQkFBK0IsQ0FBQzt3QkFDdkUsT0FBTyxJQUFJLENBQUM7b0JBQ2hCLENBQUM7aUJBQ0osQ0FBQyxDQUFDO2dCQUVILE9BQU8sR0FBRywyQkFBMkIsR0FBRyxFQUFFLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLDhCQUE4QixPQUFPLFdBQVc7aUJBQzFELENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2xCLE1BQU07WUFDTixLQUFLLFNBQVM7Z0JBQ1YsR0FBRyxHQUFHLE1BQU0sR0FBRyxDQUFDO29CQUNaLElBQUksRUFBRSxPQUFPO29CQUNiLE9BQU8sRUFBRSxtRUFBbUU7b0JBQzVFLFFBQVEsQ0FBQyxHQUFHLElBQUk7d0JBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDOzRCQUFFLE9BQU8sK0JBQStCLENBQUM7d0JBQ3ZFLE9BQU8sSUFBSSxDQUFDO29CQUNoQixDQUFDO2lCQUNKLENBQUMsQ0FBQztnQkFDSCxPQUFPLEdBQUcsNkJBQTZCLEdBQUcsRUFBRSxDQUFDO2dCQUM3QyxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLEtBQUssRUFBRSw4QkFBOEIsT0FBTyxXQUFXO2lCQUMxRCxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNsQixNQUFNO1NBQ1Q7SUFDTCxDQUFDO0NBQUEifQ==