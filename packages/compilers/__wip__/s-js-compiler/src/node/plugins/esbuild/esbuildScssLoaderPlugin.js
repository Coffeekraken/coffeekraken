// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @status              wip
 * @todo      interface
 * @todo      doc
 * @todo      tests
 */
import __fs from 'fs';
import __SScssCompiler from '../../../../scss/SScssCompiler';
import __tmpDir from '../../../../fs/tmpDir';
export default {
    name: 'esbuildScssLoaderPlugin',
    setup(build) {
        // Load ".txt" files and return an array of words
        build.onLoad({ filter: /\.scss$/ }, (args) => __awaiter(this, void 0, void 0, function* () {
            let text = yield __fs.promises.readFile(args.path, 'utf8');
            const filePath = `${__tmpDir()}/esbuildScssLoaderPlugin.scss`;
            __fs.writeFileSync(filePath, text);
            const compiler = new __SScssCompiler({
                sharedResources: [],
                prod: true
            });
            const resultObj = yield compiler.compile(filePath);
            const outputCss = resultObj.css;
            const script = [
                'var css = `' + outputCss + '`,',
                `   $head = document.head || document.getElementsByTagName('head')[0],`,
                `   $style = document.createElement('style');`,
                `$head.appendChild($style);`,
                `if ($style.styleSheet){`,
                `   $style.styleSheet.cssText = css;`,
                `} else {`,
                `   $style.appendChild(document.createTextNode(css));`,
                `}`
            ].join('\n');
            return {
                contents: script,
                loader: 'js'
            };
        }));
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNidWlsZFNjc3NMb2FkZXJQbHVnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlc2J1aWxkU2Nzc0xvYWRlclBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQ7Ozs7O0dBS0c7QUFFSCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxlQUFlLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0QsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsZUFBZTtJQUNiLElBQUksRUFBRSx5QkFBeUI7SUFDL0IsS0FBSyxDQUFDLEtBQUs7UUFDVCxpREFBaUQ7UUFDakQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFO1lBQ2pELElBQUksSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMzRCxNQUFNLFFBQVEsR0FBRyxHQUFHLFFBQVEsRUFBRSwrQkFBK0IsQ0FBQztZQUM5RCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVuQyxNQUFNLFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBQztnQkFDbkMsZUFBZSxFQUFFLEVBQUU7Z0JBQ25CLElBQUksRUFBRSxJQUFJO2FBQ1gsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxTQUFTLEdBQUcsTUFBTSxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25ELE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUM7WUFFaEMsTUFBTSxNQUFNLEdBQUc7Z0JBQ2IsYUFBYSxHQUFHLFNBQVMsR0FBRyxJQUFJO2dCQUNoQyx1RUFBdUU7Z0JBQ3ZFLDhDQUE4QztnQkFDOUMsNEJBQTRCO2dCQUM1Qix5QkFBeUI7Z0JBQ3pCLHFDQUFxQztnQkFDckMsVUFBVTtnQkFDVixzREFBc0Q7Z0JBQ3RELEdBQUc7YUFDSixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUViLE9BQU87Z0JBQ0wsUUFBUSxFQUFFLE1BQU07Z0JBQ2hCLE1BQU0sRUFBRSxJQUFJO2FBQ2IsQ0FBQztRQUNKLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQyJ9