"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CssVars {
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
    constructor() {
        this._stack = [];
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
exports.default = CssVars;
CssVars.excludedTypes = [];
CssVars.excludedCodeTypes = [];
CssVars.excludedCommentTypes = [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBU0EsTUFBcUIsT0FBTztJQUd4QixNQUFNLENBQUMsY0FBYyxDQUFDLEtBQWU7UUFDakMsT0FBTyxDQUFDLGFBQWEsR0FBRztZQUNwQixHQUFHLE9BQU8sQ0FBQyxhQUFhO1lBQ3hCLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3ZDLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEtBQWU7UUFDckMsT0FBTyxDQUFDLGlCQUFpQixHQUFHO1lBQ3hCLEdBQUcsT0FBTyxDQUFDLGlCQUFpQjtZQUM1QixHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN2QyxDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxLQUFlO1FBQ3hDLE9BQU8sQ0FBQyxvQkFBb0IsR0FBRztZQUMzQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0I7WUFDL0IsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdkMsQ0FBQztJQUNOLENBQUM7SUFDRDtRQXRCQSxXQUFNLEdBQXdCLEVBQUUsQ0FBQztJQXNCbEIsQ0FBQztJQUNoQixPQUFPLENBQUMsR0FBc0IsRUFBRSxLQUE4QjtRQUMxRCxJQUFJLE9BQU8sR0FBRyxLQUFLLFVBQVU7WUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDM0MsSUFBSSxJQUFJLEdBQUcsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLElBQUksQ0FBQztRQUV2QixpQkFBaUI7UUFDakIsSUFB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