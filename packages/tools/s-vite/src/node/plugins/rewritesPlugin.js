export default function rewritesPlugin(rewrites) {
    return {
        name: 'rewrites-plugin',
        transform(src, id) {
            var _a;
            for (let i = 0; i < rewrites.length; i++) {
                let rewriteObj = rewrites[i];
                // resolve pathes
                if (typeof rewriteObj === 'string') {
                    const re = require(rewriteObj);
                    rewriteObj = (_a = re.default) !== null && _a !== void 0 ? _a : re;
                }
                if (!src.match(rewriteObj.match))
                    continue;
                return {
                    code: rewriteObj.rewrite(src, id),
                    map: null
                };
            }
            return {
                code: src,
                map: null
            };
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV3cml0ZXNQbHVnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXdyaXRlc1BsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnQ0EsTUFBTSxDQUFDLE9BQU8sVUFBVSxjQUFjLENBQUMsUUFBa0M7SUFDdkUsT0FBTztRQUNMLElBQUksRUFBRSxpQkFBaUI7UUFDdkIsU0FBUyxDQUFDLEdBQUcsRUFBRSxFQUFFOztZQUNmLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN4QyxJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTdCLGlCQUFpQjtnQkFDakIsSUFBSSxPQUFPLFVBQVUsS0FBSyxRQUFRLEVBQUU7b0JBQ2xDLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDL0IsVUFBVSxHQUFHLE1BQUEsRUFBRSxDQUFDLE9BQU8sbUNBQUksRUFBRSxDQUFDO2lCQUMvQjtnQkFFRCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO29CQUFFLFNBQVM7Z0JBQzNDLE9BQU87b0JBQ0wsSUFBSSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztvQkFDakMsR0FBRyxFQUFFLElBQUk7aUJBQ1YsQ0FBQzthQUNIO1lBRUQsT0FBTztnQkFDTCxJQUFJLEVBQUUsR0FBRztnQkFDVCxHQUFHLEVBQUUsSUFBSTthQUNWLENBQUM7UUFDSixDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUMifQ==