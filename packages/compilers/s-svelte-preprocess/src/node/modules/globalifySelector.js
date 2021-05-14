// @ts-nocheck
/* eslint-disable line-comment-position */
/*
 * Split a selector string (ex: div > foo ~ .potato) by
 * separators: space, >, +, ~ and comma (maybe not needed)
 * We use a negative lookbehind assertion to prevent matching
 * escaped combinators like `\~`.
 */
// TODO: maybe replace this ugly pattern with an actual selector parser? (https://github.com/leaverou/parsel, 2kb)
const combinatorPattern = /(?<!\\)(?:\\\\)*([ >+~,]\s*)(?![^[]+\]|\d)/g;
export function globalifySelector(selector) {
    const parts = selector.trim().split(combinatorPattern);
    const newSelector = [];
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        // if this is a separator or a :global
        if (i % 2 !== 0 || part === '' || part.startsWith(':global')) {
            newSelector.push(part);
            continue;
        }
        // :local() with scope
        if (part.startsWith(':local(')) {
            newSelector.push(part.replace(/:local\((.+?)\)/g, '$1'));
            continue;
        }
        // :local inlined in a selector
        if (part.startsWith(':local')) {
            // + 2 to ignore the :local and space combinator
            const startIndex = i + 2;
            let endIndex = parts.findIndex((p, idx) => idx > startIndex && p.startsWith(':global'));
            endIndex = endIndex === -1 ? parts.length - 1 : endIndex;
            newSelector.push(...parts.slice(startIndex, endIndex + 1));
            i = endIndex;
            continue;
        }
        newSelector.push(`:global(${part})`);
    }
    return newSelector.join('');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsaWZ5U2VsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnbG9iYWxpZnlTZWxlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsMENBQTBDO0FBQzFDOzs7OztHQUtHO0FBQ0gsa0hBQWtIO0FBQ2xILE1BQU0saUJBQWlCLEdBQUcsNkNBQTZDLENBQUM7QUFFeEUsTUFBTSxVQUFVLGlCQUFpQixDQUFDLFFBQWdCO0lBQ2hELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUV2RCxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFFdkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDckMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXRCLHNDQUFzQztRQUN0QyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUM1RCxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLFNBQVM7U0FDVjtRQUVELHNCQUFzQjtRQUN0QixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDOUIsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDekQsU0FBUztTQUNWO1FBRUQsK0JBQStCO1FBQy9CLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM3QixnREFBZ0Q7WUFDaEQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUM1QixDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxVQUFVLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FDeEQsQ0FBQztZQUVGLFFBQVEsR0FBRyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7WUFFekQsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTNELENBQUMsR0FBRyxRQUFRLENBQUM7WUFFYixTQUFTO1NBQ1Y7UUFFRCxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxHQUFHLENBQUMsQ0FBQztLQUN0QztJQUVELE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM5QixDQUFDIn0=