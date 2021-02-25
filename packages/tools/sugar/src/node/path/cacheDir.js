// @ts-nocheck
import __sugarConfig from '../config/sugar';
import __fs from 'fs-extra';
export default function (settings = {}) {
    settings = Object.assign({}, settings);
    const cacheDir = __sugarConfig('storage.cacheDir');
    if (cacheDir !== undefined) {
        __fs.ensureDirSync(cacheDir);
        return cacheDir;
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGVEaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYWNoZURpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxhQUFhLE1BQU0saUJBQWlCLENBQUM7QUFDNUMsT0FBTyxJQUFJLE1BQU0sVUFBVSxDQUFDO0FBOEI1QixNQUFNLENBQUMsT0FBTyxXQUFXLFdBQThCLEVBQUU7SUFDdkQsUUFBUSxxQkFDSCxRQUFRLENBQ1osQ0FBQztJQUNGLE1BQU0sUUFBUSxHQUFHLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ25ELElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtRQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdCLE9BQU8sUUFBUSxDQUFDO0tBQ2pCO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQyJ9