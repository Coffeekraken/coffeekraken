<div id="homepage-features">

    {{-- <section class="__header s-container s-py:100">

        <div class="__bg"></div>

        <div class="s-grid:122:gutter-x:gutter-between">
            <div>
                <img class="__illustration" src="/src/img/chest.png" />
            </div>
            <div class="s-rhythm-vertical">
                <h1 class="s-typo:h1">Features</h1>
                <p class="s-typo:p">
                    Coffeekraken toolkit has been designed from the ground up to be <span class="s-color-accent">as modular as possible</span>. This mean that we want you to be able to pick what you need and leave the rest aside...<br>
    We think that this approach is <span class="s-color-complementary">better than having to carry a big bag of things</span> you don’t have any use of...
                </p>
            </div>
        </div>

    </section> --}}

    <section class="s-container">
        
        {{-- <nav class="__tabs">
            <s-activate class="__item" active target="features-development" trigger="click,anchor" group="homepage-features" history>
                Development stack
            </s-activate>
            <s-activate class="__item" target="features-frontend" trigger="click,anchor" group="homepage-features" history>
                Frontend system
            </s-activate>
            <s-activate class="__item" target="features-webcomponents" trigger="click,anchor" group="homepage-features" history>
                Versatiles webcomponents
            </s-activate>
            <s-activate class="__item" target="features-sugar" trigger="click,anchor" group="homepage-features" history>
                Sugar toolkit
            </s-activate>
            <s-activate class="__item" target="features-documentation" trigger="click,anchor" group="homepage-features" history>
                Documentation at your fingertips
            </s-activate>
        </nav> --}}

        <div class="__contents">

            <section id="features-development">
                <div class="s-grid:122:gutter-x:gutter-between">

                    <div class="s-py:100">
                        <h3 class="s-typo:h3">Built-in<br />development<br>stack</h3>
                        <p class="s-typo:p s-mb:30">
                            Coffeekraken has a built-in development stack environment that you can use
                            to <span class="s-color:complementary">simplify and speed up your process</span>. It use under the hood tools like
                            <a class="s-typo:a" href="https://www.npmjs.com/package/vite" title="Vite JS" target="_blanl">Vite</a>,
                            <a class="s-typo:a" href="https://www.npmjs.com/package/postcss" title="PostCSS" target="_blank">PostCSS</a>,
                            <a class="s-typo:a" href="https://www.npmjs.com/package/typescript" title="Typescript" target="_blank">Typescript</a>
                            and some more listed <a class="s-typo:a s-color:complementary" href="/dependencies" title="Coffeekraken dependencies">on the dependencies page</a>.                            
                        </p>
                        <p class="s-typo:p">
                            Don't be afraid by Kraken Pop, to start using our built-in development stack, you just need to enter 3 simple commands that you
                            are more than probably already familiarised with...
                        </p>
                        <a class="s-btn:complementary:gradient" href="/#get-started" title="Get started!">
                            Get started!
                        </a>
                    </div>

                    <div class="s-py:100 s-rhythm-vertical">
                        <img src="/src/img/features-development-logos.svg" />
                        <s-code-example class="s-mt:50">
                            <template lang="bash">
# Install sugar globally
npm i @coffeekraken/sugar -g
# Init your project using the default "recipe"
sugar init my-cool-project
# Launch your development environment
sugar start
# ...start working... I know I know...
                            </template>
                        </s-code-example>

                    </div>
                </div>
            </section>

            <section id="features-frontend" class="s-py:100">

                <h3 class="s-typo:h3 s-mb:30">Frontend<br><span class="s-color:accent">sugar</span></h3>
                <p class="s-typo:p s-mb:50">
                    The goal of Coffeekraken is to help having a better development experience with
                    a production ready quality grade. Here's some areas where we can help you:
                </p>

                <div class="s-grid:112:gutter-x:gutter-between:align-center s-py:50">
                    <div>  
                        <s-code-example class="s-mb:30">
                            <template lang="html">
<ul class="s-list\:ul\:icon">
    <li>
            <i class="s-icon\:custom-user"></i>
            Hello <span class="s-color\:accent">world</span>
    </li>
    <li>
        <i class="s-icon\:fire"></i>
        This is <span class="s-font\:bold">a cool</span> list
    </li>
    <li>
        <i class="s-icon\:copy"></i>
        Cool don't you think?
    </li>
