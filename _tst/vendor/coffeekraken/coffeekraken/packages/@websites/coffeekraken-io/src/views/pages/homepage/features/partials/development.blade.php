<section id="features-development" class="section">
    <div class="s-container">
        <div class="s-layout:21 s-gap:column:50 @mobile s-layout:1_2">
            <div>
                <div class="adaptive-color @mobile s-hide">
                    <img s-inline src="/dist/img/illustrations/stack.svg" />
                </div>
            </div>
            <div class="s-pb:100">
                <h2 class="s-typo:h2 s-mbe:30">Built-in<br /><span class="s-gradient:text:accent">development<br>stack</span></h2>
                <p class="s-typo:lead s-mbe:30">
                    Coffeekraken has a <span class="s-tc:complementary">built-in</span> <span
                        class="s-tc:accent">development stack environment</span> make to simplify and speed up your
                    process.
                </p>
                <p class="s-typo:p @mobile s-hide">
                    Our development stack take care of a lot of things for your like the assets compilation, images
                    optimisation/generation, template engines implementation (blade, twig) as well as full production
                    ready build process so <span class="s-tc:accent">you can concentrate on your code</span>. <span
                        class="s-tc:complementary">We have your back</span>!
                </p>
            </div>
        </div>


        <div class="code-example-section" ">
            <div>
                <h3 class="s-typo:h3 s-mbe:30">
                    <span class="s-gradient:text:accent">Speed up</span><br />your process
                </h3>
                <p class="s-typo:p s-mbe:30">
                    Create projects using our totally customizable <span class="s-typo:code">recipes</span> that let
                    you <span class="s-tc:accent">start as soom as possible</span> with production grade ready
                    capabilities.
                </p>
            </div>
            <div>
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
            <div>
                <a class="s-btn s-color:accent @mobile s-btn:block" href="/doc/cli/overview" title="Discover more about the Coffeekraken Sugar CLI">
                    <i class="s-icon:more"></i>
                    More on Sugar CLI
                    <i class="s-icon:more"></i>
                </a>
            </div>
        </div>

        <div class="code-example-section:right" ">   
            <div>
                <h3 class="s-typo:h3 s-mbe:30">
                    All the <span class="s-gradient:text:accent">sugar</span> power<br />ready to go!
                </h3>
                <p class="s-typo:p s-mbe:30">
                    Make use of the power of the <span class="s-typo:code">Sugar</span> toolkit to enhance your <span
                        class="s-typo:code">js/ts</span> and <span class="s-typo:code">node</span> development
                    experience as well as our powerfull <span class="s-typo:code">postcss</span> plugin to write nice
                    and maintainable css!
                </p>
            </div>
            <div>
                @include('generic.code.example', ['examples' => [
                'css' => '.my-element {
                background: sugar.color(accent);

                @sugar.media(mobile) {
                background: sugar.color(complementary);
                }
                }',
                'js' => '
                import _querySelectorLive from \'@coffeekraken/sugar/js/dom/query/querySelectorLive\';
                _querySelectorLive(\'.my-element\', ($elm) => {
                // do something with your element
                });
                '
                ]])
            </div>
            <div>
                <a class="s-btn s-color:complementary @mobile s-btn:block" href="/package/@coffeekraken/sugar/doc/readme" title="More on Coffeekraken Sugar">
                    <i class="s-icon:more"></i>
                    Discover more on Sugar
                    <i class="s-icon:more"></i>
                </a>
            </div>
        </div>

        <div class="code-example-section" ">
            <div>
                <h3 class="s-typo:h3 s-mbe:30">
                    Development<br /><span class="s-gradient:text:accent">server</span>
                </h3>
                <p class="s-typo:p s-mbe:30">
                    Start working as soon as possible with our development server that will gives you the power of the
                    <span class="s-typo:code">live assets compilation</span> as well as the possibility for you to
                    write your views using technologies
                    like <span class="s-typo:code">blade</span>, <span class="s-typo:code">twig</span>, and even
                    more to come...
                </p>
            </div>
            <div>
                @include('generic.code.example', ['examples' => [
                'bash' => '# launch the development stack
sugar dev'
                ]])
            </div>
            <div>
                <a class="s-btn s-color:accent @mobile s-btn:block" href="/doc/servers/overview"
                    title="More on the Coffeekraken frontend server">
                    <i class="s-icon:more"></i>
                    More on our servers
                    <i class="s-icon:more"></i>
                </a>
            </div>
        </div>

        <div
            class="s-layout:123 s-gap:50 s-p:80 s-mbe:100 s-bg:main-surface s-radius s-depth @mobile s-layout:1_2_3 s-depth:0 s-osi:30 s-p:50"
            s-highlight="light" size="2000" intensity="0.2">
            <div>
                <div class="s-flex s-gap:30 s-mbe:30">
                    <div>
                        <i class="s-icon:computer s-font:90 s-opacity:30"></i>
                    </div>
                    <h4 class="s-typo:h4 s-mbe:30">
                        Under<br />
                        <span class="s-gradient:text:accent">the hood</span>
                    </h4>
                </div>
                <p class="s-typo:p">
                    Our development server strategy is to make use of <span class="s-typo:code">two different
                        servers</span>. See aside the explaination
                    of this...
                </p>
            </div>
            <div>
                <div class="s-flex s-gap:30 s-mbe:30">
                    <div>
                        <i class="s-icon:logo-vite-solid s-font:90 s-opacity:30"></i>
                    </div>
                    <h4 class="s-typo:h4 s-mbe:30">
                        <span class="s-gradient:text:accent">ViteJS</span><br />server
                    </h4>
                </div>
                <p class="s-typo:p">
                    The ViteJs development server is used for the <span class="s-typo:code">js/ts</span> and <span
                        class="s-typo:code">css</span> assets.
                    <br />
                    This gives us the power of live compilation and speed up considerably our workflow.
                </p>
            </div>
            <div>
                <div class="s-flex s-gap:30 s-mbe:30">
                    <div>
                        <i class="s-icon:server s-font:90 s-opacity:30"></i>
                    </div>
                     <h4 class="s-typo:h4 s-mbe:30">
                        <span class="s-gradient:text:accent">Internal</span><br />server
                    </h4>
                </div>
                <p class="s-typo:p ">
                    Our internal server based on <span class="s-typo:code">Express</span> is used to serve all the
                    rest like <span class="s-typo:code">views</span> (blade and twig for now), static assets like
                    images, json, etc...
                </p>
            </div>
        </div>

        <div class="code-example-section:right" "> 
            <div>
                <h3 class="s-typo:h3 s-mbe:30">
                    <span class="s-gradient:text:accent">Build</span><br />for production
                </h3>
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

        <div class="s-layout:112 s-gap:column:50 s-pb:80 @mobile s-layout:1_2">
            <div>
                <ul class="_recipes-grid s-mbe:50">
                    <li>
                        <a href="/doc/recipes/built-in/default" title="Coffeekraken generic recipe">
                        {{-- style="--image: url(https://media.giphy.com/media/eIm624c8nnNbiG0V3g/giphy.gif);" --}}
                            <div class="icon-card s-color:accent" s-highlight intensity="0.6">
                                <div class="icon-card_content">
                                    <i class="s-icon:logo-coffeekraken"></i>
                                    <p class="s-p">Generic<br />(default)</p>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="/doc/recipes/built-in/nextjs" title="Coffeekraken NextJs recipe">
                        {{-- style="--image: url(https://media.giphy.com/media/vfyN4sCz1QBR6/giphy.gif);" --}}
                            <div class="icon-card s-color:complementary" s-highlight intensity="0.6">
                                <div class="icon-card_content">
                                    <i class="s-icon:logo-nextjs"></i>
                                    <p class="s-p">NextJS</p>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="https://discord.com/channels/940362961682333767/940362962223378494" target="_blank" title="Coffeekraken NextJs recipe">
                        {{-- style="--image: url(https://media0.giphy.com/media/3ohs7SYIm3yiUbL0yc/giphy.gif?cid=ecf05e476vhwqgevpq5exoat1ejppi1qk9xp4jgig9j38wck&rid=giphy.gif&ct=g);" --}}
                            <div class="icon-card s-color:accent" s-highlight intensity="0.6">
                                <div class="icon-card_content">
                                    <i class="s-icon:misc-ring"></i>
                                    <p class="s-p">Propose</p>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="/doc/recipes/create-your-recipe" title="Create your own recipe">
                        {{-- style="--image: url(https://media.giphy.com/media/9W6X9HzEX73VbjR2WV/giphy.gif);" --}}
                            <div class="icon-card s-color:complementary" s-highlight intensity="0.6">
                                <div class="icon-card_content">
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
            <div class="@mobile s-mbs:50">
                <h3 class="s-typo:h3 s-mbe:30">
                    Built-in<br /><span class="s-gradient:text:accent">recipes</span>
                </h3>
                <p class="s-typo:lead s-mbe:30">
                    <span class="s-tc:accent">Recipe</span> is our term to define <span
                        class="s-tc:complementary">project template</span>.
                </p>
                <p class="s-typo:p s-mbe:30 @mobile s-hide">
                    You can check bellow the build-in and official Coffeekraken recipes available and ready to use. Each
                    recipe comes with the <span class="s-tc:accent">development environment</span>, <span
                        class="s-tc:complementary">the production testing environment</span> and <span
                        class="s-tc:accent">the full production build process</span>.
                </p>
            </div>
        </div>

        <div class="s-text:center s-pbs:50 @mobile s-text:left">
            <p class="s-typo:lead s-mi:auto s-mbe:30">
                This is <span class="s-tc:complementary">just a sneak peak</span> of what our built-in development stack
                has to offer. Don't be afraid, as usual
                you can take from it only what you need and <span class="s-tc:accent">learn
                    the rest step by step</span>.
            </p>
            <a class="s-btn s-color:complementary @mobile s-btn:block" href="/doc/recipes/what-are-recipes"
                title="More on what Coffeekraken recipes are">
                <i class="s-icon:more"></i>
                Discover more on recipes!
                <i class="s-icon:more"></i>
            </a>
        </div>

    </div>
</section>
