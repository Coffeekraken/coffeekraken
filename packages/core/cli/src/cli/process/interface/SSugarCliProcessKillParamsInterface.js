import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SSugarCliProcessKillParamsInterface
 * @namespace           cli.process.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the `sugar process.kill` command
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SSugarCliProcessKillParamsInterface extends __SInterface {
    static get _definition() {
        return {
            id: {
                description: 'Specify the process id you want to kill',
                type: 'Number',
                alias: 'i',
            },
            port: {
                description: 'Specify the port on which the process you want to kill is binded',
                type: 'Number',
                alias: 'p',
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQ2xpUHJvY2Vzc0tpbGxQYXJhbXNJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTU3VnYXJDbGlQcm9jZXNzS2lsbFBhcmFtc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLG1DQUFvQyxTQUFRLFlBQVk7SUFDekUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEVBQUUsRUFBRTtnQkFDQSxXQUFXLEVBQUUseUNBQXlDO2dCQUN0RCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCxrRUFBa0U7Z0JBQ3RFLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=