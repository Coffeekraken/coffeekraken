"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
function __getAnimationsFromElement($elm) {
    const properties = (0, dom_1.__getAnimationProperties)($elm);
    const animations = [];
    properties.name.forEach((name, i) => {
        animations.push({
            name,
            duration: properties.duration[i],
            delay: properties.delay[i],
            timingFunction: properties.timingFunction[i],
            iterationCount: properties.iterationCount[i],
            direction: properties.direction[i],
            playState: properties.playState[i],
            fillMode: properties.fillMode[i],
        });
    });
    return animations;
}
exports.default = __getAnimationsFromElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLGlEQUFtRTtBQW9EbkUsU0FBd0IsMEJBQTBCLENBQUMsSUFBaUI7SUFDaEUsTUFBTSxVQUFVLEdBQUcsSUFBQSw4QkFBd0IsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUNsRCxNQUFNLFVBQVUsR0FBK0MsRUFBRSxDQUFDO0lBRWxFLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2hDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDWixJQUFJO1lBQ0osUUFBUSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLEtBQUssRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMxQixjQUFjLEVBQUUsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDNUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQzVDLFNBQVMsRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNsQyxTQUFTLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQ25DLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxVQUFVLENBQUM7QUFDdEIsQ0FBQztBQWxCRCw2Q0FrQkMifQ==