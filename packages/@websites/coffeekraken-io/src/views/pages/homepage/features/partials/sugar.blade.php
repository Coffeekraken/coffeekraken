
    <section id="features-sugar" class="section:diagonal">

        <div class="s-container">

            <div class="s-layout:21 s-gap:column:50 @mobile s-layout:1_2">
                <div>
                    <img s-inline class="illustration adaptive-color @mobile s-hide" src="/dist/img/illustrations/packages.svg" />
                </div>
                <div class="s-mbe:80">
                    <h3 class="s-typo:h3 s-mbe:30">
                        Sugar toolkit
                        <br>to <span class="s-gradient:text:accent">serve you</span>
                    </h3>
                    <p class="s-typo:lead s-mbe:30">
                        We all know as developer that a lot of our <span class="s-tc:accent">precious time</span> is
                        taken
                        by <span class="s-tc:complementary">searching a package</span> that cover our needs, <span
                            class="s-tc:accent">write our own</span> or even <span
                            class="s-tc:complementary">copy/paste/update</span> some code...
                    </p>
                    <p class="s-typo:p s-mbe:50 @mobile s-hide">
                        As all of our tools, Sugar is just a toolkit and you can use it if that suits your needs, or totally
                        forget about
                        it and import your own tools.
                    </p>
                    <a class="s-btn s-color:accent @mobile s-btn:block" href="/package/@coffeekraken/sugar/doc/readme" title="Get started with Sugar!">
                        Discover what Sugar has to offer
                    </a>
                </div>
            </div>

            <div class="code-example-section" ">
                <div>
                    <h5 class="s-typo:h4 s-mbe:30 @mobile s-typo:h5">
                        A coherant <span class="s-gradient:text:accent">CLI</span><br />with some cool features
                    </h5>
                    <p class="s-typo:p">
                        The <span class="s-typo:code">@@coffeekraken/cli</span> package is the one that provides
                        you these CLI features.
                        <span class="@mobile s-hide">
                        <br>Some other packages are extending the CLI with new features like the "<span
                            class="s-typo:code">@@coffeekraken/s-frontstack</span>" that represent the
                        development stack that provide his features through the Sugar CLI.</span>
                    </p>
                </div>
                <div>
                    @include('generic.code.example', ['examples' => [
                    'bash' => '# Get our ip address
                    sugar network.ip
                    # Kill a process on the port 8080
                    sugar process.kill -p 8080
                    # Lauch the development stack in the current directory
                    sugar dev
                    # And a lot more to discover...
                    sugar --help'
                    ]])
                </div>
                <div>
                    <a class="s-btn s-color:complementary @mobile s-btn:block" href="/doc/cli/overview" title="More on the Coffeekraken Sugar CLI">
                        More on our CLI
                    </a>
                </div>
            </div>

            <div class="code-example-section:right" ">
                <div>
                    <h5 class="s-typo:h4 s-mbe:30 @mobile s-typo:h5">
                        querySelector<span class="s-gradient:text:accent">Live</span>
                    </h5>
                    <p class="s-typo:p">
                        This function allows you to do exactly the same as the <span
                            class="s-typo:code">querySelector</span> but
                        will <span class="s-tc:complementary">listen for new element that match your selector in the
                            DOM</span> and execute
                        your callback function with it as soon as it appears in your document.
                    </p>
                </div>
                <div>
                    @include('generic.code.example', ['examples' => [
                    'js' => 'import _querySelectorLive from
                    \'@@coffeekraken/sugar/js/dom/query/querySelectorLive\';
                    _querySelectorLive(\'.my-cool-component\', (elm) => {
                    // do something with your element..
                    });'
                    ]])
                    <blockquote class="s-blockquote s-color:accent s-mbs:40">
                        Note that the <code class="s-typo:code">__</code> at the start of our imports is just <span
                            class="s-tc:accent">a convention</span> that we follow. It helps to see what is an
                        imported item
                        in our code...
                    </blockquote>
                </div>
                <div>
                    <a class="s-btn s-color:accent @mobile s-btn:block" href="/api/@coffeekraken.sugar.js.dom.query.querySelectorLive" title="querySelectorLive coffeekraken sugar documentation">
                        querySelectorLive documentation
                    </a>
                </div>
            </div>

            <div class="code-example-section" ">
                <div>
                    <h5 class="s-typo:h4 s-mbe:30 @mobile s-typo:h5">
                        sha256,<span class="s-gradient:text:accent">base64</span>/etc...
                    </h5>
                    <p class="s-typo:p">
                        These crypt functions allows you to encrypt strings with ease. Sugar support some encryption
                        algorhytm like <span class="s-typo:code">aes</span>,
                        <span class="s-typo:code">base64</span>, <span class="s-typo:code">md5</span>, <span
                            class="s-typo:code">sha256</span> and <span class="s-typo:code">sha512</span>.
                    </p>
                </div>
                <div>
                    @include('generic.code.example', ['examples' => [
                    'js' => 'import _base64 from \'@@coffeekraken/sugar/shared/crypt/base64\';
                    import _md5 from \'@@coffeekraken/sugar/shared/crypt/md5\';
                    _base64.encrypt(\'Hello world\'); // SGVsbG8gd29ybGQ=
                    _md5.encrypt(\'Hello world\'); // 3e25960a79dbc69b674cd4ec67a72c62'
                    ]])
                </div>
                <div>
                    <a class="s-btn s-color:complementary @mobile s-btn:block" href="/api/@coffeekraken.sugar.js.crypt.md5" title="MD5 Coffeekraken sugar documentation">
                        MD5 documentation
                    </a>
                </div>
            </div>

            <div class="code-example-section:right" "> 
                <div>
                    <h5 class="s-typo:h4 s-mbe:30 @mobile s-typo:h5">
                        is(<span class="s-gradient:text:accent">Mobile</span>,<span class="s-gradient:text:accent">Color</span>,<span
                            class="s-gradient:text:accent">PlainObject</span>, etc...)
                    </h5>
                    <p class="s-typo:p">
                        These functions are made to check if your user is on mobile, if your javascript is executed into
                        a node environment, is the passed string is a URL, etc...
                    </p>
                </div>
                <div>
                    @include('generic.code.example', ['examples' => [
                    'js' => 'import _isEmail from \'@@coffeekraken/sugar/shared/is/email\';
                    import _isColor from \'@@coffeekraken/sugar/shared/is/color\';
                    _isEmail(\'hello@world.com\'); // true
                    _isColor(\'rgba(10,20,30,1)\'); // true'
                            ]])
                </div>
                <div>
                    <a class="s-btn s-color:accent @mobile s-btn:block" href="/api/@coffeekraken.sugar.js.is.isMobile" title="isMobile Coffeekraken sugar documentation">
                        isMobile documentation
                    </a>    
                </div>
            </div>

            <div class="s-text:center @mobile s-mbs:50 s-text:left">
                <p class="s-typo:lead s-mi:auto s-mbe:30">
                    This is <span class="s-tc:accent">just a sneak peak</span> of what you can leverage in the sugar
                    toolkit.<br>
                    Don't be afraid, as usual you can take from it only what you need and <span
                        class="s-tc:complementary">learn
                        the rest step by step</span>.
                </p>
                <a class="s-btn s-color:complementary @mobile s-btn:block" href="/package/@coffeekraken/sugar/doc/readme" title="Discover what Coffeekraken Sugar has to offer!">
                    Discover all of what sugar has to offer!
                </a>
            </div>

        </div>

    </section>