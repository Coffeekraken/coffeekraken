// @ts-nocheck
import __SSugarConfig from '@coffeekraken/s-sugar-config';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const distNodeDir = __SSugarConfig.get('storage.dist.nodeDir');
    if (distNodeDir !== undefined) {
        // __fs.ensureDirSync(distNodeDir);
        return distNodeDir;
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQStCMUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxXQUFpQyxFQUFFO0lBQ3hELFFBQVEscUJBQ0QsUUFBUSxDQUNkLENBQUM7SUFDRixNQUFNLFdBQVcsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDL0QsSUFBSSxXQUFXLEtBQUssU0FBUyxFQUFFO1FBQzNCLG1DQUFtQztRQUNuQyxPQUFPLFdBQVcsQ0FBQztLQUN0QjtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ3JCLENBQUMifQ==