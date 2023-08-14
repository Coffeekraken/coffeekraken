"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const validator_1 = __importDefault(require("validator"));
const _getTimeMS = (hrTime) => {
    return hrTime[0] * 1000 + hrTime[1] / 1000000;
};
const _getTimeDiff = (results) => {
    const { responseBodyStart, tlsHandshake } = results;
    return _getTimeMS(responseBodyStart) - _getTimeMS(tlsHandshake);
};
function ttfb(host, settings) {
    host = host.replace(/^https?\:\/\//, '');
    if (!validator_1.default.isFQDN(host)) {
        return Promise.reject(new Error('Invalid host.'));
    }
    const finalSettings = Object.assign({ timeout: 5000, method: 'GET', port: 443 }, (settings !== null && settings !== void 0 ? settings : {}));
    return new Promise((resolve, reject) => {
        const eventResults = {
            dnsLookup: 0,
            tcpConnection: 0,
            tlsHandshake: 0,
            responseBodyStart: 0,
            responseBodyEnd: 0,
        };
        const req = https_1.default.request(Object.assign({ hostname: host }, finalSettings), (res) => {
            let body = '';
            res.once('data', () => {
                eventResults.responseBodyStart = process.hrtime();
            });
            res.on('data', (d) => {
                body += d;
            });
            res.on('end', () => {
                eventResults.responseBodyEnd = process.hrtime();
                resolve({
                    ttfb: _getTimeDiff(eventResults),
                });
            });
        });
        req.on('error', (error) => {
            resolve({
                ttfb: -1,
                error,
            });
        });
        req.on('timeout', () => {
            req.destroy();
        });
        req.on('socket', (socket) => {
            socket.on('lookup', () => {
                eventResults.dnsLookup = process.hrtime();
            });
            socket.on('connect', () => {
                eventResults.tcpConnection = process.hrtime();
            });
            socket.on('secureConnect', () => {
                eventResults.tlsHandshake = process.hrtime();
            });
        });
        req.end();
    });
}
exports.default = ttfb;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQTRCO0FBQzVCLDBEQUFvQztBQUVwQyxNQUFNLFVBQVUsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFFO0lBQzFCLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDO0FBQ2xELENBQUMsQ0FBQztBQUVGLE1BQU0sWUFBWSxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUU7SUFDN0IsTUFBTSxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxHQUFHLE9BQU8sQ0FBQztJQUNwRCxPQUFPLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNwRSxDQUFDLENBQUM7QUFhRixTQUF3QixJQUFJLENBQ3hCLElBQUksRUFDSixRQUFpQztJQUVqQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFekMsSUFBSSxDQUFDLG1CQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzNCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0tBQ3JEO0lBRUQsTUFBTSxhQUFhLG1CQUNmLE9BQU8sRUFBRSxJQUFJLEVBQ2IsTUFBTSxFQUFFLEtBQUssRUFDYixJQUFJLEVBQUUsR0FBRyxJQUNOLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLE1BQU0sWUFBWSxHQUFHO1lBQ2pCLFNBQVMsRUFBRSxDQUFDO1lBQ1osYUFBYSxFQUFFLENBQUM7WUFDaEIsWUFBWSxFQUFFLENBQUM7WUFDZixpQkFBaUIsRUFBRSxDQUFDO1lBQ3BCLGVBQWUsRUFBRSxDQUFDO1NBQ3JCLENBQUM7UUFFRixNQUFNLEdBQUcsR0FBRyxlQUFPLENBQUMsT0FBTyxpQkFFbkIsUUFBUSxFQUFFLElBQUksSUFDWCxhQUFhLEdBRXBCLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDSixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7WUFFZCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7Z0JBQ2xCLFlBQVksQ0FBQyxpQkFBaUIsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDdEQsQ0FBQyxDQUFDLENBQUM7WUFFSCxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNqQixJQUFJLElBQUksQ0FBQyxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7WUFFSCxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7Z0JBQ2YsWUFBWSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2hELE9BQU8sQ0FBQztvQkFDSixJQUFJLEVBQUUsWUFBWSxDQUFDLFlBQVksQ0FBQztpQkFDbkMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQ0osQ0FBQztRQUVGLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDdEIsT0FBTyxDQUFDO2dCQUNKLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ1IsS0FBSzthQUNSLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBRUgsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ25CLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztRQUVILEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDeEIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO2dCQUNyQixZQUFZLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUM5QyxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtnQkFDdEIsWUFBWSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7Z0JBQzVCLFlBQVksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2pELENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDZCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUE3RUQsdUJBNkVDIn0=