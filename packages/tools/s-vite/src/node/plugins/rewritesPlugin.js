export default function rewritesPlugin(rewrites) {
    return {
        name: 'rewritesPlugin',
        transform(src, id) {
            for (let i = 0; i < rewrites.length; i++) {
                const rewriteObj = rewrites[i];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV3cml0ZXNQbHVnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXdyaXRlc1BsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnQ0EsTUFBTSxDQUFDLE9BQU8sVUFBVSxjQUFjLENBQUMsUUFBa0M7SUFDdkUsT0FBTztRQUNMLElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsU0FBUyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3hDLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztvQkFBRSxTQUFTO2dCQUMzQyxPQUFPO29CQUNMLElBQUksRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7b0JBQ2pDLEdBQUcsRUFBRSxJQUFJO2lCQUNWLENBQUM7YUFDSDtZQUVELE9BQU87Z0JBQ0wsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7YUFDVixDQUFDO1FBQ0osQ0FBQztLQUNGLENBQUM7QUFDSixDQUFDIn0=