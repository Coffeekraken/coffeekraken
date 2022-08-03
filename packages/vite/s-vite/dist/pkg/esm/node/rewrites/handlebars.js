export default {
    match: /handlebars\.js/,
    rewrite(src, id) {
        return src.replace('if (global.Symbol && context[global.Symbol.iterator])', 'if (false)');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGVBQWU7SUFDYixLQUFLLEVBQUUsZ0JBQWdCO0lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNiLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FDaEIsdURBQXVELEVBQ3ZELFlBQVksQ0FDYixDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUMifQ==