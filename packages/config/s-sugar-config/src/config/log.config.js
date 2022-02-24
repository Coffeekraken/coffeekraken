// TODO: doc
export default function (env, config) {
    if (env.platform !== 'node')
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvZy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWTtBQUlaLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRyxFQUFFLE1BQU07SUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXBDLE9BQU87UUFDSDs7Ozs7Ozs7Ozs7Ozs7OztXQWdCRztRQUNILEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDO0tBQ3RDLENBQUM7QUFDTixDQUFDIn0=