</ul>
                            </template>
                        </s-code-example>
                    </div>
                    <div>
                        <h4 class="s-typo:h4 s-mb:30">
                            Templates (<span class="s-color:accent">html</span>, <span class="s-color:accent">BladePhp</span>, <span class="s-color:accent">Twig</span>, <span class="s-color:accent">etc...</span>)
                        </h4>
                        <ol class="s-list:ol:accent s-mb:30">
                            <li class="s-typo:p">
                                Utility classes for quick layout construction
                            </li>
                            <li class="s-typo:p">
                                Built-in support for template engines like <a class="s-typo:a" href="https://laravel.com/docs/8.x/blade" title="BladePhp" target="_blank">BladePhp</a>, <a class="s-typo:a" href="https://twig.symfony.com/" title="Twig" target="_blank">Twig</a>, and more...
                            </li>
                            <li class="s-typo:p">
                                And more...
                            </li>
                        </ol>
                    </div>
                </div>

                <div class="s-grid:122:gutter-x:gutter-between:align-center s-py:50">
                    <div>
                        <h4 class="s-typo:h4 s-mb:30">
                            CSS made<br>
                            <span class="s-color:accent">pleasant</span> again
                        </h4>
                        <ol class="s-list:ol:accent s-mb:30">
                            <li class="s-typo:p">
                                Color management simplified
                            </li>
                            <li class="s-typo:p">
                                Theme handling like <span class="s-color:complementary">light</span>, <span class="s-color:complementary">dark</span>, etc...
                            </li>
                            <li class="s-typo:p">
                                Quick compilation through <a class="s-typo:a" href="https://vitejs.dev/" title="ViteJs" target="_blank">ViteJs</a>
                            </li>   
                            <li class="s-typo:p">
                                Automatic icons integration from <a class="s-typo:a" href="https://fontawesome.com/" title="Fontawesome" target="_blank">Fontawesome</a>, <span class="s-color:complementary">filesystem</span> and more...
                            </li>
                            {{-- <li class="s-typo:p">
                                Easy grid layout generation through the <a class="s-typo:a" href="/" title="grid">@sugar.grid</a> PostCSS mixin.
                            </li> --}}
                            <li class="s-typo:p">
                                And more...
                            </li>
                        </ol>
                    </div>
                    <div>
                        <s-code-example class="s-mb:30">
                            <template lang="css">
/* import some globs */
@sugar.import('../views/**/*.css');
/* init sugar (classes, resetcss, etc...) */
@sugar.init;
/* list icons you want in your project */
/* want the fontawesome "user" icon named as "custom-user" */
@sugar.icons(
    fa:user:custom-user
    fa:fire
    fs:src/icons/copy.svg:copy
);
                            </template>
                        </s-code-example>
                    </div>    
                </div>

                <div class="s-grid:112:gutter-x:gutter-between:align-center s-py:50">
                    <div>  
                        <s-code-example class="s-mb:30">
                            <template lang="html">
<ul class="s-list\:ul\:icon">
    <li>
            <i class="s-icon\:custom-user"></i>
            Hello <span class="s-color\:accent">world</span>
    </li>
    <li>
        <i class="s-icon\:fire"></i>
        This is <span class="s-font\:bold">a cool</span> list
    </li>
    <li>
        <i class="s-icon\:copy"></i>
        Cool don't you think?
    </li>
