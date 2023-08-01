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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQTRCO0FBQzVCLDBEQUFvQztBQUVwQyxNQUFNLFVBQVUsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFFO0lBQzFCLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDO0FBQ2xELENBQUMsQ0FBQztBQUVGLE1BQU0sWUFBWSxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUU7SUFDN0IsTUFBTSxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxHQUFHLE9BQU8sQ0FBQztJQUNwRCxPQUFPLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNwRSxDQUFDLENBQUM7QUFhRixTQUF3QixJQUFJLENBQ3hCLElBQUksRUFDSixRQUFpQztJQUVqQyxJQUFJLENBQUMsbUJBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDM0IsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7S0FDckQ7SUFFRCxNQUFNLGFBQWEsbUJBQ2YsT0FBTyxFQUFFLElBQUksRUFDYixNQUFNLEVBQUUsS0FBSyxFQUNiLElBQUksRUFBRSxHQUFHLElBQ04sQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsTUFBTSxZQUFZLEdBQUc7WUFDakIsU0FBUyxFQUFFLENBQUM7WUFDWixhQUFhLEVBQUUsQ0FBQztZQUNoQixZQUFZLEVBQUUsQ0FBQztZQUNmLGlCQUFpQixFQUFFLENBQUM7WUFDcEIsZUFBZSxFQUFFLENBQUM7U0FDckIsQ0FBQztRQUVGLE1BQU0sR0FBRyxHQUFHLGVBQU8sQ0FBQyxPQUFPLGlCQUVuQixRQUFRLEVBQUUsSUFBSSxJQUNYLGFBQWEsR0FFcEIsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNKLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUVkLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtnQkFDbEIsWUFBWSxDQUFDLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN0RCxDQUFDLENBQUMsQ0FBQztZQUVILEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pCLElBQUksSUFBSSxDQUFDLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FBQztZQUVILEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRTtnQkFDZixZQUFZLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDaEQsT0FBTyxDQUFDO29CQUNKLElBQUksRUFBRSxZQUFZLENBQUMsWUFBWSxDQUFDO2lCQUNuQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FDSixDQUFDO1FBRUYsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN0QixPQUFPLENBQUM7Z0JBQ0osSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDUixLQUFLO2FBQ1IsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDbkIsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUFDO1FBRUgsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUN4QixNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7Z0JBQ3JCLFlBQVksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzlDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO2dCQUN0QixZQUFZLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNsRCxDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtnQkFDNUIsWUFBWSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDakQsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNkLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQTNFRCx1QkEyRUMifQ==