// @ts-nocheck
import __countLine from './countLine';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxhQUFhLENBQUM7QUF1Q3RDLE1BQU0sQ0FBQyxPQUFPLFVBQVUsWUFBWSxDQUNoQyxJQUFJLEVBQ0osS0FBSyxFQUNMLFdBQXlDLEVBQUU7SUFFM0MsTUFBTSxhQUFhLG1CQUNmLFVBQVUsRUFBRSxJQUFJLElBQ2IsUUFBUSxDQUNkLENBQUM7SUFFRixJQUFJLGFBQWEsQ0FBQyxVQUFVLEVBQUU7UUFDMUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxLQUFLLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM3QyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNuRDtTQUFNO1FBQ0gsTUFBTSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQ2xCLGtEQUFrRDtRQUNsRCx1RUFBdUU7UUFDdkUsR0FBRyxDQUNOLENBQUM7UUFDRix3RUFBd0U7UUFDeEUsTUFBTSxNQUFNLEdBQUcsSUFBSTthQUNkLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDVixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDO2FBQ3JELEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7UUFDUCxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDckIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3JCLFdBQVcsR0FBRyxDQUFDLEdBQUcsV0FBVyxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RCLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNsQixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFFekIsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxJQUFJO2dCQUFFLE9BQU87WUFFbEIsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNoQixJQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUk7b0JBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLE1BQU0sRUFDOUI7b0JBQ0UsYUFBYSxHQUFHLElBQUksQ0FBQztvQkFDckIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7d0JBQzNCLGFBQWEsR0FBRyxPQUFPLGFBQWEsRUFBRSxDQUFDO3FCQUMxQztpQkFDSjtnQkFFRCxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUM7Z0JBQzFDLE9BQU87YUFDVjtZQUNELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxFQUFFO2dCQUNqQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLEdBQUcsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUM7Z0JBQzNDLE1BQU0sSUFBSSxHQUFHLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDckQsMkRBQTJEO2dCQUMzRCw4Q0FBOEM7Z0JBQzlDLE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQzFDLFVBQVUsR0FBRyxDQUFDLEdBQUcsVUFBVSxFQUFFLEdBQUcsU0FBUyxDQUFDLENBQUM7Z0JBQzNDLFNBQVMsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM5RDtpQkFBTTtnQkFDSCxTQUFTLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDekIsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO2FBQzdDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLFVBQVUsQ0FBQztLQUNyQjtBQUNMLENBQUMifQ==