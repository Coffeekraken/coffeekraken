import __deepMerge from '../deepMerge';
describe('sugar.shared.object.deepMerge', () => {
    it('Should merge two simple objects correctly', () => {
        const a = {
            myValue: 'Hello',
            sub: {
                myOtherValue: 'plop',
            },
        }, b = {
            something: 'else',
            sub: {
                myOtherValue: 'yop',
                newValue: 'world'
            }
        };
        const applied = __deepMerge(a, b);
        expect(applied).toEqual({
            myValue: 'Hello',
            something: 'else',
            sub: {
                myOtherValue: 'yop',
                newValue: 'world'
            },
        });
    });
    it('Should merge two objects with getter on the first one correctly', () => {
        const a = {
            myValue: 'Hello',
            sub: {
                myOtherValue: 'plop',
                get getter() {
                    return 'yop';
                }
            },
        }, b = {
            something: 'else',
            sub: {
                myOtherValue: 'yop',
                newValue: 'world'
            }
        };
        const applied = __deepMerge(a, b);
        expect(applied).toEqual({
            myValue: 'Hello',
            something: 'else',
            sub: {
                myOtherValue: 'yop',
                newValue: 'world',
                getter: 'yop'
            },
        });
    });
    it('Should merge two objects with getter on the first AND the second one correctly', () => {
        const a = {
            myValue: 'Hello',
            sub: {
                myOtherValue: 'plop',
                get getter() {
                    return 'yop';
                }
            },
        }, b = {
            something: 'else',
            sub: {
                myOtherValue: 'yop',
                newValue: 'world',
                get getter2() {
                    return 'hey';
                }
            }
        };
        const applied = __deepMerge(a, b);
        expect(applied).toEqual({
            myValue: 'Hello',
            something: 'else',
            sub: {
                myOtherValue: 'yop',
                newValue: 'world',
                getter: 'yop',
                getter2: 'hey'
            },
        });
    });
    it('Should merge two objects with getter on the first OVERIDED on the second one correctly', () => {
        const a = {
            myValue: 'Hello',
            sub: {
                myOtherValue: 'plop',
                get getter() {
                    return 'yop';
                }
            },
        }, b = {
            something: 'else',
            sub: {
                myOtherValue: 'yop',
                newValue: 'world',
                get getter() {
                    return 'hey';
                }
            }
        };
        const applied = __deepMerge(a, b);
        expect(applied).toEqual({
            myValue: 'Hello',
            something: 'else',
            sub: {
                myOtherValue: 'yop',
                newValue: 'world',
                getter: 'hey'
            },
        });
    });
    it('Should merge objects with array correctly', () => {
        const a = {
            myValue: 'Hello',
            sub: {
                list: ['something']
            },
        }, b = {
            sub: {
                list: ['else']
            }
        };
        const applied = __deepMerge(a, b, {
            mergeArray: true
        });
        expect(applied).toEqual({
            myValue: 'Hello',
            sub: {
                list: ['something', 'else']
            },
        });
    });
    it('Should merge two objects with getter on the first OVERIDED on the second one AND access the first one value using the "this.$source" keyword correctly', () => {
        const a = {
            myValue: 'Hello',
            sub: {
                myOtherValue: 'plop',
                get getter() {
                    return ['hello'];
                }
            },
        }, b = {
            sub: {
                get getter() {
                    var _a;
                    return [...(((_a = this.$source) === null || _a === void 0 ? void 0 : _a.getter) || []), 'world'];
                }
            }
        };
        const applied = __deepMerge(a, b, {
            mergeGetterSource: true
        });
        expect(applied).toEqual({
            myValue: 'Hello',
            sub: {
                myOtherValue: 'plop',
                getter: ['hello', 'world']
            },
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLGNBQWMsQ0FBQztBQUV2QyxRQUFRLENBQUMsK0JBQStCLEVBQUUsR0FBRyxFQUFFO0lBQzNDLEVBQUUsQ0FBQywyQ0FBMkMsRUFBRSxHQUFHLEVBQUU7UUFFakQsTUFBTSxDQUFDLEdBQUc7WUFDTixPQUFPLEVBQUUsT0FBTztZQUNoQixHQUFHLEVBQUU7Z0JBQ0QsWUFBWSxFQUFFLE1BQU07YUFDdkI7U0FDSixFQUFFLENBQUMsR0FBRztZQUNILFNBQVMsRUFBRSxNQUFNO1lBQ2pCLEdBQUcsRUFBRTtnQkFDRCxZQUFZLEVBQUUsS0FBSztnQkFDbkIsUUFBUSxFQUFFLE9BQU87YUFDcEI7U0FDSixDQUFDO1FBR0YsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVsQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3BCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFNBQVMsRUFBRSxNQUFNO1lBQ2pCLEdBQUcsRUFBRTtnQkFDRCxZQUFZLEVBQUUsS0FBSztnQkFDbkIsUUFBUSxFQUFFLE9BQU87YUFDcEI7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxpRUFBaUUsRUFBRSxHQUFHLEVBQUU7UUFFdkUsTUFBTSxDQUFDLEdBQUc7WUFDTixPQUFPLEVBQUUsT0FBTztZQUNoQixHQUFHLEVBQUU7Z0JBQ0QsWUFBWSxFQUFFLE1BQU07Z0JBQ3BCLElBQUksTUFBTTtvQkFDTixPQUFPLEtBQUssQ0FBQztnQkFDakIsQ0FBQzthQUNKO1NBQ0osRUFBRSxDQUFDLEdBQUc7WUFDSCxTQUFTLEVBQUUsTUFBTTtZQUNqQixHQUFHLEVBQUU7Z0JBQ0QsWUFBWSxFQUFFLEtBQUs7Z0JBQ25CLFFBQVEsRUFBRSxPQUFPO2FBQ3BCO1NBQ0osQ0FBQztRQUVGLE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFbEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNwQixPQUFPLEVBQUUsT0FBTztZQUNoQixTQUFTLEVBQUUsTUFBTTtZQUNqQixHQUFHLEVBQUU7Z0JBQ0QsWUFBWSxFQUFFLEtBQUs7Z0JBQ25CLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixNQUFNLEVBQUUsS0FBSzthQUNoQjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGdGQUFnRixFQUFFLEdBQUcsRUFBRTtRQUV0RixNQUFNLENBQUMsR0FBRztZQUNOLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLEdBQUcsRUFBRTtnQkFDRCxZQUFZLEVBQUUsTUFBTTtnQkFDcEIsSUFBSSxNQUFNO29CQUNOLE9BQU8sS0FBSyxDQUFDO2dCQUNqQixDQUFDO2FBQ0o7U0FDSixFQUFFLENBQUMsR0FBRztZQUNILFNBQVMsRUFBRSxNQUFNO1lBQ2pCLEdBQUcsRUFBRTtnQkFDRCxZQUFZLEVBQUUsS0FBSztnQkFDbkIsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLElBQUksT0FBTztvQkFDUCxPQUFPLEtBQUssQ0FBQztnQkFDakIsQ0FBQzthQUNKO1NBQ0osQ0FBQztRQUVGLE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFbEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNwQixPQUFPLEVBQUUsT0FBTztZQUNoQixTQUFTLEVBQUUsTUFBTTtZQUNqQixHQUFHLEVBQUU7Z0JBQ0QsWUFBWSxFQUFFLEtBQUs7Z0JBQ25CLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixNQUFNLEVBQUUsS0FBSztnQkFDYixPQUFPLEVBQUUsS0FBSzthQUNqQjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHdGQUF3RixFQUFFLEdBQUcsRUFBRTtRQUU5RixNQUFNLENBQUMsR0FBRztZQUNOLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLEdBQUcsRUFBRTtnQkFDRCxZQUFZLEVBQUUsTUFBTTtnQkFDcEIsSUFBSSxNQUFNO29CQUNOLE9BQU8sS0FBSyxDQUFDO2dCQUNqQixDQUFDO2FBQ0o7U0FDSixFQUFFLENBQUMsR0FBRztZQUNILFNBQVMsRUFBRSxNQUFNO1lBQ2pCLEdBQUcsRUFBRTtnQkFDRCxZQUFZLEVBQUUsS0FBSztnQkFDbkIsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLElBQUksTUFBTTtvQkFDTixPQUFPLEtBQUssQ0FBQztnQkFDakIsQ0FBQzthQUNKO1NBQ0osQ0FBQztRQUVGLE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFbEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNwQixPQUFPLEVBQUUsT0FBTztZQUNoQixTQUFTLEVBQUUsTUFBTTtZQUNqQixHQUFHLEVBQUU7Z0JBQ0QsWUFBWSxFQUFFLEtBQUs7Z0JBQ25CLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixNQUFNLEVBQUUsS0FBSzthQUNoQjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDJDQUEyQyxFQUFFLEdBQUcsRUFBRTtRQUVqRCxNQUFNLENBQUMsR0FBRztZQUNOLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLEdBQUcsRUFBRTtnQkFDRCxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUM7YUFDdEI7U0FDSixFQUFFLENBQUMsR0FBRztZQUNILEdBQUcsRUFBRTtnQkFDRCxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7YUFDakI7U0FDSixDQUFDO1FBRUYsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDOUIsVUFBVSxFQUFFLElBQUk7U0FDbkIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNwQixPQUFPLEVBQUUsT0FBTztZQUNoQixHQUFHLEVBQUU7Z0JBQ0QsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQzthQUM5QjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHdKQUF3SixFQUFFLEdBQUcsRUFBRTtRQUU5SixNQUFNLENBQUMsR0FBRztZQUNOLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLEdBQUcsRUFBRTtnQkFDRCxZQUFZLEVBQUUsTUFBTTtnQkFDcEIsSUFBSSxNQUFNO29CQUNOLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDckIsQ0FBQzthQUNKO1NBQ0osRUFBRSxDQUFDLEdBQUc7WUFDSCxHQUFHLEVBQUU7Z0JBQ0QsSUFBSSxNQUFNOztvQkFDTixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUEsTUFBQSxJQUFJLENBQUMsT0FBTywwQ0FBRSxNQUFNLEtBQUksRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ3RELENBQUM7YUFDSjtTQUNKLENBQUM7UUFFRixNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUM5QixpQkFBaUIsRUFBRSxJQUFJO1NBQzFCLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDcEIsT0FBTyxFQUFFLE9BQU87WUFDaEIsR0FBRyxFQUFFO2dCQUNELFlBQVksRUFBRSxNQUFNO2dCQUNwQixNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO2FBQzdCO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFFUCxDQUFDLENBQUMsQ0FBQyJ9