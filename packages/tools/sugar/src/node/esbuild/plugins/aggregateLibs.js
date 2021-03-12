"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const extractImport_1 = __importDefault(require("../../module/extractImport"));
const resolve_1 = __importDefault(require("../../module/resolve"));
const fs_1 = __importDefault(require("fs"));
const packageRoot_1 = __importDefault(require("../../path/packageRoot"));
const SFile_1 = __importDefault(require("../../fs/SFile"));
exports.default = {
    name: 'aggregateLibs',
    setup(build) {
        build.onResolve({ filter: /.*\.[jt]s$/ }, function (args) {
            nativeConsole.log(args, build);
            const content = fs_1.default.readFileSync(args.path, 'utf8');
            const imports = extractImport_1.default(content);
            const dirs = [
                packageRoot_1.default(),
                `${packageRoot_1.default()}/node_modules`,
                `${packageRoot_1.default(process.cwd(), true)}/node_modules`
            ];
            imports.forEach((importObj) => {
                const path = resolve_1.default(importObj.path, {
                    dirs
                });
                const file = SFile_1.default.instanciate(path);
            });
            console.log(imports);
            return { path: args.path };
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdncmVnYXRlTGlicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFnZ3JlZ2F0ZUxpYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwrRUFBeUQ7QUFDekQsbUVBQTZDO0FBQzdDLDRDQUFzQjtBQUN0Qix5RUFBbUQ7QUFDbkQsMkRBQXFDO0FBRXJDLGtCQUFlO0lBQ2IsSUFBSSxFQUFFLGVBQWU7SUFDckIsS0FBSyxDQUFDLEtBQUs7UUFDVCxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLFVBQVUsSUFBSTtZQUN0RCxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUUvQixNQUFNLE9BQU8sR0FBRyxZQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFckQsTUFBTSxPQUFPLEdBQUcsdUJBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUV6QyxNQUFNLElBQUksR0FBRztnQkFDWCxxQkFBYSxFQUFFO2dCQUNmLEdBQUcscUJBQWEsRUFBRSxlQUFlO2dCQUNqQyxHQUFHLHFCQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxlQUFlO2FBQ3JELENBQUM7WUFDRixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQzVCLE1BQU0sSUFBSSxHQUFHLGlCQUFTLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRTtvQkFDckMsSUFBSTtpQkFDTCxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxJQUFJLEdBQUcsZUFBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFckIsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQyJ9