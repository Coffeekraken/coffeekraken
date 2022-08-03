import __SPromise from '@coffeekraken/s-promise';
export default function () {
    return new __SPromise(({ resolve, reject, emit, pipe }) => {
        emit('log', {
            value: 'hello from child process',
        });
        setTimeout(() => {
            resolve();
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBRWpELE1BQU0sQ0FBQyxPQUFPO0lBQ1YsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUN0RCxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsS0FBSyxFQUFFLDBCQUEwQjtTQUNwQyxDQUFDLENBQUM7UUFFSCxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9