</ul>
                            </template>
                        </s-code-example>
                    </div>
                    <div>
                        <h4 class="s-typo:h4 s-mb:30">
                            Javascript made<br><span class="s-color:accent">reliable</span>
                        </h4>
                        <ol class="s-list:ol:accent s-mb:30">
                            <li class="s-typo:p">
                                Typescript support built-in
                            </li>
                            <li class="s-typo:p">
                                Quick compilation through <a class="s-typo:a" href="https://vitejs.dev/" title="ViteJs" target="_blank">ViteJs</a>
                            </li>                           
                            <li class="s-typo:p">
                                And more...
                            </li>
                        </ol>
                    </div>
                </div>

                <div class="s-text:center s-py:50">
                    <p class="s-typo:p-lead s-mx:auto s-mb:30">
                        Keep in mind that <span class="s-color:accent">all of these features are optional</span>. This mean that
                        you can work with the things you like and let the rest aside...
                    </p>
                    <a class="s-btn:complementary:gradient" href="/#get-started" title="Get started!">
                        Get started!
                    </a>
                </div>

            </section>

            <section id="features-webcomponents" class="s-py:100">
                <div class="s-grid:122:gutter-x:gutter-between">

                    <div>
                        <h3 class="s-typo:h3 s-mb:30">
                            Fully customizable
                            <br /><span class="s-color:complementary">webcomponents</span>
                        </h3>
                        <p class="s-typo:p s-mb:30">
                            Some features are clearly missing in our web browsers these days like a searchable/filtrable select input for example.
                            In order to help with that, Coffeekraken provide some fully customisable and framework agnostic webcomponents that you can
                            simply import and use in less than a minute...
                        </p>
                        <a class="s-btn:complementary:gradient" href="/#get-started" title="Get started!">
                            Get started!
                        </a>
                    </div>

                    <div>
                        <s-code-example>
                            <template lang="js">
// import webcomponents
import '@coffeekraken/s-filtrable-input';
import '@coffeekraken/s-clipboard-copy';
import '@coffeekraken/s-code-example';
// etc...
                            </template>
                        </s-code-example>

                        <s-code-example class="s-mt:50">
                            <template lang="html">
<p id="paragraph">
    Something cool...
</p>
<s-clipboard-copy target="#paragraph"></s-clipboard-copy>
                            </template>
                        </s-code-example>

                    </div>
                </div>

                <div class="s-py:50">

                    <h4 class="s-typo:h4 s-mb:50">
                        Some of our webcomponents
                    </h4>

                    <ul class="__webcomponents-grid s-mb:50">
                        @foreach (['complementary','accent','complementary','accent','complementary','accent','complementary','accent','complementary','accent'] as $i)
                        <li>
                            <div class="s-ratio:1-1 s-gradient:{{ $i }} s-border:radius s-depth:50">
                                <a href="/" title="">
                                    <div class="s-text:center s-align:abs-center">
                                        <i class="s-icon:search s-font:100 s-mb:20"></i>
                                        <p class="s-p">Search input</p>
                                    </div>
                                </a>
                            </div>
                        </li>
                        @endforeach
                    </ul>

                    <div class="s-text:center s-pb:50">
                        <p class="s-typo:p-lead s-mx:auto s-mb:30">
                            There are just some of our webcomponents listed.<br>
                            A lot of other components are and will be available throught time. Keep updated by joining us.
                        </p>
                        <a class="s-btn:complementary:gradient" href="/#get-started" title="Get started!">
                            Check out more of our webcomponents!
                        </a>
                    </div>

                </div>

            </section>

            <section id="features-sugar" class="s-py:100">
                <div class="s-grid:12:gutter-x:gutter-between">
                    <div>
                        <h3 class="s-typo:h3 s-mb:30">
                            Sugar toolkit
                            <br>as good as a... <span class="s-color:accent">Sugar</span>
                        </h3>
                        <p class="s-typo:p s-mb:50">
                            We all know as developer that a lot of our precious time is taken by the search of
                            a package that cover our small need like for example a function that merge two objects recursively.<br>
                            You will say:
                            "<span class="s-color:accent">I got my own</span>", or "<span class="s-color:accent">I have a package that do this</span>"...<br>
                            And we would answer:
                            "<span class="s-color:complementary">We understand... But what if we can have a lot of these daily features in a simple and reliable package?</span>".
                            <br>
                            As all of our tools, Sugar is just a toolkit and you can use it if that suits your needs, or totally forget about
                            it and import your own tools.
                        </p>
                        <a class="s-btn:accent:gradient" href="/#get-started" title="Get started!">
                            Discover that Sugar has to offer
                        </a>
                    </div>
                    <div>
                    </div>
                </div>

                <div class="s-py:100">

                    <h4 class="s-typo:h4 s-mb:50">
                        Some example of what Sugar has to offer
                    </h4>

                    <div class="s-grid:112:gutter-x:gutter-between:align-center s-py:50">
                        <div>
                            <s-code-example>
                                <template lang="bash">
