<section id="features-sugar" class="s-container s-pb:100">

    <div class="section-top-background"></div>

    <div class="s-layout:12:gutter-x:gutter-between">
        <div>
            <h3 class="s-typo:h3 s-mbe:30">
                Sugar toolkit
                <br>as good as a... <span class="s-tc:accent">Sugar</span>
            </h3>
            <p class="s-typo:p s-mbe:50">
                We all know as developer that a lot of our precious time is taken by the search of
                a package that cover our small need like for example a function that merge two objects recursively.<br>
                You will say:
                "<span class="s-tc:accent">I got my own</span>", or "<span class="s-tc:accent">I have a package that do this</span>"...<br>
                And we would answer:
                "<span class="s-tc:complementary">We understand... But what if we can have a lot of these daily features in a simple and reliable package?</span>".
                <br>
                As all of our tools, Sugar is just a toolkit and you can use it if that suits your needs, or totally forget about
                it and import your own tools.
            </p>
            <a class="s-btn s-color:accent" href="/#get-started" title="Get started!">
                Discover that Sugar has to offer
            </a>
        </div>
        <div>
        </div>
    </div>

    <div class="s-pt:100">

        <h4 class="s-typo:h4">
            Some example of what <span class="s-tc:accent">Sugar</span> has to offer
        </h4>

        <div class="s-layout:112:gutter-x:gutter-between:align-center s-pb:50">
            <div>
                <div class="s-mis:-50">
                    @include('generic.code.example', ['examples' => [
                        'bash' => '# Get our ip address
    sugar network.ip
    # Kill a process on the port 8080
    sugar kill.port 8080
    # Lauch the development stack in the current directory
    sugar frontstack.dev
    # And a lot more to discover...
    sugar --help'
                    ]])
                </div>
            </div>
            <div>
                <h5 class="s-typo:h5 s-mbe:30">
                    A coherant <span class="s-tc:accent">CLI</span> with some cool features
                </h5>
                <p class="s-typo:p ">
                    The "<span class="s-tc:accent">@@coffeekraken/sugar</span> package is the one that provides you these CLI features.
                    <br>Some other packages are extending the CLI with new features like the "<span class="s-tc:accent">@@coffeekraken/s-frontstack</span>" that represent the
                    development stack that provide his features through the Sugar CLI.
                </p>
            </div>
        </div>

        <div class="s-layout:122:gutter-x:gutter-between:align-center s-pb:50">
            <div>
                <h5 class="s-typo:h5 s-mbe:30">
                    querySelector<span class="s-tc:accent">Live</span>
                </h5>
                <p class="s-typo:p ">
                    This function allows you to do exactly the same as the querySelector but
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
                <h5 class="s-typo:h5 s-mbe:30">
                    md5/<span class="s-tc:accent">base64</span>/etc...
                </h5>
                <p class="s-typo:p ">
                    These crypt functions allows you to encrypt strings with ease. Sugar support some encryption algorhytm like "<span class="s-tc:accent">aes</span>",
                    "<span class="s-tc:accent">base64</span>", "<span class="s-tc:accent">md5</span>", "<span class="s-tc:accent">sha256</span>" and "<span class="s-tc:accent">sha512</span>".
                </p>
            </div>
        </div>

        <div class="s-layout:122:gutter-x:gutter-between:align-center s-pb:50">
            <div>
                <h5 class="s-typo:h5 s-mbe:30">
                    is(<span class="s-tc:accent">Mobile</span>,<span class="s-tc:accent">Color</span>,<span class="s-tc:accent">PlainObject</span>, etc...)
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

        {{-- <a class="s-btn s-color:complementary" href="/#get-started" title="Get started!">
            Check out more of our webcomponents
        </a> --}}

    </div>

    <div class="s-text:center s-pt:50">
        <p class="s-typo:lead s-mi:auto s-mbe:30">
            This is just a sneak peak of what you can leverage in the sugar toolkit.<br>
            Don't be afraid, as usual you can take from it only what you need and <span class="s-tc:accent">learn the rest step by step</span>.
        </p>
        <a class="s-btn s-color:complementary" href="/#get-started" title="Get started!">
            Discover all of what sugar has to offer!
        </a>
    </div>

</section>