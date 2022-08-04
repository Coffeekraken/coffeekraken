// @ts-nocheck
import __countLine from './countLine';
function splitEvery(text, every, settings = {}) {
    const finalSettings = Object.assign({ splitWords: true }, settings);
    if (finalSettings.splitWords) {
        const reg = new RegExp(`.{1,${every}}`, 'g');
        return [...text.matchAll(reg)].map((o) => o[0]);
    }
    else {
        const reg = new RegExp(`(\\x1B\[[0-9;]+m)|(\\x1B\[39m])|(<[a-zA-Z\s/]+>)`, 
        // `(?:(?:\x1B\[[\d;]*m)*[^\x1B]){1,${every}}(?:(?:\x1B\[[\d;]*m)+$)?`,
        'g');
        // const reg = new RegExp(`(?:(?:\033\[[0-9;]*m)*.?){1,${every}}`, 'g');
        const chunks = text
            .split(reg)
            .filter((m) => m != '' && m != null && m != undefined)
            .map((item) => {
            return item.split(/(\s{1,99999999})/g);
        });
        let finalChunks = [];
        chunks.forEach((chunk) => {
            finalChunks = [...finalChunks, ...chunk];
        });
        let finalLines = [''];
        let lineCount = 0;
        let lastOpenedTag = null;
        finalChunks.forEach((item) => {
            if (!item)
                return;
            if (reg.test(item)) {
                if (item.substr(0, 2) !== '</' ||
                    item.substr(0, 4) !== '\x1B') {
                    lastOpenedTag = item;
                    if (item.substr(0, 1) !== '<') {
                        lastOpenedTag = `\x1B${lastOpenedTag}`;
                    }
                }
                finalLines[finalLines.length - 1] += item;
                return;
            }
            if (lineCount + item.length > every) {
                const toAdd = item.substr(0, every - lineCount - 1);
                finalLines[finalLines.length - 1] += toAdd;
                const rest = lastOpenedTag + item.replace(toAdd, '');
                // if (toAdd.slice(-1) !== ' ' && rest.slice(0, 1) !== ' ')
                //   finalLines[finalLines.length - 1] += '-';
                const restLines = splitEvery(rest, every);
                finalLines = [...finalLines, ...restLines];
                lineCount = __countLine(finalLines[finalLines.length - 1]);
            }
            else {
                lineCount += item.length;
                finalLines[finalLines.length - 1] += item;
            }
        });
        return finalLines;
    }
}
export default splitEvery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxhQUFhLENBQUM7QUF1Q3RDLFNBQVMsVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsV0FBeUMsRUFBRTtJQUN4RSxNQUFNLGFBQWEsbUJBQ2YsVUFBVSxFQUFFLElBQUksSUFDYixRQUFRLENBQ2QsQ0FBQztJQUVGLElBQUksYUFBYSxDQUFDLFVBQVUsRUFBRTtRQUMxQixNQUFNLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEtBQUssR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzdDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ25EO1NBQU07UUFDSCxNQUFNLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FDbEIsa0RBQWtEO1FBQ2xELHVFQUF1RTtRQUN2RSxHQUFHLENBQ04sQ0FBQztRQUNGLHdFQUF3RTtRQUN4RSxNQUFNLE1BQU0sR0FBRyxJQUFJO2FBQ2QsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUM7YUFDckQsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDVixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztRQUNQLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUNyQixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDckIsV0FBVyxHQUFHLENBQUMsR0FBRyxXQUFXLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksVUFBVSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQztRQUV6QixXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDekIsSUFBSSxDQUFDLElBQUk7Z0JBQUUsT0FBTztZQUVsQixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2hCLElBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSTtvQkFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssTUFBTSxFQUM5QjtvQkFDRSxhQUFhLEdBQUcsSUFBSSxDQUFDO29CQUNyQixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTt3QkFDM0IsYUFBYSxHQUFHLE9BQU8sYUFBYSxFQUFFLENBQUM7cUJBQzFDO2lCQUNKO2dCQUVELFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztnQkFDMUMsT0FBTzthQUNWO1lBQ0QsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLEVBQUU7Z0JBQ2pDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQztnQkFDM0MsTUFBTSxJQUFJLEdBQUcsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNyRCwyREFBMkQ7Z0JBQzNELDhDQUE4QztnQkFDOUMsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDMUMsVUFBVSxHQUFHLENBQUMsR0FBRyxVQUFVLEVBQUUsR0FBRyxTQUFTLENBQUMsQ0FBQztnQkFDM0MsU0FBUyxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzlEO2lCQUFNO2dCQUNILFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUN6QixVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUM7YUFDN0M7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sVUFBVSxDQUFDO0tBQ3JCO0FBQ0wsQ0FBQztBQUNELGVBQWUsVUFBVSxDQUFDIn0=