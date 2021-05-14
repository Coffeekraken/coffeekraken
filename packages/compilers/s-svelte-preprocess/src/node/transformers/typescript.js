// @ts-nocheck
import { dirname, isAbsolute, join, resolve } from 'path';
import ts from 'typescript';
import { throwTypescriptError } from '../modules/errors';
function createFormatDiagnosticsHost(cwd) {
    return {
        getCanonicalFileName: (fileName) => fileName,
        getCurrentDirectory: () => cwd,
        getNewLine: () => ts.sys.newLine
    };
}
function formatDiagnostics(diagnostics, basePath) {
    if (Array.isArray(diagnostics)) {
        return ts.formatDiagnosticsWithColorAndContext(diagnostics, createFormatDiagnosticsHost(basePath));
    }
    return ts.formatDiagnostic(diagnostics, createFormatDiagnosticsHost(basePath));
}
const importTransformer = (context) => {
    const visit = (node) => {
        var _a;
        if (ts.isImportDeclaration(node)) {
            if ((_a = node.importClause) === null || _a === void 0 ? void 0 : _a.isTypeOnly) {
                return ts.createEmptyStatement();
            }
            return ts.createImportDeclaration(node.decorators, node.modifiers, node.importClause, node.moduleSpecifier);
        }
        return ts.visitEachChild(node, (child) => visit(child), context);
    };
    return (node) => ts.visitNode(node, visit);
};
export function loadTsconfig(compilerOptionsJSON, filename, tsOptions) {
    if (typeof tsOptions.tsconfigFile === 'boolean') {
        return { errors: [], options: compilerOptionsJSON };
    }
    let basePath = process.cwd();
    const fileDirectory = (tsOptions.tsconfigDirectory ||
        dirname(filename));
    let tsconfigFile = tsOptions.tsconfigFile ||
        ts.findConfigFile(fileDirectory, ts.sys.fileExists);
    if (!tsconfigFile) {
        return { errors: [], options: {} };
    }
    tsconfigFile = isAbsolute(tsconfigFile)
        ? tsconfigFile
        : join(basePath, tsconfigFile);
    basePath = dirname(tsconfigFile);
    const { error, config } = ts.readConfigFile(tsconfigFile, ts.sys.readFile);
    if (error) {
        throw new Error(formatDiagnostics(error, basePath));
    }
    // Do this so TS will not search for initial files which might take a while
    config.include = [];
    let { errors, options } = ts.parseJsonConfigFileContent(config, ts.sys, basePath, compilerOptionsJSON, tsconfigFile);
    // Filter out "no files found error"
    errors = errors.filter((d) => d.code !== 18003);
    return { errors, options };
}
const transformer = ({ content, filename, options = {} }) => {
    // default options
    const compilerOptionsJSON = {
        moduleResolution: 'node',
        target: 'es6'
    };
    const basePath = process.cwd();
    Object.assign(compilerOptionsJSON, options.compilerOptions);
    const { errors, options: convertedCompilerOptions } = options.tsconfigFile !== false || options.tsconfigDirectory
        ? loadTsconfig(compilerOptionsJSON, filename, options)
        : ts.convertCompilerOptionsFromJson(compilerOptionsJSON, basePath);
    if (errors.length) {
        throw new Error(formatDiagnostics(errors, basePath));
    }
    const compilerOptions = Object.assign(Object.assign({}, convertedCompilerOptions), { importsNotUsedAsValues: ts.ImportsNotUsedAsValues.Error, allowNonTsExtensions: true });
    if (compilerOptions.target === ts.ScriptTarget.ES3 ||
        compilerOptions.target === ts.ScriptTarget.ES5) {
        throw new Error(`Svelte only supports es6+ syntax. Set your 'compilerOptions.target' to 'es6' or higher.`);
    }
    const absoluteFilename = isAbsolute(filename)
        ? filename
        : resolve(basePath, filename);
    const { outputText: code, sourceMapText: map, diagnostics } = ts.transpileModule(content, {
        fileName: absoluteFilename,
        compilerOptions,
        reportDiagnostics: options.reportDiagnostics !== false,
        transformers: {
            before: [importTransformer]
        }
    });
    if (diagnostics.length > 0) {
        // could this be handled elsewhere?
        const hasError = diagnostics.some((d) => d.category === ts.DiagnosticCategory.Error);
        const formattedDiagnostics = formatDiagnostics(diagnostics, basePath);
        console.log(formattedDiagnostics);
        if (hasError) {
            throwTypescriptError();
        }
    }
    return {
        code,
        map,
        diagnostics
    };
};
export { transformer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXNjcmlwdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInR5cGVzY3JpcHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFMUQsT0FBTyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTVCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBS3pELFNBQVMsMkJBQTJCLENBQUMsR0FBVztJQUM5QyxPQUFPO1FBQ0wsb0JBQW9CLEVBQUUsQ0FBQyxRQUFnQixFQUFFLEVBQUUsQ0FBQyxRQUFRO1FBQ3BELG1CQUFtQixFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUc7UUFDOUIsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTztLQUNqQyxDQUFDO0FBQ0osQ0FBQztBQUVELFNBQVMsaUJBQWlCLENBQ3hCLFdBQTRDLEVBQzVDLFFBQWdCO0lBRWhCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUM5QixPQUFPLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FDNUMsV0FBVyxFQUNYLDJCQUEyQixDQUFDLFFBQVEsQ0FBQyxDQUN0QyxDQUFDO0tBQ0g7SUFFRCxPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FDeEIsV0FBVyxFQUNYLDJCQUEyQixDQUFDLFFBQVEsQ0FBQyxDQUN0QyxDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0saUJBQWlCLEdBQXlDLENBQUMsT0FBTyxFQUFFLEVBQUU7SUFDMUUsTUFBTSxLQUFLLEdBQWUsQ0FBQyxJQUFJLEVBQUUsRUFBRTs7UUFDakMsSUFBSSxFQUFFLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDaEMsSUFBSSxNQUFBLElBQUksQ0FBQyxZQUFZLDBDQUFFLFVBQVUsRUFBRTtnQkFD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