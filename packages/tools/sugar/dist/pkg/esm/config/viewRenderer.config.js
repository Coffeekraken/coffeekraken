import __path from 'path';
import __dirname from '../node/fs/dirname';
import __packageRootDir from '../node/path/packageRootDir';
export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name            rootDirs
         * @namespace       config.viewRenderer
         * @type            string[]
         * @default          ['[config.storage.src.rootDir]/views']
         *
         * Specify the roots views directories
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get rootDirs() {
            return [
                __packageRootDir(),
                `${api.config.storage.src.rootDir}/views`,
                `${__path.resolve(__packageRootDir(__dirname()), 'src/views/twig')}`,
            ];
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFNBQVMsTUFBTSxvQkFBb0IsQ0FBQztBQUMzQyxPQUFPLGdCQUFnQixNQUFNLDZCQUE2QixDQUFDO0FBRTNELE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxRQUFRO1lBQ1IsT0FBTztnQkFDSCxnQkFBZ0IsRUFBRTtnQkFDbEIsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxRQUFRO2dCQUN6QyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQ2IsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsRUFDN0IsZ0JBQWdCLENBQ25CLEVBQUU7YUFDTixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7QUFDTixDQUFDIn0=