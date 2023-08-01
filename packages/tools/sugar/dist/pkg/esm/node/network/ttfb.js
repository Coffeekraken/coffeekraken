import __https from 'https';
import __validator from 'validator';
const _getTimeMS = (hrTime) => {
    return hrTime[0] * 1000 + hrTime[1] / 1000000;
};
const _getTimeDiff = (results) => {
    const { responseBodyStart, tlsHandshake } = results;
    return _getTimeMS(responseBodyStart) - _getTimeMS(tlsHandshake);
};
export default function ttfb(host, settings) {
    if (!__validator.isFQDN(host)) {
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
        const req = __https.request(Object.assign({ hostname: host }, finalSettings), (res) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUM1QixPQUFPLFdBQVcsTUFBTSxXQUFXLENBQUM7QUFFcEMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRTtJQUMxQixPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztBQUNsRCxDQUFDLENBQUM7QUFFRixNQUFNLFlBQVksR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFFO0lBQzdCLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsR0FBRyxPQUFPLENBQUM7SUFDcEQsT0FBTyxVQUFVLENBQUMsaUJBQWlCLENBQUMsR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDcEUsQ0FBQyxDQUFDO0FBYUYsTUFBTSxDQUFDLE9BQU8sVUFBVSxJQUFJLENBQ3hCLElBQUksRUFDSixRQUFpQztJQUVqQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUMzQixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztLQUNyRDtJQUVELE1BQU0sYUFBYSxtQkFDZixPQUFPLEVBQUUsSUFBSSxFQUNiLE1BQU0sRUFBRSxLQUFLLEVBQ2IsSUFBSSxFQUFFLEdBQUcsSUFDTixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBRUYsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNuQyxNQUFNLFlBQVksR0FBRztZQUNqQixTQUFTLEVBQUUsQ0FBQztZQUNaLGFBQWEsRUFBRSxDQUFDO1lBQ2hCLFlBQVksRUFBRSxDQUFDO1lBQ2YsaUJBQWlCLEVBQUUsQ0FBQztZQUNwQixlQUFlLEVBQUUsQ0FBQztTQUNyQixDQUFDO1FBRUYsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8saUJBRW5CLFFBQVEsRUFBRSxJQUFJLElBQ1gsYUFBYSxHQUVwQixDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ0osSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBRWQsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO2dCQUNsQixZQUFZLENBQUMsaUJBQWlCLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3RELENBQUMsQ0FBQyxDQUFDO1lBRUgsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDakIsSUFBSSxJQUFJLENBQUMsQ0FBQztZQUNkLENBQUMsQ0FBQyxDQUFDO1lBRUgsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO2dCQUNmLFlBQVksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNoRCxPQUFPLENBQUM7b0JBQ0osSUFBSSxFQUFFLFlBQVksQ0FBQyxZQUFZLENBQUM7aUJBQ25DLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUNKLENBQUM7UUFFRixHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3RCLE9BQU8sQ0FBQztnQkFDSixJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUNSLEtBQUs7YUFDUixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNuQixHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxHQUFHLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ3hCLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtnQkFDckIsWUFBWSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDOUMsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7Z0JBQ3RCLFlBQVksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2xELENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO2dCQUM1QixZQUFZLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNqRCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBRUgsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2QsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDIn0=