import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
class SSVelteComponent extends __SClass {
    constructor(params, settings) {
        super(__deepMerge({
            svelteComponent: {}
        }, settings || {}));
        // @ts-ignore
        if (this.constructor.interface) {
            // @ts-ignore
            const paramsInterfaceResult = this.constructor.interface.apply(params !== null && params !== void 0 ? params : {});
            if (paramsInterfaceResult.hasIssues()) {
                throw new Error(paramsInterfaceResult.toString());
            }
            else {
                // this.props = paramsInterfaceResult.value;
            }
        }
    }
}
export default SSVelteComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdmVsdGVDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFTdEUsTUFBTSxnQkFBaUIsU0FBUSxRQUFRO0lBQ3JDLFlBQVksTUFBVyxFQUFFLFFBQWlEO1FBQ3hFLEtBQUssQ0FDSCxXQUFXLENBQ1Q7WUFDRSxlQUFlLEVBQUUsRUFBRTtTQUNwQixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBQ0YsYUFBYTtRQUNiLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUU7WUFDOUIsYUFBYTtZQUNiLE1BQU0scUJBQXFCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUM1RCxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQ2IsQ0FBQztZQUNGLElBQUkscUJBQXFCLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQ3JDLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzthQUNuRDtpQkFBTTtnQkFDTCw0Q0FBNEM7YUFDN0M7U0FDRjtJQUNILENBQUM7Q0FDRjtBQUVELGVBQWUsZ0JBQWdCLENBQUMifQ==