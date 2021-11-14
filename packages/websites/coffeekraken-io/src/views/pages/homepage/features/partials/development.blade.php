<section id="features-development" class="s-pbe:100">
    <div class="s-container">
        <div class="s-layout:122:gutter-x:gutter-between">

            <div class="s-pb:100">
                <h3 class="s-typo:h3 s-mbe:30">Built-in<br /><span class="s-tc:accent">development<br>stack</span></h3>
                <p class="s-typo:lead s-mbe:30">
                    Coffeekraken has a <span class="s-tc:accent">built-in development stack environment</span> that you can use
                    to:
                </p>
                <ul class="s-list:ol s-mbe:40">
                    <li>Simplify and speed up your process</li>
                    <li>Use the power of the <a href="/doc/@coffeekraken/sugar/README" title="Sugar toolkit">Sugar toolkit</a></li>
                    <li>Make use of the tools you want like <a class="s-typo:a" href="https://www.npmjs.com/package/vite" title="Vite JS" target="_blanl">Vite</a>, <a class="s-typo:a" href="https://www.npmjs.com/package/postcss" title="PostCSS" target="_blank">PostCSS</a>, <a class="s-typo:a" href="https://www.npmjs.com/package/typescript" title="Typescript" target="_blank">Typescript</a>, etc...</li>
                    <li>Don't worry about build and compilation processes</li>
                    <li>Automatically generate documentation from your docblocks</li>
                    <li>An a lot more to discover...</li>
                </ul>
                <a class="s-btn s-color:accent" href="doc/get-started/get-started" title="Get started!">
                    Get started!
                </a>
            </div>

            <div class="s-pb:100 s-vr">
                <img src="/src/img/features-development-logos.svg" class="s-mi:auto s-display:block" />
            

                <div class="s-mbs:50">
                    @include('generic.code.example', ['examples' => [
                        'bash' => '# Install sugar globally
    npm i @coffeekraken/sugar -g
    # Init your project using the default "recipe"
    sugar init my-cool-project
    # Launch your development environment
    sugar start
    # ...start working... I know I know...'
                    ]])
                </div>

            </div>
        </div>

        <div class="s-layout:112:gutter-x:gutter-between:align-center s-pb:50">

            <div>

                <div class="s-mbs:30 s-mbe:30">
                    @include('generic.code.example', ['examples' => [
                        'bash' => '# Init a Sugar step by step process
    sugar
    # Init a default template based website project
    sugar init --recipe default
    # Init a RiotJs based webcomponent
    sugar init --recipe riotComponent'
                    ]])
                </div>

                <ul class="__recipes-grid">
                    <li>
                        <a href="/doc/recipes/built-in/default" title="">
                            <div class="icon-card s-color:accent">
                                    <i class="s-icon:brand-coffeekraken"></i>
                                    <p class="s-p">Default (generic)</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="/doc/recipes/built-in/litElement" title="">
                            <div class="icon-card s-color:complementary">
                                    <i class="s-icon:brand-lit"></i>
                                    <p class="s-p">LitElement</p>
                            </div>
                        </a>
                    </li>
                </ul>

            </div> 
            <div>
                <h4 class="s-typo:h3 s-mbe:30">
                    Built-in <span class="s-tc:accent">recipes</span>
                </h4>
                <p class="s-typo:lead s-mbe:30">
                    <span class="s-tc:accent">Recipe</span> is the term used by Coffeekraken to define <span class="s-tc:accent">project template</span>.
                </p>
                <p class="s-typo:p s-mbe:30">
                    You can check bellow the build-in and official Coffeekraken recipes available and ready to use. Each recipe comes with the <span class="s-tc:accent">development environment</span>, <span class="s-tc:complementary">the production testing environment</span> and <span class="s-tc:accent">the full production build process</span>.
                </p>
                <a class="s-btn s-color:accent" href="/doc/recipes/what-are-recipes" title="What are recipes?">
                    More on recipes!
                </a>
            </div>   
        </div>
    </div>
</section>