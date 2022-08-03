"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (__SConfig, __SConfigFsAdapter) => {
    const config = new __SConfig('myCoolConfig', {
        adapters: [
            new __SConfigFsAdapter({
                name: 'something',
                defaultConfigPath: __dirname + '/default.[filename]',
                appConfigPath: __dirname + '/app.[filename]',
                userConfigPath: __dirname + '/user.[filename]',
            }),
        ],
        allowNew: true,
    });
    describe('sugar.node.config.adapters.SConfigFsAdapter', () => {
        it('Should load, set, save and get correctly the config from the filesystem', () => __awaiter(void 0, void 0, void 0, function* () {
            expect(config.get('')).toEqual({
                hello: 'world',
                other: {
                    cool: 'Yop yop Nelson',
                },
                something: {
                    cool: 'Hello world',
                },
            });
            yield config.set('something.cool', 'Hello world');
            yield config.set('other.cool', 'Yop yop Nelson');
            expect(config.get('something')).toEqual({ cool: 'Hello world' });
        }));
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsa0JBQWUsQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsRUFBRTtJQUM3QyxNQUFNLE1BQU0sR0FBRyxJQUFJLFNBQVMsQ0FBQyxjQUFjLEVBQUU7UUFDekMsUUFBUSxFQUFFO1lBQ04sSUFBSSxrQkFBa0IsQ0FBQztnQkFDbkIsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLGlCQUFpQixFQUFFLFNBQVMsR0FBRyxxQkFBcUI7Z0JBQ3BELGFBQWEsRUFBRSxTQUFTLEdBQUcsaUJBQWlCO2dCQUM1QyxjQUFjLEVBQUUsU0FBUyxHQUFHLGtCQUFrQjthQUNqRCxDQUFDO1NBQ0w7UUFDRCxRQUFRLEVBQUUsSUFBSTtLQUNqQixDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsNkNBQTZDLEVBQUUsR0FBRyxFQUFFO1FBQ3pELEVBQUUsQ0FBQyx5RUFBeUUsRUFBRSxHQUFTLEVBQUU7WUFDckYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQzNCLEtBQUssRUFBRSxPQUFPO2dCQUNkLEtBQUssRUFBRTtvQkFDSCxJQUFJLEVBQUUsZ0JBQWdCO2lCQUN6QjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLGFBQWE7aUJBQ3RCO2FBQ0osQ0FBQyxDQUFDO1lBRUgsTUFBTSxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBRWxELE1BQU0sTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztZQUVqRCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyJ9