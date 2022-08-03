// @ts-nocheck
import __linkPackages from '../../node/monorepo/linkPackages';
export default (stringArgs = '') => {
    let individual = false;
    if (stringArgs.match(/\s?--individual\s?/) || stringArgs.match(/\s?-i\s?/))
        individual = true;
    __linkPackages({
        individual
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLGNBQWMsTUFBTSxrQ0FBa0MsQ0FBQztBQUU5RCxlQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ2pDLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztJQUN2QixJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUN4RSxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLGNBQWMsQ0FBQztRQUNiLFVBQVU7S0FDWCxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==