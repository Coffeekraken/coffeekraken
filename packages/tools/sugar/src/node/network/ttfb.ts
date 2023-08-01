import __https from 'https';
import __validator from 'validator';

const _getTimeMS = (hrTime) => {
    return hrTime[0] * 1000 + hrTime[1] / 1000000;
};

const _getTimeDiff = (results) => {
    const { responseBodyStart, tlsHandshake } = results;
    return _getTimeMS(responseBodyStart) - _getTimeMS(tlsHandshake);
};

export interface ITtfbSettings {
    timeout: number;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    port: number;
}

export interface ITtfbResult {
    ttfb: number;
    error?: Error;
}

export default function ttfb(
    host,
    settings?: Partial<ITtfbSettings>,
): Promise<ITtfbResult> {
    if (!__validator.isFQDN(host)) {
        return Promise.reject(new Error('Invalid host.'));
    }

    const finalSettings: ITtfbSettings = {
        timeout: 5000,
        method: 'GET',
        port: 443,
        ...(settings ?? {}),
    };

    return new Promise((resolve, reject) => {
        const eventResults = {
            dnsLookup: 0,
            tcpConnection: 0,
            tlsHandshake: 0,
            responseBodyStart: 0,
            responseBodyEnd: 0,
        };

        const req = __https.request(
            {
                hostname: host,
                ...finalSettings,
            },
            (res) => {
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
            },
        );

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
