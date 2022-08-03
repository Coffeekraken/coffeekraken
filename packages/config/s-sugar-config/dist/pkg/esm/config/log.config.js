// TODO: doc
export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name        types
         * @namespace     config.log
         * @type        String[]
         * @values      false,info,warning,error,verbose
         * @default      ['info','warning','error']
         *
         * Set the log types you want for your app.
         * - false: No log at all
         * - info: Default logs
         * - warning: Display the warnings
         * - error: Display the errors
         * - verbose: Detailed logs
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        types: ['info', 'warning', 'error'],
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVk7QUFFWixNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7V0FnQkc7UUFDSCxLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQztLQUN0QyxDQUFDO0FBQ04sQ0FBQyJ9