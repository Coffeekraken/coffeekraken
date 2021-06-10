import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginSpaceClassesInterface extends __SInterface {
}
postcssSugarPluginSpaceClassesInterface.definition = {};
export { postcssSugarPluginSpaceClassesInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    const vars = [
        '@sugar.space.marginClasses;',
        '@sugar.space.paddingClasses;'
    ];
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFJckQsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZOztBQUN6RCxrREFBVSxHQUFHLEVBQUUsQ0FBQztBQUt6QixPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFaEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhO1FBQ3JCLDZCQUE2QjtRQUM3Qiw4QkFBOEI7S0FDL0IsQ0FBQztJQUVGLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixDQUFDIn0=