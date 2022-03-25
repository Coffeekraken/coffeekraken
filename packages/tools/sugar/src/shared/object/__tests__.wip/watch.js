var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
import { fileURLToPath } from "url";
import path from "path";
var getFilename, getDirname, __dirname, __filename;
var init_esm_shims = __esm({
  "node_modules/tsup/assets/esm_shims.js"() {
    getFilename = () => fileURLToPath(import.meta.url);
    getDirname = () => path.dirname(getFilename());
    __dirname = /* @__PURE__ */ getDirname();
    __filename = /* @__PURE__ */ getFilename();
  }
});
var require_watch = __commonJS({
  "packages/tools/sugar/src/shared/object/__tests__.wip/watch.ts"(exports, module) {
    init_esm_shims();
    module.exports = (__watch) => {
      let obj = {
        a: "hello",
        b: {
          bb: "world"
        },
        glob: {
          something: {
            cool: "Hello",
            other: "Yop"
          }
        },
        c: {
          cc: {
            ccc: ["hello", "world"]
          }
        }
      };
      let doneAssign, doneUpdating, doneUpdatingDeep, doneDeleting, doneAddIntoArray, doneGlobAction, doneGlobPattern;
      let hasUnwatchedObjectBeenWatched = false;
      const watchedObj = __watch(obj);
      watchedObj.on("coco:set", (update) => {
        doneAssign();
      });
      watchedObj.on("a:*", (update) => {
        if (watchedObj.a === "bonjours")
          doneUpdating();
      });
      watchedObj.on("b.bb:*", (update) => {
        if (watchedObj.b.bb === "hola")
          doneUpdatingDeep();
      });
      watchedObj.on("*:delete", (update) => {
        if (!update.target)
          doneDeleting();
      });
      watchedObj.on("*.cool:set", (update) => {
        doneGlobPattern();
      });
      watchedObj.on("*.other:set", (update) => {
        doneGlobAction();
      });
      watchedObj.on("*:push", (update) => {
        expect(watchedObj.c.cc.ccc).toEqual(["hello", "world", "plop"]);
        doneAddIntoArray();
      });
      watchedObj.on("b.plop:*", (update) => {
        if (watchedObj.b.plop === "yop") {
          hasUnwatchedObjectBeenWatched = true;
        }
      });
      test("Assign a new value", (done) => {
        doneAssign = done;
        watchedObj.coco = "plop";
      });
      test("Update an existing value", (done) => {
        doneUpdating = done;
        watchedObj.a = "bonjours";
      });
      test("Update an existing deep value", (done) => {
        doneUpdatingDeep = done;
        watchedObj.b.bb = "hola";
      });
      test("Deleting a deep value", (done) => {
        doneDeleting = done;
        delete watchedObj.b.bb;
      });
      test("Adding a value into an array using push", (done) => {
        doneAddIntoArray = done;
        watchedObj.c.cc.ccc.push("plop");
      });
      test("Adding a value to a deep variable to trigger the corresponding glob", (done) => {
        doneGlobPattern = done;
        watchedObj.glob.something.cool = "hola";
      });
      test("Adding a value to a deep variable to trigger the corresponding glob action", (done) => {
        doneGlobAction = done;
        watchedObj.glob.something.other = "plop";
      });
      test("Unwatch the watchedObject", (done) => {
        const obj2 = watchedObj.unwatch();
        obj2.b.plop = "yop";
        setTimeout(() => {
          expect(hasUnwatchedObjectBeenWatched).toBe(false);
          done();
        });
      });
    };
  }
});
export default require_watch();
