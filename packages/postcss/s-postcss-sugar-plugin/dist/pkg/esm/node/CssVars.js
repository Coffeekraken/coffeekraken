export default class CssVars {
    constructor() {
        this._stack = [];
    }
    static excludeByTypes(types) {
        CssVars.excludedTypes = [
            ...CssVars.excludedTypes,
            ...types.map((t) => t.toLowerCase()),
        ];
    }
    static excludeCodeByTypes(types) {
        CssVars.excludedCodeTypes = [
            ...CssVars.excludedCodeTypes,
            ...types.map((t) => t.toLowerCase()),
        ];
    }
    static excludeCommentByTypes(types) {
        CssVars.excludedCommentTypes = [
            ...CssVars.excludedCommentTypes,
            ...types.map((t) => t.toLowerCase()),
        ];
    }
    comment(str, metas) {
        if (typeof str === 'function')
            str = str();
        let type = metas === null || metas === void 0 ? void 0 : metas.type;
        // global exclude
        if (CssVars.excludedTypes.includes('*'))
            return this;
        if (CssVars.excludedCommentTypes.includes('*'))
            return this;
        // try to get type if not setted
        if (!type) {
            const typeMatch = str.match(/\*\s@type[\s]{2,999999}([a-zA-Z0-9]+)/);
            if (typeMatch && typeMatch.length && typeMatch[1]) {
                type = typeMatch[1];
            }
        }
        // exclude some comments by types
        if (type && CssVars.excludedTypes.includes(type.toLowerCase()))
            return this;
        if (type && CssVars.excludedCommentTypes.includes(type.toLowerCase()))
            return this;
        if (Array.isArray(str))
            str = str.join('\n');
        this._stack.push({
            type: type !== null && type !== void 0 ? type : 'comment',
            value: str,
        });
        return this;
    }
    code(str, metas) {
        if (typeof str === 'function')
            str = str();
        let type = metas === null || metas === void 0 ? void 0 : metas.type;
        // global exclude
        if (CssVars.excludedTypes.includes('*'))
            return this;
        if (CssVars.excludedCodeTypes.includes('*'))
            return this;
        // try to get type if not setted
        if (!type) {
            const typeMatch = str.match(/\*\s@type[\s]{2,999999}([a-zA-Z0-9]+)/);
            if (typeMatch && typeMatch.length && typeMatch[1]) {
                type = typeMatch[1];
            }
        }
        // exclude some comments by types
        if (type && CssVars.excludedTypes.includes(type.toLowerCase()))
            return this;
        if (type && CssVars.excludedCodeTypes.includes(type.toLowerCase()))
            return this;
        if (Array.isArray(str))
            str = str.join('\n');
        this._stack.push({
            type: type !== null && type !== void 0 ? type : 'code',
            value: str,
        });
        return this;
    }
    toString() {
        const finalString = [];
        this._stack.forEach((stackObj) => {
            finalString.push(stackObj.value);
        });
        return finalString.join(' \n ');
    }
}
CssVars.excludedTypes = [];
CssVars.excludedCodeTypes = [];
CssVars.excludedCommentTypes = [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNBLE1BQU0sQ0FBQyxPQUFPLE9BQU8sT0FBTztJQXVCeEI7UUF0QkEsV0FBTSxHQUF3QixFQUFFLENBQUM7SUFzQmxCLENBQUM7SUFwQmhCLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBZTtRQUNqQyxPQUFPLENBQUMsYUFBYSxHQUFHO1lBQ3BCLEdBQUcsT0FBTyxDQUFDLGFBQWE7WUFDeEIsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdkMsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLENBQUMsa0JBQWtCLENBQUMsS0FBZTtRQUNyQyxPQUFPLENBQUMsaUJBQWlCLEdBQUc7WUFDeEIsR0FBRyxPQUFPLENBQUMsaUJBQWlCO1lBQzVCLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3ZDLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEtBQWU7UUFDeEMsT0FBTyxDQUFDLG9CQUFvQixHQUFHO1lBQzNCLEdBQUcsT0FBTyxDQUFDLG9CQUFvQjtZQUMvQixHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN2QyxDQUFDO0lBQ04sQ0FBQztJQUVELE9BQU8sQ0FBQyxHQUFzQixFQUFFLEtBQThCO1FBQzFELElBQUksT0FBTyxHQUFHLEtBQUssVUFBVTtZQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUMzQyxJQUFJLElBQUksR0FBRyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsSUFBSSxDQUFDO1FBRXZCLGlC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