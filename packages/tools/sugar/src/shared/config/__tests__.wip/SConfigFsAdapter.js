var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = (__SConfig, __SConfigFsAdapter) => {
        const config = new __SConfig('myCoolConfig', {
            adapters: [
                new __SConfigFsAdapter({
                    name: 'something',
                    defaultConfigPath: __dirname + '/default.[filename]',
                    appConfigPath: __dirname + '/app.[filename]',
                    userConfigPath: __dirname + '/user.[filename]'
                })
            ],
            allowNew: true
        });
        describe('sugar.node.config.adapters.SConfigFsAdapter', () => {
            it('Should load, set, save and get correctly the config from the filesystem', (done) => __awaiter(void 0, void 0, void 0, function* () {
                expect(config.get('')).toEqual({
                    hello: 'world',
                    other: {
                        cool: 'Yop yop Nelson'
                    },
                    something: {
                        cool: 'Hello world'
                    }
                });
                yield config.set('something.cool', 'Hello world');
                yield config.set('other.cool', 'Yop yop Nelson');
                expect(config.get('something')).toEqual({ cool: 'Hello world' });
                done();
            }));
        });
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0ZzQWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDb25maWdGc0FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSxrQkFBZSxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxFQUFFO1FBQy9DLE1BQU0sTUFBTSxHQUFHLElBQUksU0FBUyxDQUFDLGNBQWMsRUFBRTtZQUMzQyxRQUFRLEVBQUU7Z0JBQ1IsSUFBSSxrQkFBa0IsQ0FBQztvQkFDckIsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLGlCQUFpQixFQUFFLFNBQVMsR0FBRyxxQkFBcUI7b0JBQ3BELGFBQWEsRUFBRSxTQUFTLEdBQUcsaUJBQWlCO29CQUM1QyxjQUFjLEVBQUUsU0FBUyxHQUFHLGtCQUFrQjtpQkFDL0MsQ0FBQzthQUNIO1lBQ0QsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsNkNBQTZDLEVBQUUsR0FBRyxFQUFFO1lBQzNELEVBQUUsQ0FBQyx5RUFBeUUsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFO2dCQUMzRixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztvQkFDN0IsS0FBSyxFQUFFLE9BQU87b0JBQ2QsS0FBSyxFQUFFO3dCQUNMLElBQUksRUFBRSxnQkFBZ0I7cUJBQ3ZCO29CQUNELFNBQVMsRUFBRTt3QkFDVCxJQUFJLEVBQUUsYUFBYTtxQkFDcEI7aUJBQ0YsQ0FBQyxDQUFDO2dCQUVILE1BQU0sTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxhQUFhLENBQUMsQ0FBQztnQkFFbEQsTUFBTSxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUVqRCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO2dCQUVqRSxJQUFJLEVBQUUsQ0FBQztZQUNULENBQUMsQ0FBQSxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyJ9