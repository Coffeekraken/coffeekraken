<section id="features-development" class="diagonal-section s-pbe:100 @mobile s-pi:30" s-appear in="bottom">
    <div class="s-container">
        <div class="s-layout:21 s-gap:column:50 @mobile s-layout:1_2">
            <div>
                <div class="illustration">
                    <img s-inline src="/dist/img/illustrations/stack.svg" />
                </div>
                {{-- <img class="__illustration s-when:light" src="/dist/img/illustrations/stack.png" alt="Sugar stack"
                    title="Sugar stack" />
                <img class="__illustration s-when:dark" src="/dist/img/illustrations/stack.png" alt="Sugar stack"
                    title="Sugar stack" /> --}}
            </div>
            <div class="s-pb:100">
                <h3 class="s-typo:h2 s-mbe:30">Built-in<br /><span class="s-tc:accent">development<br>stack</span></h3>
                <p class="s-typo:lead s-mbe:30">
                    Coffeekraken has a <span class="s-tc:complementary">built-in</span> <span
                        class="s-tc:accent">development stack environment</span> make to simplify and speed up your
                    process.
                </p>
                <p class="s-typo:p">
                    Our development stack take care of a lot of things for your like the assets compilation, images
                    optimisation/generation, template engines implementation (blade, twig) as well as full production
                    ready build process so <span class="s-tc:accent">you can concentrate on your code</span>. <span
                        class="s-tc:complementary">We have your back</span>!
                </p>
            </div>
        </div>

        <div class="s-layout:122 s-gap:column:50 s-pb:80 @mobile s-layout:1_2">
            <div class="@mobile s-mbe:50">
                <h5 class="s-typo:h4 s-mbe:30">
                    <span class="s-tc:accent">Speed up</span><br />your process
                </h5>
                <p class="s-typo:p s-mbe:30">
                    Create projects using our totally customizable <span class="s-typo:code">recipes</span> that let
                    you <span class="s-tc:accent">start as soom as possible</span> with production grade ready
                    capabilities.
                </p>
                <a class="s-btn s-color:accent" href="/doc/cli/overview" title="Discover more about the Coffeekraken Sugar CLI">
                    More on Sugar CLI
                </a>
            </div>
            <div>
                <div class="s-mie:-50 @mobile s-mie:0">
                    @include('generic.code.example', ['examples' => [
                    'bash' => '# Install cli globally
                    npm i @coffeekraken/cli -g
                    # Init your project using with an interactive wizard
                    sugar new
                    # Launch your development environment
                    sugar dev
                    # ...start working... I know I know...'
                    ]])
                </div>
            </div>
        </div>

        <div class="s-layout:221 s-gap:column:50 s-pb:80 @mobile s-layout:1_2">
            <div class="@mobile s-mbe:50">
                <h5 class="s-typo:h4 s-mbe:30">
                    All the <span class="s-tc:accent">sugar</span> power<br />ready to go!
                </h5>
                <p class="s-typo:p s-mbe:30">
                    Make use of the power of the <span class="s-typo:code">Sugar</span> toolkit to enhance your <span
                        class="s-typo:code">js/ts</span> and <span class="s-typo:code">node</span> development
                    experience as well as our powerfull <span class="s-typo:code">postcss</span> plugin to write nice
                    and maintainable css!
                </p>
                <a class="s-btn s-color:complementary" href="/package/@coffeekraken/sugar/doc/readme" title="More on Coffeekraken Sugar">
                    Discover more on Sugar
                </a>
            </div>
            <div>
                <div class="s-mis:-50 @mobile s-mis:0">
                    @include('generic.code.example', ['examples' => [
                    'css' => '.my-element {
                    background: sugar.color(accent);

                    @sugar.media(mobile) {
                    background: sugar.color(complementary);
                    }
                    }',
                    'js' => '
                    import __querySelectorLive from \'@coffeekraken/sugar/js/dom/query/querySelectorLive\';
                    __querySelectorLive(\'.my-element\', ($elm) => {
                    // do something with your element
                    });
                    '
                    ]])
                </div>
            </div>
        </div>

        <div class="s-layout:122 s-gap:column:50 s-pb:80 @mobile s-layout:1_2">
            <div class="@mobile s-mbe:50">
                <h5 class="s-typo:h4 s-mbe:30">
                    Development<br /><span class="s-tc:accent">server</span>
                </h5>
                <p class="s-typo:p s-mbe:30">
                    Start working as soon as possible with our development server that will gives you the power of the
                    <span class="s-typo:code">live assets compilation</span> as well as the possibility for you to
                    write your views using technologies
                    like <span class="s-typo:code">blade</span>, <span class="s-typo:code">twig</span>, and even
                    more to come...
                </p>
                <a class="s-btn s-color:accent" href="/doc/servers/overview"
                    title="More on the Coffeekraken frontend server">
                    More on our servers
                </a>
            </div>
            <div>
                <div>
                    @include('generic.code.example', ['examples' => [
                    'bash' => '# launch the development stack
sugar dev'
                    ]])
                </div>
            </div>
        </div>

        <div
            class="s-layout:123 s-gap:column:50 s-p:80 s-mbe:100 s-bg:main-surface s-radius s-depth @mobile s-layout:1_2_3 s-depth:0">
            <div class="@mobile s-mbe:50">
                <div class="s-flex s-gap:30">
                    <div>
                        <i class="s-icon:computer s-font:90 s-opacity:30"></i>
                    </div>
                    <h5 class="s-typo:h5 s-mbe:30">
                        Under<br />
                        <span class="s-tc:complementary">the hood</span>
                    </h5>
                </div>
                <p class="s-typo:p ">
                    Our development server strategy is to make use of <span class="s-typo:code">two different
                        servers</span>. See aside the explaination
                    of this...
                </p>
            </div>
            <div class="@mobile s-mbe:50">
                <div class="s-flex s-gap:30">
                    <div>
                        <i class="s-icon:logo-vite-solid s-font:90 s-opacity:30"></i>
                    </div>
                    <h5 class="s-typo:h5 s-mbe:30">
                        <span class="s-tc:accent">ViteJS</span><br />server
                    </h5>
                </div>
                <p class="s-typo:p">
                    The ViteJs development server is used for the <span class="s-typo:code">js/ts</span> and <span
                        class="s-typo:code">css</span> assets.
                    <br />
                    This gives us the power of live compilation and speed up considerably our workflow.
                </p>
            </div>
            <div class="@mobile s-mbe:50">
                <div class="s-flex s-gap:30">
                    <div>
                        <i class="s-icon:server s-font:90 s-opacity:30"></i>
                    </div>
                     <h5 class="s-typo:h5 s-mbe:30">
                        <span class="s-tc:complementary">Internal</span><br />server
                    </h5>
                </div>
                <p class="s-typo:p ">
                    Our internal server based on <span class="s-typo:code">Express</span> is used to serve all the
                    rest like <span class="s-typo:code">views</span> (blade and twig for now), static assets like
                    images, json, etc...
                </p>
            </div>
        </div>

        <div class="s-layout:221 s-gap:column:50 s-pb:80 @mobile s-layout:1_2">
            <div class="@mobile s-mbe:50">
                <h5 class="s-typo:h4 s-mbe:30">
                    <span class="s-tc:accent">Build</span><br />for production
                </h5>
                <p class="s-typo:p ">
                    Generate all the needed assets for production like bundling your <span
                        class="s-typo:code">css</span> and <span class="s-typo:code">javascript</span>, as well as
                    <span class="s-tc:accent">compressing your images</span>, <span
                        class="s-tc:complementary">generating multiple resolutions for them</span> if needed, generating
                    favicons,
                    etc...
                </p>
            </div>
            <div>
                <div>
                    @include('generic.code.example', ['examples' => [
                    'bash' => '# launch the build process
sugar build'
                    ]])
                </div>
            </div>
        </div>

        <div class="s-layout:122 s-gap:column:50 s-pb:80 @mobile s-layout:1_2">
            <div class="@mobile s-mbe:50">
                <h4 class="s-typo:h4 s-mbe:30">
                    Built-in<br /><span class="s-tc:accent">recipes</span>
                </h4>
                <p class="s-typo:lead s-mbe:30">
                    <span class="s-tc:accent">Recipe</span> is our term to define <span
                        class="s-tc:complementary">project template</span>.
                </p>
                <p class="s-typo:p s-mbe:30">
                    You can check bellow the build-in and official Coffeekraken recipes available and ready to use. Each
                    recipe comes with the <span class="s-tc:accent">development environment</span>, <span
                        class="s-tc:complementary">the production testing environment</span> and <span
                        class="s-tc:accent">the full production build process</span>.
                </p>
            </div>
            <div>
                <ul class="__recipes-grid s-mbe:30">
                    <li>
                        <a href="/doc/recipes/built-in/default" title="Coffeekraken generic recipe">
                            <div class="icon-card s-color:accent" style="--image: url(https://media.giphy.com/media/eIm624c8nnNbiG0V3g/giphy.gif);">
                                <div class="icon-card__content">
                                    <i class="s-icon:logo-coffeekraken"></i>
                                    <p class="s-p">Generic<br />(default)</p>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="/doc/recipes/built-in/litElement" title="Coffeekraken LitElement recipe">
                            <div class="icon-card s-color:complementary" style="--image: url(https://media.giphy.com/media/hPTZgtzfRIB5Nfb5rL/giphy-downsized-large.gif);">
                                <div class="icon-card__content">
                                    <i class="s-icon:logo-lit"></i>
                                    <p class="s-p">LitElement</p>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="/doc/recipes/built-in/nextjs" title="Coffeekraken NextJs recipe">
                            <div class="icon-card s-color:accent" style="--image: url(https://media.giphy.com/media/vfyN4sCz1QBR6/giphy.gif);">
                                <div class="icon-card__content">
                                    <i class="s-icon:logo-nextjs"></i>
                                    <p class="s-p">NextJS</p>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="/doc/recipes/create-your-recipe" title="Create your own recipe">
                            <div class="icon-card s-color:complementary" style="--image: url(https://media.giphy.com/media/9W6X9HzEX73VbjR2WV/giphy.gif);">
                                <div class="icon-card__content">
                                    <i class="s-icon:misc-build"></i>
                                    <p class="s-p">Build your<br />own</p>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>

                <div>
                    @include('generic.code.example', ['examples' => [
                    'bash' => '# Create a project using sugar step by step process
sugar new'
                    ]])
                </div>

            </div>
        </div>

        <div class="s-text:center s-pbs:50">
            <p class="s-typo:lead s-mi:auto s-mbe:30">
                This is <span class="s-tc:complementary">just a sneak peak</span> of what our built-in development stack
                has to offer. Don't be afraid, as usual
                you can take from it only what you need and <span class="s-tc:accent">learn
                    the rest step by step</span>.
            </p>
            <a class="s-btn s-color:complementary" href="/doc/recipes/what-are-recipes"
                title="More on what Coffeekraken recipes are">
                Discover more on recipes!
            </a>
        </div>

    </div>
</section>