# Get our ip address
sugar network.ip
# Kill a process on the port 8080
sugar kill.port 8080
# Lauch the development stack in the current directory
sugar frontstack.dev
# And a lot more to discover...
sugar --help
                                </template>
                            </s-code-example>
                        </div>
                        <div>
                            <h5 class="s-typo:h5 s-mb:30">
                                A coherant <span class="s-color:accent">CLI</span> with some cool features
                            </h5>
                            <p class="s-typo:p ">
                               The "<span class="s-color:accent">@coffeekraken/sugar</span> package is the one that provides you these CLI features.
                               <br>Some other packages are extending the CLI with new features like the "<span class="s-color:accent">@coffeekraken/s-frontstack</span>" that represent the
                               development stack that provide his features through the Sugar CLI.
                            </p>
                        </div>
                    </div>

                    <div class="s-grid:122:gutter-x:gutter-between:align-center s-py:50">
                        <div>
                            <h5 class="s-typo:h5 s-mb:30">
                                querySelector<span class="s-color:accent">Live</span>
                            </h5>
                            <p class="s-typo:p ">
                                This function allows you to do exactly the same as the querySelector but
                                will listen for new element that match your selector in the DOM and execute
                                your callback function with it as soon as it appears in your document.
                            </p>
                        </div>
                        <div>
                            <s-code-example>
                                <template lang="js">
import querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';
querySelectorLive('.my-cool-component', ($elm) => {
    // do something with your element...
});
                                </template>
                            </s-code-example>
                        </div>
                    </div>

                    <div class="s-grid:112:gutter-x:gutter-between:align-center s-py:50">
                        <div>
                            <s-code-example>
                                <template lang="js">
import base64 from '@coffeekraken/sugar/shared/crypt/base64';
import md5 from '@coffeekraken/sugar/shared/crypt/md5';
base64('Hello world'); // SGVsbG8gd29ybGQ=
md5('Hello world'); // 3e25960a79dbc69b674cd4ec67a72c62
                                </template>
                            </s-code-example>
                        </div>
                        <div>
                            <h5 class="s-typo:h5 s-mb:30">
                                md5/<span class="s-color:accent">base64</span>/etc...
                            </h5>
                            <p class="s-typo:p ">
                               These crypt functions allows you to encrypt strings with ease. Sugar support some encryption algorhytm like "<span class="s-color:accent">aes</span>",
                               "<span class="s-color:accent">base64</span>", "<span class="s-color:accent">md5</span>", "<span class="s-color:accent">sha256</span>" and "<span class="s-color:accent">sha512</span>".
                            </p>
                        </div>
                    </div>

                    <div class="s-grid:122:gutter-x:gutter-between:align-center s-py:50">
                        <div>
                            <h5 class="s-typo:h5 s-mb:30">
                                is(<span class="s-color:accent">Mobile</span>,<span class="s-color:accent">Color</span>,<span class="s-color:accent">PlainObject</span>, etc...)
                            </h5>
                            <p class="s-typo:p ">
                                These functions are made to check if your user is on mobile, if your javascript is executed into
                                a node environment, is the passed string is a URL, etc...
                            </p>
                        </div>
                        <div>
                            <s-code-example>
                                <template lang="js">
import isEmail from '@coffeekraken/sugar/shared/is/email';
import isColor from '@coffeekraken/sugar/shared/is/color';
isEmail('hello@world.com'); // true
isColor('rgba(10,20,30,1)'); // true
                                </template>
                            </s-code-example>
                        </div>
                    </div>

                    {{-- <a class="s-btn:complementary:gradient" href="/#get-started" title="Get started!">
                        Check out more of our webcomponents
                    </a> --}}

                </div>

                <div class="s-text:center s-pb:50">
                    <p class="s-typo:p-lead s-mx:auto s-mb:30">
                        This is just a sneak peak of what you can leverage in the sugar toolkit.<br>
                        Don't be afraid, as usual you can take from it only what you need and <span class="s-color:accent">learn the rest step by step</span>.
                    </p>
                    <a class="s-btn:complementary:gradient" href="/#get-started" title="Get started!">
                        Discover all of what sugar has to offer!
                    </a>
                </div>

            </section>


            <section id="features-documentation">
                <h1>Documentation at your fingertips</h1>
            </section>
        </div>

    </section>

</div>