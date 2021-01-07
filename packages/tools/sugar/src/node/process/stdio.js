"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SBlessedProcessStdio_1 = __importDefault(require("./stdio/blessed/SBlessedProcessStdio"));
const class_1 = __importDefault(require("../is/class"));
const parseHtml_1 = __importDefault(require("../console/parseHtml"));
const toString_1 = __importDefault(require("../string/toString"));
const countLine_1 = __importDefault(require("../string/countLine"));
module.exports = (source, settings = {}) => {
    if (!Array.isArray(source))
        source = [source];
    const stdio = settings.stdio;
    delete settings.stdio;
    if (stdio === 'inherit') {
        source.forEach((s) => {
            s.on('log,*.log,warn,*.warn,error,*.error,reject,*.reject', (data, metas) => {
                if (!data)
                    return;
                let value = data.value !== undefined ? data.value : data;
                if (typeof value === 'string') {
                    value = parseHtml_1.default(value);
                }
                else {
                    value = toString_1.default(value);
                }
                if (data.type) {
                    switch (data.type) {
                        case 'separator':
                            const separator = data.separator
                                ? data.separator.slice(0, 1)
                                : '-';
                            if (value) {
                                console.log('\n' +
                                    parseHtml_1.default(`${value} ${separator.repeat(process.stdout.columns - countLine_1.default(value) - 1)}`));
                            }
                            else {
                                console.log('\n' + parseHtml_1.default(separator.repeat(process.stdout.columns)));
                            }
                            break;
                    }
                }
                else {
                    console.log(value);
                }
            });
        });
        return undefined;
    }
    else if (class_1.default(stdio)) {
        // @ts-ignore
        return new stdio(source, settings);
    }
    else {
        const stdio = new SBlessedProcessStdio_1.default(source, settings);
        return stdio;
    }
};
//# sourceMappingURL=stdio.js.map