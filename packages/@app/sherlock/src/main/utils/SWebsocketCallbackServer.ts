import { WebSocketServer } from 'ws';

export interface ISWebsocketCallbackServerSettings {
    port: number;
}

export default class SWebsocketCallbackServer {
    settings: ISWebsocketCallbackServerSettings;

    _wss: WebSocketServer;
    _ws: any;

    constructor(settings?: Partial<ISWebsocketCallbackServerSettings>) {
        this.settings = {
            port: 9192,
            ...(settings ?? {}),
        };
    }

    start(): void {
        const wss = new WebSocketServer({
            port: this.settings.port,
        });
        // store at instance level
        this._wss = wss;

        // listen for connections
        wss.on('connection', (ws) => {
            this._ws = ws;
            ws.on('error', console.error);
            ws.on('message', (data) => {
                // try {
                //     data = JSON.parse(data);
                // } catch (e) {}
            });
        });
    }

    /**
     * Send something a particular client
     */
    send(data: any, callbackId: string, ws: any = this._ws): void {
        if (!this._wss) {
            return;
        }
        data.websocketCallbackId = callbackId;
        if (ws.readyState === 1) {
            ws.send(JSON.stringify(data), { binary: true });
        }
    }
}
