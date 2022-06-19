export interface ICssVarsStackItem {
    type: string;
    value: string;
}

export interface ICssVarsStackItemMetas {
    type?: string;
}

export default class CssVars {
    _stack: ICssVarsStackItem[] = [];
    static excludedTypes: string[] = [];
    static excludeByTypes(types: string[]) {
        CssVars.excludedTypes = [
            ...CssVars.excludedTypes,
            ...types.map((t) => t.toLowerCase()),
        ];
    }
    static excludedCodeTypes: string[] = [];
    static excludeCodeByTypes(types: string[]) {
        CssVars.excludedCodeTypes = [
            ...CssVars.excludedCodeTypes,
            ...types.map((t) => t.toLowerCase()),
        ];
    }
    static excludedCommentTypes: string[] = [];
    static excludeCommentByTypes(types: string[]) {
        CssVars.excludedCommentTypes = [
            ...CssVars.excludedCommentTypes,
            ...types.map((t) => t.toLowerCase()),
        ];
    }
    constructor() {}
    comment(str: string | Function, metas?: ICssVarsStackItemMetas) {
        if (typeof str === 'function') str = str();
        let type = metas?.type;

        // global exclude
        if (CssVars.excludedTypes.includes('*')) return this;
        if (CssVars.excludedCommentTypes.includes('*')) return this;

        // try to get type if not setted
        if (!type) {
            const typeMatch = str.match(
                /\*\s@type[\s]{2,999999}([a-zA-Z0-9]+)/,
            );
            if (typeMatch && typeMatch.length && typeMatch[1]) {
                type = typeMatch[1];
            }
        }

        // exclude some comments by types
        if (type && CssVars.excludedTypes.includes(type.toLowerCase()))
            return this;
        if (type && CssVars.excludedCommentTypes.includes(type.toLowerCase()))
            return this;

        if (Array.isArray(str)) str = str.join('\n');
        this._stack.push({
            type: type ?? 'comment',
            value: str,
        });
        return this;
    }
    code(str: string | Function, metas?: ICssVarsStackItemMetas) {
        if (typeof str === 'function') str = str();
        let type = metas?.type;

        // global exclude
        if (CssVars.excludedTypes.includes('*')) return this;
        if (CssVars.excludedCodeTypes.includes('*')) return this;

        // try to get type if not setted
        if (!type) {
            const typeMatch = str.match(
                /\*\s@type[\s]{2,999999}([a-zA-Z0-9]+)/,
            );
            if (typeMatch && typeMatch.length && typeMatch[1]) {
                type = typeMatch[1];
            }
        }

        // exclude some comments by types
        if (type && CssVars.excludedTypes.includes(type.toLowerCase()))
            return this;
        if (type && CssVars.excludedCodeTypes.includes(type.toLowerCase()))
            return this;

        if (Array.isArray(str)) str = str.join('\n');
        this._stack.push({
            type: type ?? 'code',
            value: str,
        });
        return this;
    }
    toString() {
        const finalString: string[] = [];
        this._stack.forEach((stackObj) => {
            finalString.push(stackObj.value);
        });
        return finalString.join(' \n ');
    }
}
