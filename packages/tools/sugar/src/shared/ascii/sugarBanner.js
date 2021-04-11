// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const deepMerge_1 = __importDefault(require("../object/deepMerge"));
    function sugarBanner(settings = {}) {
        settings = deepMerge_1.default({
            version: '',
            borders: true,
            marginLeft: 2
        }, settings);
        let version = '';
        if (settings.version)
            version = `<white>${settings.version}</white>`;
        const value = [
            `<yellow>${settings.borders ? '█' : ''}${' '.repeat(settings.marginLeft)}  ____                           </yellow>`,
            `<yellow>${settings.borders ? '█' : ''}${' '.repeat(settings.marginLeft)}/ ____|</yellow><white>Coffee<cyan>kraken</cyan></white><yellow> __ _ _ __   </yellow>`,
            `<yellow>${settings.borders ? '█' : ''}${' '.repeat(settings.marginLeft)}\\___ \\| | | |/ _\` |/ _\` | \`__|  </yellow>`,
            `<yellow>${settings.borders ? '█' : ''}${' '.repeat(settings.marginLeft)} ___) | |_| | (_| | (_| | |       </yellow>`,
            `<yellow>${settings.borders ? '█' : ''}${' '.repeat(settings.marginLeft)}|____/ \\__,_|\\__, |\\__,_|_|</yellow> ${version}    `,
            `<yellow>${settings.borders ? '█' : ''}</yellow><white>${' '.repeat(settings.marginLeft)}             </white><yellow>|___/</yellow>`
        ]
            .map((line) => {
            return line;
        })
            .join('\n');
        return value;
    }
    exports.default = sugarBanner;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXJCYW5uZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhckJhbm5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxvRUFBOEM7SUE4QjlDLFNBQVMsV0FBVyxDQUFDLFdBQWlDLEVBQUU7UUFDdEQsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1lBQ0UsT0FBTyxFQUFFLEVBQUU7WUFDWCxPQUFPLEVBQUUsSUFBSTtZQUNiLFVBQVUsRUFBRSxDQUFDO1NBQ2QsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUNGLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLFFBQVEsQ0FBQyxPQUFPO1lBQUUsT0FBTyxHQUFHLFVBQVUsUUFBUSxDQUFDLE9BQU8sVUFBVSxDQUFDO1FBQ3JFLE1BQU0sS0FBSyxHQUFHO1lBQ1osV0FBVyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUNqRCxRQUFRLENBQUMsVUFBVSxDQUNwQiw0Q0FBNEM7WUFDN0MsV0FBVyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUNqRCxRQUFRLENBQUMsVUFBVSxDQUNwQix3RkFBd0Y7WUFDekYsV0FBVyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUNqRCxRQUFRLENBQUMsVUFBVSxDQUNwQixnREFBZ0Q7WUFDakQsV0FBVyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUNqRCxRQUFRLENBQUMsVUFBVSxDQUNwQiw2Q0FBNkM7WUFDOUMsV0FBVyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUNqRCxRQUFRLENBQUMsVUFBVSxDQUNwQiwyQ0FBMkMsT0FBTyxNQUFNO1lBQ3pELFdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLG1CQUFtQixHQUFHLENBQUMsTUFBTSxDQUNqRSxRQUFRLENBQUMsVUFBVSxDQUNwQiw2Q0FBNkM7U0FDL0M7YUFDRSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNaLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsa0JBQWUsV0FBVyxDQUFDIn0=