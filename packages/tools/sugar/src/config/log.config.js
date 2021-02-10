"use strict";
// TODO: doc
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    adapters: {
        console: `${__dirname}/../node/log/adapters/SLogConsoleAdapter`
    },
    adaptersByLevel: {
        log: null,
        info: null,
        warn: null,
        debug: null,
        error: null
    },
    adaptersByEnvironment: {
        test: null,
        development: null,
        production: null
    },
    overrideNativeConsole: true,
    invisibleSplitCharacter: '‏‏‎ ‎'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvZy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFlBQVk7O0FBRVosa0JBQWU7SUFDYixRQUFRLEVBQUU7UUFDUixPQUFPLEVBQUUsR0FBRyxTQUFTLDBDQUEwQztLQUNoRTtJQUNELGVBQWUsRUFBRTtRQUNmLEdBQUcsRUFBRSxJQUFJO1FBQ1QsSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsSUFBSTtRQUNWLEtBQUssRUFBRSxJQUFJO1FBQ1gsS0FBSyxFQUFFLElBQUk7S0FDWjtJQUNELHFCQUFxQixFQUFFO1FBQ3JCLElBQUksRUFBRSxJQUFJO1FBQ1YsV0FBVyxFQUFFLElBQUk7UUFDakIsVUFBVSxFQUFFLElBQUk7S0FDakI7SUFDRCxxQkFBcUIsRUFBRSxJQUFJO0lBQzNCLHVCQUF1QixFQUFFLE9BQU87Q0FDakMsQ0FBQyJ9