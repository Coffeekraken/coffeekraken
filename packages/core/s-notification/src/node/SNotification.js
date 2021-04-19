"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SNotification_1 = __importDefault(require("../shared/SNotification"));
const nodeSNotificationAdapter_1 = __importDefault(require("./adapters/nodeSNotificationAdapter"));
const blessedSNotificationAdapter_1 = __importDefault(require("./adapters/blessedSNotificationAdapter"));
SNotification_1.default.registerAdapter(nodeSNotificationAdapter_1.default);
SNotification_1.default.registerAdapter(blessedSNotificationAdapter_1.default);
__exportStar(require("../shared/SNotification"), exports);
exports.default = SNotification_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05vdGlmaWNhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNOb3RpZmljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEVBQXNEO0FBQ3RELG1HQUE2RTtBQUM3RSx5R0FBbUY7QUFFbkYsdUJBQWUsQ0FBQyxlQUFlLENBQUMsa0NBQTBCLENBQUMsQ0FBQztBQUM1RCx1QkFBZSxDQUFDLGVBQWUsQ0FBQyxxQ0FBNkIsQ0FBQyxDQUFDO0FBRS9ELDBEQUF3QztBQUN4QyxrQkFBZSx1QkFBZSxDQUFDIn0=