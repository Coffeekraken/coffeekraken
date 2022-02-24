<!--
/**
 * @name            Writing documentation
 * @namespace       doc.docmap
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Docmap           /doc/docmap/writing-documentation
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# Writing documentation

To write your documentation as best as possible, you can use pretty much all the docblock tags that you want.

However, to generate the docmap, we only take these specifics tags:

-   `name`: The name of your function/class/etc...
-   `namespace`: A namespace under which to store this doc element in the docmap **!important**
-   `type`: The type of what you are documenting like "function", "class", "string", etc...
-   `menu`: A special tag to create menus inside the docmap. This is documented in [this documentation](/doc/docmap/menu)
-   `default`: The default value of what you are documenting like "true", "something", etc...
-   `platform`: The platform on which your item will run like "node", "browser", "php", etc...
-   `description`: The description of your item
-   `status`: The status of your item like "alpha", "beta", "stable", etc...
-   `example`: An example of how to use your item
-   `interface`: A relative path of where to find the associated SInterface interface definition file.
-   `async`: Define if your item is async or not
-   `static`: Define if your item is static of not
-   `since`: Define from when this item is available like "2.0.2", "1.2.3", etc...
-   `author`: Define which if the author of this item

These tags are the one that will be written in the docmap. This does not mean that you cannot use other tags inside your docblocks. They just wont be listed inside the docmap.

> To add some tags inside your docmap, simply add id to the configuration array under the `config.docmap.build.tags` namespace.

## Example

Here's a real life example to illustrate how to write nice documentation.

This example is the documentation of the `querySelectorLive` DOM function

```js
/**
 * @name            querySelectorLive
 * @namespace       js.dom.query
 * @type            Function
 * @platform        js
 * @status          beta
 *
 * Observe the dom to get all the elements that matches a passed css selector at any point in time.
 * Be warned that this use the mutation observer API and will monitor all the document for new nodes. Make sure to use it
 * when you don't have the chance to use the custom elements API instead
 *
 * @feature         Specify what you want to select and get notified each time a node like this appears in the dom
 * @feature         Promise based API
 * @feature         Callback support
 * @feature         Monitor added nodes and existing nodes that have class and id attributes updated
 *
 * @param	    {String} 		selector 		The css selector that we are interested in
 * @param 	    {Function} 		cb 				The function to call with the newly added node
 * @param 	    {Object} 		[settings={}] 	An optional settings object to specify things like the rootNode to monitor, etc...
 * @return      {SPromise<HTMLElement>}         An SPromise instance on which to listen for nodes using the "node" event
 *
 * @example 	js
 * import querySelectorLive from '@coffeekraken/sugar/js/dom/querySelectorLive'
 * querySelectorLive('.my-cool-item', (node, clearFn) => {
 * 	    // do something here with the detected node
 *      // call clearFn if you want to stop listening for this selector
 *      clearFn();
 * });
 *
 * @since       1.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
```

{{/layout-doc }}
