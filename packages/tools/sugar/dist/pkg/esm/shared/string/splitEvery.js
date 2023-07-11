// @ts-nocheck
import __countLineChars from './countLineChars.js';
export default function __splitEvery(text, every, settings = {}) {
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
                lineCount = __countLineChars(finalLines[finalLines.length - 1]);
            }
            else {
                lineCount += item.length;
                finalLines[finalLines.length - 1] += item;
            }
        });
        return finalLines;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGdCQUFnQixNQUFNLHFCQUFxQixDQUFDO0FBeUNuRCxNQUFNLENBQUMsT0FBTyxVQUFVLFlBQVksQ0FDaEMsSUFBSSxFQUNKLEtBQUssRUFDTCxXQUF5QyxFQUFFO0lBRTNDLE1BQU0sYUFBYSxtQkFDZixVQUFVLEVBQUUsSUFBSSxJQUNiLFFBQVEsQ0FDZCxDQUFDO0lBRUYsSUFBSSxhQUFhLENBQUMsVUFBVSxFQUFFO1FBQzFCLE1BQU0sR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLE9BQU8sS0FBSyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDN0MsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbkQ7U0FBTTtRQUNILE1BQU0sR0FBRyxHQUFHLElBQUksTUFBTSxDQUNsQixrREFBa0Q7UUFDbEQsdUVBQXVFO1FBQ3ZFLEdBQUcsQ0FDTixDQUFDO1FBQ0Ysd0VBQXdFO1FBQ3hFLE1BQU0sTUFBTSxHQUFHLElBQUk7YUFDZCxLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ1YsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQzthQUNyRCxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNWLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNyQixXQUFXLEdBQUcsQ0FBQyxHQUFHLFdBQVcsRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBRXpCLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN6QixJQUFJLENBQUMsSUFBSTtnQkFBRSxPQUFPO1lBRWxCLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDaEIsSUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJO29CQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxNQUFNLEVBQzlCO29CQUNFLGFBQWEsR0FBRyxJQUFJLENBQUM7b0JBQ3JCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO3dCQUMzQixhQUFhLEdBQUcsT0FBTyxhQUFhLEVBQUUsQ0FBQztxQkFDMUM7aUJBQ0o7Z0JBRUQsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO2dCQUMxQyxPQUFPO2FBQ1Y7WUFDRCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssRUFBRTtnQkFDakMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDcEQsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDO2dCQUMzQyxNQUFNLElBQUksR0FBRyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3JELDJEQUEyRDtnQkFDM0QsOENBQThDO2dCQUM5QyxNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUMxQyxVQUFVLEdBQUcsQ0FBQyxHQUFHLFVBQVUsRUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFDO2dCQUMzQyxTQUFTLEdBQUcsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNuRTtpQkFBTTtnQkFDSCxTQUFTLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDekIsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO2FBQzdDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLFVBQVUsQ0FBQztLQUNyQjtBQUNMLENBQUMifQ==