var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default function ({ root, sharedData, settings, cacheDir, classmap, }) {
    return __awaiter(this, void 0, void 0, function* () {
        root.walkAtRules('sugar.utils.removeprops', (atRule) => {
            const props = atRule.params
                .replace(/^\'/, '')
                .replace(/\'$/, '')
                .split(',')
                .map((p) => p.trim());
            // loop on each prop to remove
            props.forEach((prop) => {
                let propSelector = prop;
                // handle regexp
                if (prop.startsWith('^') || prop.endsWith('$')) {
                    propSelector = new RegExp(prop);
                }
                // remove decls
                atRule.walkDecls(propSelector, (toRemoveDecl) => {
                    var _a;
                    (_a = toRemoveDecl.remove) === null || _a === void 0 ? void 0 : _a.call(toRemoveDecl);
                });
            });
            atRule.replaceWith(atRule.nodes);
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQWlCLEVBQzNCLElBQUksRUFDSixVQUFVLEVBQ1YsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEdBQ1g7O1FBQ0csSUFBSSxDQUFDLFdBQVcsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ25ELE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNO2lCQUN0QixPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztpQkFDbEIsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7aUJBQ2xCLEtBQUssQ0FBQyxHQUFHLENBQUM7aUJBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUUxQiw4QkFBOEI7WUFDOUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNuQixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUM7Z0JBRXhCLGdCQUFnQjtnQkFDaEIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzVDLFlBQVksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbkM7Z0JBRUQsZUFBZTtnQkFDZixNQUFNLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDLFlBQVksRUFBRSxFQUFFOztvQkFDNUMsTUFBQSxZQUFZLENBQUMsTUFBTSw0REFBSSxDQUFDO2dCQUM1QixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQUEifQ==