"use strict";
module.exports = (__parseArgs) => {
    describe('sugar.js.cli.parseArgs', () => {
        it('Should process the passed string correctly', (done) => {
            const args = __parseArgs('-n "node" -i "/Users/olivierbossel/Home/web/coffeekraken/coffeekraken/toolkits/sugar/src/node/**/!(__tests__)/!(*.test).js" -c "jest %testfile %arguments"', {
                definition: {
                    name: {
                        type: 'String',
                        description: 'wifj oiefj owiej foiwej foj woiefj wioj efoiwej foijwe oifjew',
                        alias: 'n',
                        required: false
                    },
                    input: {
                        type: 'String',
                        description: 'wifj oiefj owiej foiwej foj woiefj wioj efoiwej foijwe oifjew',
                        alias: 'i',
                        required: false
                    },
                    command: {
                        type: 'String',
                        description: 'wifj oiefj owiej foiwej foj woiefj wioj efoiwej foijwe oifjew',
                        alias: 'c',
                        required: false
                    }
                }
            });
            expect(args).toEqual({
                command: 'jest %testfile %arguments',
                input: '/Users/olivierbossel/Home/web/coffeekraken/coffeekraken/toolkits/sugar/src/node/**/!(__tests__)/!(*.test).js',
                name: 'node'
            });
            done();
        });
        it('Should process the passed string correctly', (done) => {
            const args = __parseArgs('hello -i #blop -w 10 yop "hello world" -b --hello.world Nelson --help "coco yep"', {
                definition: {
                    action: {
                        type: 'String',
                        description: 'Something',
                        alias: 'a',
                        default: 'Hello World',
                        required: true
                    },
                    id: {
                        type: 'String',
                        description: 'Something',
                        alias: 'i',
                        regexp: /^#([\S]+)$/,
                        required: true
                    },
                    hehe: {
                        type: 'String',
                        description: 'Something',
                        default: 'Nelson the cat',
                        required: true
                    },
                    bool: {
                        type: 'Boolean',
                        description: 'Something',
                        alias: 'b',
                        default: false
                    },
                    'hello.world': {
                        type: 'String',
                        description: 'Something',
                        default: 'plop world',
                        required: true
                    },
                    world: {
                        type: 'Array<String|Number>',
                        description: 'Something',
                        alias: 'w',
                        validator: (value) => {
                            return (Array.isArray(value) ||
                                typeof value === 'number' ||
                                typeof value === 'string');
                        }
                    },
                    yop: {
                        type: 'String',
                        description: 'Something',
                        alias: 'y'
                    },
                    help: {
                        type: 'String',
                        description: 'Something',
                        alias: 'h'
                    }
                },
                defaultObj: {
                    yop: 'Hello world'
                }
            });
            expect(args).toEqual({
                world: [10, 'yop', 'hello world'],
                bool: true,
                hello: { world: 'Nelson' },
                help: 'coco yep',
                action: 'hello',
                hehe: 'Nelson the cat',
                id: '#blop',
                yop: 'Hello world'
            });
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUU7SUFDL0IsUUFBUSxDQUFDLHdCQUF3QixFQUFFLEdBQUcsRUFBRTtRQUN0QyxFQUFFLENBQUMsNENBQTRDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN4RCxNQUFNLElBQUksR0FBRyxXQUFXLENBQ3RCLDRKQUE0SixFQUM1SjtnQkFDRSxVQUFVLEVBQUU7b0JBQ1YsSUFBSSxFQUFFO3dCQUNKLElBQUksRUFBRSxRQUFRO3dCQUNkLFdBQVcsRUFDVCwrREFBK0Q7d0JBQ2pFLEtBQUssRUFBRSxHQUFHO3dCQUNWLFFBQVEsRUFBRSxLQUFLO3FCQUNoQjtvQkFDRCxLQUFLLEVBQUU7d0JBQ0wsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsV0FBVyxFQUNULCtEQUErRDt3QkFDakUsS0FBSyxFQUFFLEdBQUc7d0JBQ1YsUUFBUSxFQUFFLEtBQUs7cUJBQ2hCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxJQUFJLEVBQUUsUUFBUTt3QkFDZCxXQUFXLEVBQ1QsK0RBQStEO3dCQUNqRSxLQUFLLEVBQUUsR0FBRzt3QkFDVixRQUFRLEVBQUUsS0FBSztxQkFDaEI7aUJBQ0Y7YUFDRixDQUNGLENBQUM7WUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUNuQixPQUFPLEVBQUUsMkJBQTJCO2dCQUNwQyxLQUFLLEVBQ0gsOEdBQThHO2dCQUNoSCxJQUFJLEVBQUUsTUFBTTthQUNiLENBQUMsQ0FBQztZQUVILElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsNENBQTRDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN4RCxNQUFNLElBQUksR0FBRyxXQUFXLENBQ3RCLGtGQUFrRixFQUNsRjtnQkFDRSxVQUFVLEVBQUU7b0JBQ1YsTUFBTSxFQUFFO3dCQUNOLElBQUksRUFBRSxRQUFRO3dCQUNkLFdBQVcsRUFBRSxXQUFXO3dCQUN4QixLQUFLLEVBQUUsR0FBRzt3QkFDVixPQUFPLEVBQUUsYUFBYTt3QkFDdEIsUUFBUSxFQUFFLElBQUk7cUJBQ2Y7b0JBQ0QsRUFBRSxFQUFFO3dCQUNGLElBQUksRUFBRSxRQUFRO3dCQUNkLFdBQVcsRUFBRSxXQUFXO3dCQUN4QixLQUFLLEVBQUUsR0FBRzt3QkFDVixNQUFNLEVBQUUsWUFBWTt3QkFDcEIsUUFBUSxFQUFFLElBQUk7cUJBQ2Y7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLElBQUksRUFBRSxRQUFRO3dCQUNkLFdBQVcsRUFBRSxXQUFXO3dCQUN4QixPQUFPLEVBQUUsZ0JBQWdCO3dCQUN6QixRQUFRLEVBQUUsSUFBSTtxQkFDZjtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osSUFBSSxFQUFFLFNBQVM7d0JBQ2YsV0FBVyxFQUFFLFdBQVc7d0JBQ3hCLEtBQUssRUFBRSxHQUFHO3dCQUNWLE9BQU8sRUFBRSxLQUFLO3FCQUNmO29CQUNELGFBQWEsRUFBRTt3QkFDYixJQUFJLEVBQUUsUUFBUTt3QkFDZCxXQUFXLEVBQUUsV0FBVzt3QkFDeEIsT0FBTyxFQUFFLFlBQVk7d0JBQ3JCLFFBQVEsRUFBRSxJQUFJO3FCQUNmO29CQUNELEtBQUssRUFBRTt3QkFDTCxJQUFJLEVBQUUsc0JBQXNCO3dCQUM1QixXQUFXLEVBQUUsV0FBVzt3QkFDeEIsS0FBSyxFQUFFLEdBQUc7d0JBQ1YsU0FBUyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7NEJBQ25CLE9BQU8sQ0FDTCxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztnQ0FDcEIsT0FBTyxLQUFLLEtBQUssUUFBUTtnQ0FDekIsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUMxQixDQUFDO3dCQUNKLENBQUM7cUJBQ0Y7b0JBQ0QsR0FBRyxFQUFFO3dCQUNILElBQUksRUFBRSxRQUFRO3dCQUNkLFdBQVcsRUFBRSxXQUFXO3dCQUN4QixLQUFLLEVBQUUsR0FBRztxQkFDWDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osSUFBSSxFQUFFLFFBQVE7d0JBQ2QsV0FBVyxFQUFFLFdBQVc7d0JBQ3hCLEtBQUssRUFBRSxHQUFHO3FCQUNYO2lCQUNGO2dCQUNELFVBQVUsRUFBRTtvQkFDVixHQUFHLEVBQUUsYUFBYTtpQkFDbkI7YUFDRixDQUNGLENBQUM7WUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUNuQixLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLGFBQWEsQ0FBQztnQkFDakMsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTtnQkFDMUIsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxPQUFPO2dCQUNmLElBQUksRUFBRSxnQkFBZ0I7Z0JBQ3RCLEVBQUUsRUFBRSxPQUFPO2dCQUNYLEdBQUcsRUFBRSxhQUFhO2FBQ25CLENBQUMsQ0FBQztZQUVILElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9