"use strict";
module.exports = function (__toHtml) {
    describe('sugar.js.convert.toHtml', function () {
        //     it('Should take a markdown inputString and convert it correctly to HTML', () => {
        //       const inputString = `
        // # Hello world
        // ## h2
        // ### h3
        // #### h4
        // ##### h5
        // ###### h6
        // how are **you** here's some __bold__ items
        // this is some *italic* and _italic_ items
        // - list #1
        //   - Nested item
        // - list #2
        // 1. ordered list
        // 2. item #2
        //   1. Nested item
        // This is a \`\`code\`\` item
        // > This is a blockquote
        // >
        // > With multiple paragraphs
        // ![Tux, the Linux mascot](/assets/images/tux.png)
        //         This is some code...
        // This is a sentence with a link [Duck Duck Go](https://duckduckgo.com)
        // `;
        //       expect(__toHtml(inputString).replace(/\s/g, '')).toBe(
        //         '<h1id="hello-world">Helloworld</h1><h2id="h2">h2</h2><h3id="h3">h3</h3><h4id="h4">h4</h4><h5id="h5">h5</h5><h6id="h6">h6</h6><p>howare<strong>you</strong>here&#39;ssome<strong>bold</strong>itemsthisissome<em>italic</em>and<em>italic</em>items</p><ul><li>list#1<ul><li>Nesteditem</li></ul></li><li>list#2</li></ul><ol><li>orderedlist</li><li>item#2<ol><li>Nesteditem</li></ol></li></ol><p>Thisisa<code>code</code>item</p><blockquote><p>Thisisablockquote</p><p>Withmultipleparagraphs</p></blockquote><p><imgsrc="/assets/images/tux.png"alt="Tux,theLinuxmascot"></p><pre><code>Thisissomecode...</code></pre><p>Thisisasentencewithalink<ahref="https://duckduckgo.com">DuckDuckGo</a></p>'
        //       );
        //     });
        it('Should take a docblock inputString and convert it correctly to HTML', function () {
            var inputString = "\n      /**\n       * @name                  DockblockParser\n       * @namespace           js.docblock\n       * @type                  Class\n       *\n       * This is the main class that expose the methods like \"parse\", etc...\n       * You have to instanciate it by passing a settings object. Here's the available options:\n       *\n       * @example         js\n       * import SDocblockParser from '@coffeekraken/sugar/js/docblock/SSDocblockParser';\n       * new SDocblockParser({\n       *    // override some settings here...\n       * }).parse(myString);\n       *\n       * @since     2.0.0\n       * @author \tOlivier Bossel <olivier.bossel@gmail.com>\n       */\n\n      /**\n       * @name        debounce\n       * @namespace           js.function\n       * @type      Function\n       *\n       * This utils function allows you to make sure that a function that will normally be called\n       * several times, for example during a scroll event, to be called only once after\n       * the delay passed\n       *\n       * @example \t\tjs\n       * import debounce from '@coffeekraken/sugar/js/function/debounce';\n       * const myDebouncedFn = debounce(() => {\n       * \t\t// my function content that will be\n       * \t\t// executed only once after the 1 second delay\n       * }, 1000);\n       *\n       * document.addEventListener('scroll', (e) => {\n       * \t\t// call my debounced function\n       * \t\tmyDebouncedFn();\n       * });\n       *\n       * @author \t        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n       */\n\n      /**\n       * @name          definition\n       * @type          Object\n       * @get\n       * @static\n       *\n       * Store the definition object\n       *\n       * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n       */\n\n      /**\n       * @name        includes\n       * @namespace           js.string\n       * @type      Function\n       *\n       * Same as the native String.includes function but accept either an array of items\n       * or a simple comma separated string like \"something,cool,hello,world\"\n       *\n       * @param    {String}    string    The string to check\n       * @param     {Array|String}    values      An array or comma separated string to check\n       * @return    {Boolean|Array}     An array of values that exists in the string or false if nothing match\n       *\n       * @example    js\n       * import includes from '@coffeekraken/sugar/js/string/includes'\n       * includes('Hello world', 'world,coco') // ['world']\n       *\n       * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n       */\n";
            expect(__toHtml(inputString).replace(/\s/g, '')).toBe('<!--@namespacejs.docblock--><!--@nameDockblockParser--><h1id="js-dockblockparser"><code>jsDockblockParser</code></h1><h3id="since-200">Since:2.0.0</h3><p>Thisisthemainclassthatexposethemethodslike&quot;parse&quot;,etc...Youhavetoinstanciateitbypassingasettingsobject.Here&#39;stheavailableoptions:</p><h2id="example-js">Example(js)</h2><pre><codeclass="language-js">importSDocblockParserfrom&#39;@coffeekraken/sugar/js/docblock/SSDocblockParser&#39;;newSDocblockParser({//overridesomesettingshere...}).parse(myString);</code></pre><h3id="author">Author</h3><ul><li><strong>OlivierBossel</strong><ahref="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a></li></ul><h2id="methods">Methods</h2><!--@namespacejs.function--><!--@namedebounce--><h1id="js-debounce"><code>jsdebounce</code></h1><p>Thisutilsfunctionallowsyoutomakesurethatafunctionthatwillnormallybecalledseveraltimes,forexampleduringascrollevent,tobecalledonlyonceafterthedelaypassed</p><h2id="example-js-1">Example(js)</h2><pre><codeclass="language-js">importdebouncefrom&#39;@coffeekraken/sugar/js/function/debounce&#39;;constmyDebouncedFn=debounce(()=&gt;{//myfunctioncontentthatwillbe//executedonlyonceafterthe1seconddelay},1000);document.addEventListener(&#39;scroll&#39;,(e)=&gt;{//callmydebouncedfunctionmyDebouncedFn();});</code></pre><h3id="author-1">Author</h3><ul><li><strong>OlivierBossel</strong><ahref="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a></li></ul><!--@namespacejs.string--><!--@nameincludes--><h1id="js-includes"><code>jsincludes</code></h1><p>SameasthenativeString.includesfunctionbutaccepteitheranarrayofitemsorasimplecommaseparatedstringlike&quot;something,cool,hello,world&quot;</p><h2id="parameters">Parameters</h2><ul><li><p><strong>string</strong>String:Thestringtocheck</p></li><li><p><strong>values</strong>Array,String:Anarrayorcommaseparatedstringtocheck</p></li></ul><h2id="example-js-2">Example(js)</h2><pre><codeclass="language-js">importincludesfrom&#39;@coffeekraken/sugar/js/string/includes&#39;includes(&#39;Helloworld&#39;,&#39;world,coco&#39;)//[&#39;world&#39;]</code></pre><h3id="author-2">Author</h3><ul><li><strong>OlivierBossel</strong><ahref="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a></li></ul><h2id="variables">Variables</h2><!--@namedefinition--><h1id="static-get-js-definition">Staticget<code>jsdefinition</code></h1><p>Storethedefinitionect</p><h3id="author-3">Author</h3><ul><li><strong>OlivierBossel</strong><ahref="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a></li></ul>');
        });
    });
};
//# sourceMappingURL=toHtml.js.map