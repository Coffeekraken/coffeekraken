export default {
    match: /handlebars\.js/,
    rewrite(src, id) {
        return src.replace('if (global.Symbol && context[global.Symbol.iterator])', 'if (false)');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlYmFycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhhbmRsZWJhcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZUFBZTtJQUNiLEtBQUssRUFBRSxnQkFBZ0I7SUFDdkIsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ2IsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUNoQix1REFBdUQsRUFDdkQsWUFBWSxDQUNiLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQyJ9