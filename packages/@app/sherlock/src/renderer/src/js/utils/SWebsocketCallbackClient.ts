import { __uniqid } from '@coffeekraken/sugar/string';

export interface ISWebsocketCallbackClientSettings {
    host: string;
    port: number;
}

export default class SWebsocketCallbackClient {
    settings: ISWebsocketCallbackClientSettings;
    _socket: WebSocket;
    _callbacks: Record<string, Function> = {};

    constructor(settings?: Partial<ISWebsocketCallbackClientSettings>) {
        this.settings = {
            host: '127.0.0.1',
            port: 9192,
            ...(settings ?? {}),
        };

        (async () => {
            // connect
            this.connect();
            // listen for data
            this.listen();
        })();
    }

    /**
     * Add a callback
     */
    registerCallback(cb: Function): string {
        const id = __uniqid();
        this._callbacks[id] = cb;
        return id;
    }

    /**
     * Listen for data
     */
    listen(): void {
        // Listen for messages
        this._socket.addEventListener('message', async (event) => {
            let data = event.data;
            try {
                data = await event.data.text();
            } catch (e) {}
            try {
                data = JSON.parse(data);
            } catch (e) {}

            if (data.websocketCallbackId && this._callbacks[data.websocketCallbackId]) {
                this._callbacks[data.websocketCallbackId](data);
                delete data.websocketCallbackId;
            }
        });
    }

    /**
     * Connect to server
     */
    connect(): Promise<void> {
        return new Promise((resolve) => {
            // Create WebSocket connection.
            this._socket = new WebSocket(`ws://${this.settings.host}:${this.settings.port}`);

            // Connection opened
            this._socket.addEventListener('open', (event) => {
                this._socket.send('Hello Server!');
                resolve();
            });
        });
    }
}
