<section id="features-sugar" class="s-pb:100">

    <div class="s-container">

        <div class="section-top-background"></div>

        <div class="s-layout:12:gutter-x:gutter-between">
            <div>
                <h3 class="s-typo:h3 s-mbe:30">
                    Sugar toolkit
                    <br>to <span class="s-tc:accent">serve you</span>
                </h3>
                <p class="s-typo:lead s-mbe:30">
                    We all know as developer that a lot of our <span class="s-tc:accent">precious time</span> is taken
                    by <span class="s-tc:complementary">searching a package</span> that cover our needs, <span
                        class="s-tc:accent">write our own</span> or even <span
                        class="s-tc:complementary">copy/paste/update</span> some code...
                </p>
                <p class="s-typo:p s-mbe:50">
                    As all of our tools, Sugar is just a toolkit and you can use it if that suits your needs, or totally
                    forget about
                    it and import your own tools.
                </p>
                <a class="s-btn s-color:accent" href="/#get-started" title="Get started!">
                    Discover that Sugar has to offer
                </a>
            </div>
            <div>
                <img class="__illustration s-when:light" src="/dist/img/illustrations/toolkit.svg" alt="Sugar toolkit"
                    title="Sugar toolkit" />
                <img class="__illustration s-when:dark" src="/dist/img/illustrations/toolkit-dark.svg"
                    alt="Sugar toolkit" title="Sugar toolkit" />
            </div>
        </div>

        <div class="s-pbs:100">

            {{-- <h4 class="s-typo:h4">
                Some example of what <span class="s-tc:accent">Sugar</span> has to offer
            </h4> --}}

            <div class="s-layout:112:gutter-x:gutter-between:align-center s-pb:50">
                <div>
                    <div class="s-mis:-50">
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
                </div>
                <div>
                    <h5 class="s-typo:h4 s-mbe:30">
                        A coherant <span class="s-tc:accent">CLI</span> with some cool features
                    </h5>
                    <p class="s-typo:p ">
                        The "<span class="s-typo:code">@@coffeekraken/cli</span> package is the one that provides
                        you these CLI features.
                        <br>Some other packages are extending the CLI with new features like the "<span
                            class="s-typo:code">@@coffeekraken/s-frontstack</span>" that represent the
                        development stack that provide his features through the Sugar CLI.
                    </p>
                </div>
            </div>

            <div class="s-layout:122:gutter-x:gutter-between:align-center s-pb:50">
                <div>
                    <h5 class="s-typo:h4 s-mbe:30">
                        querySelector<span class="s-tc:accent">Live</span>
                    </h5>
                    <p class="s-typo:p ">
                        This function allows you to do exactly the same as the <span
                            class="s-typo:code">querySelector</span> but
                        will listen for new element that match your selector in the DOM and execute
                        your callback function with it as soon as it appears in your document.
                    </p>
                </div>
                <div>

                    <div class="s-mie:-100">
                        @include('generic.code.example', ['examples' => [
                        'js' => 'import querySelectorLive from \'@@coffeekraken/sugar/js/dom/query/querySelectorLive\';
                        querySelectorLive(\'.my-cool-component\', (elm) => {
                        // do something with your element..
                        });'
                        ]])
                    </div>
                </div>
            </div>

            <div class="s-layout:112:gutter-x:gutter-between:align-center s-pb:50">
                <div>
                    <div class="s-mis:-50">
                        @include('generic.code.example', ['examples' => [
                        'js' => 'import base64 from \'@@coffeekraken/sugar/shared/crypt/base64\';
                        import md5 from \'@@coffeekraken/sugar/shared/crypt/md5\';
                        base64(\'Hello world\'); // SGVsbG8gd29ybGQ=
                        md5(\'Hello world\'); // 3e25960a79dbc69b674cd4ec67a72c62'
                        ]])
                    </div>
                </div>
                <div>
                    <h5 class="s-typo:h4 s-mbe:30">
                        sha256,<span class="s-tc:accent">base64</span>/etc...
                    </h5>
                    <p class="s-typo:p ">
                        These crypt functions allows you to encrypt strings with ease. Sugar support some encryption
                        algorhytm like <span class="s-typo:code">aes</span>,
                        <span class="s-typo:code">base64</span>, <span class="s-typo:code">md5</span>, <span
                            class="s-typo:code">sha256</span> and <span class="s-typo:code">sha512</span>.
                    </p>
                </div>
            </div>

            <div class="s-layout:122:gutter-x:gutter-between:align-center s-pb:50">
                <div>
                    <h5 class="s-typo:h4 s-mbe:30">
                        is(<span class="s-tc:accent">Mobile</span>,<span class="s-tc:accent">Color</span>,<span
                            class="s-tc:accent">PlainObject</span>, etc...)
                    </h5>
                    <p class="s-typo:p ">
                        These functions are made to check if your user is on mobile, if your javascript is executed into
                        a node environment, is the passed string is a URL, etc...
                    </p>
                </div>
                <div>
                    <div class="s-mie:-50">
                        @include('generic.code.example', ['examples' => [
                        'js' => 'import isEmail from \'@@coffeekraken/sugar/shared/is/email\';
                        import isColor from \'@@coffeekraken/sugar/shared/is/color\';
                        isEmail(\'hello@world.com\'); // true
                        isColor(\'rgba(10,20,30,1)\'); // true'
                        ]])
                    </div>
                </div>
            </div>
        </div>

        <div class="s-text:center s-pbs:50">
            <p class="s-typo:lead s-mi:auto s-mbe:30">
                This is <span class="s-tc:complementary">just a sneak peak</span> of what you can leverage in the sugar
                toolkit.<br>
                Don't be afraid, as usual you can take from it only what you need and <span class="s-tc:accent">learn
                    the rest step by step</span>.
            </p>
            <a class="s-btn s-color:complementary" href="/#get-started" title="Get started!">
                Discover all of what sugar has to offer!
            </a>
        </div>

    </div>

</section>
