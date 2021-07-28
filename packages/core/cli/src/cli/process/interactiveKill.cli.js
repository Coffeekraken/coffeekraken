var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SPromise from '@coffeekraken/s-promise';
import __spawn from '@coffeekraken/sugar/node/process/spawn';
export default function interactiveKill(params) {
    return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        let res;
        res = yield emit('ask', {
            type: 'select',
            message: 'How would you like to kill your process?',
            choices: ['by id', 'by port']
        });
        let command;
        switch (res) {
            case 'by id':
                res = yield emit('ask', {
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
                pipe(__spawn(command));
                break;
            case 'by port':
                res = yield emit('ask', {
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
                pipe(__spawn(command));
                break;
        }
    }), {
        metas: {
            id: 'process.kill'
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJhY3RpdmVLaWxsLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImludGVyYWN0aXZlS2lsbC5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxPQUFPLE1BQU0sd0NBQXdDLENBQUM7QUFFN0QsTUFBTSxDQUFDLE9BQU8sVUFBVSxlQUFlLENBQUMsTUFBTTtJQUUxQyxPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsRUFBRSxFQUFFO1FBRTFELElBQUksR0FBRyxDQUFDO1FBRVIsR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNwQixJQUFJLEVBQUUsUUFBUTtZQUNkLE9BQU8sRUFBRSwwQ0FBMEM7WUFDbkQsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFDLFNBQVMsQ0FBQztTQUMvQixDQUFDLENBQUM7UUFFSCxJQUFJLE9BQU8sQ0FBQztRQUVaLFFBQU8sR0FBRyxFQUFFO1lBQ1IsS0FBSyxPQUFPO2dCQUNSLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ3BCLElBQUksRUFBRSxPQUFPO29CQUNiLFFBQVEsQ0FBQyxHQUFHLElBQUk7d0JBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDOzRCQUFFLE9BQU8sK0JBQStCLENBQUM7d0JBQ3ZFLE9BQU8sSUFBSSxDQUFDO29CQUNoQixDQUFDO2lCQUNKLENBQUMsQ0FBQztnQkFFSCxPQUFPLEdBQUcsMkJBQTJCLEdBQUcsRUFBRSxDQUFDO2dCQUMzQyxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLEtBQUssRUFBRSw4QkFBOEIsT0FBTyxXQUFXO2lCQUMxRCxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixNQUFNO1lBQ04sS0FBSyxTQUFTO2dCQUNWLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ3BCLElBQUksRUFBRSxPQUFPO29CQUNiLE9BQU8sRUFBRSxtRUFBbUU7b0JBQzVFLFFBQVEsQ0FBQyxHQUFHLElBQUk7d0JBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDOzRCQUFFLE9BQU8sK0JBQStCLENBQUM7d0JBQ3ZFLE9BQU8sSUFBSSxDQUFDO29CQUNoQixDQUFDO2lCQUNKLENBQUMsQ0FBQztnQkFDSCxPQUFPLEdBQUcsNkJBQTZCLEdBQUcsRUFBRSxDQUFDO2dCQUM3QyxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLEtBQUssRUFBRSw4QkFBOEIsT0FBTyxXQUFXO2lCQUMxRCxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixNQUFNO1NBQ1Q7SUFFTCxDQUFDLENBQUEsRUFBRTtRQUNDLEtBQUssRUFBRTtZQUNILEVBQUUsRUFBRSxjQUFjO1NBQ3JCO0tBQ0osQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9