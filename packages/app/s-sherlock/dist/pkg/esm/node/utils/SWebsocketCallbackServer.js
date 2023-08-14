import { WebSocketServer } from 'ws';
export default class SWebsocketCallbackServer {
    constructor(settings) {
        this.settings = Object.assign({ port: 9192 }, (settings !== null && settings !== void 0 ? settings : {}));
    }
    start() {
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
    send(data, callbackId, ws = this._ws) {
        if (!this._wss) {
            return;
        }
        data.websocketCallbackId = callbackId;
        if (ws.readyState === 1) {
            ws.send(JSON.stringify(data), { binary: true });
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFNckMsTUFBTSxDQUFDLE9BQU8sT0FBTyx3QkFBd0I7SUFNekMsWUFBWSxRQUFxRDtRQUM3RCxJQUFJLENBQUMsUUFBUSxtQkFDVCxJQUFJLEVBQUUsSUFBSSxJQUNQLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFDTixDQUFDO0lBRUQsS0FBSztRQUNELE1BQU0sR0FBRyxHQUFHLElBQUksZUFBZSxDQUFDO1lBQzVCLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUk7U0FDM0IsQ0FBQyxDQUFDO1FBQ0gsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBRWhCLHlCQUF5QjtRQUN6QixHQUFHLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2QsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlCLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ3RCLFFBQVE7Z0JBQ1IsK0JBQStCO2dCQUMvQixpQkFBaUI7WUFDckIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksQ0FBQyxJQUFTLEVBQUUsVUFBa0IsRUFBRSxLQUFVLElBQUksQ0FBQyxHQUFHO1FBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1osT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFVBQVUsQ0FBQztRQUN0QyxJQUFJLEVBQUUsQ0FBQyxVQUFVLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ25EO0lBQ0wsQ0FBQztDQUNKIn0=