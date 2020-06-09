
# Function


## ```js diff ```


This function take two objects and return an object that contains only what has been changed between the two.
This function is a simple wrapper around the nice object-diff package from Thomas Jensen that you can find here: https://www.npmjs.com/package/object-diff

## Parameters

- **object1**  Object: The first object used for the diff process

- **object2**  Object: The second object used for the diff process

- **settings** ([object Object]) Object: An object of settings to configure the diff process:
- deep (true) {Boolean}: Specify if you want a deep diff or a simple one level diff
- added (true) {Boolean}: Specify if you want to include the props that does not exist on the object1 but exists on the object2
- deleted (false) {Boolean}: Specify if you want to include the props that exists on the object1 but no more on the object2
- equals (false) {Boolean}: Specify if you want to include the props that are equals from the object1 to the object2
- emptyObject (false) {Boolean}: Specify if you want to keep the empty objects in the resulting one
- updated (true) {Boolean}: Specify if you want to include the updated values


## Example (js)

```js
import diff from '@coffeekraken/sugar/js/object/diff';
const myObject1 = {
   hello: 'world',
   plop: 'yop'
};
const myObject2 = {
   coco: 'plop',
   hello: 'hey!',
   plop: 'yop'
};
diff(myObject1, myObject2);
{
   coco: 'plop',
   hello: 'hey!'
}
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



