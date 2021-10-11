<section id="features-development" class="s-container s-pbe:100">
    <div class="s-layout:122:gutter-x:gutter-between">

        <div class="s-pb:100">
            <h3 class="s-typo:h3 s-mbe:30">Built-in<br />development<br>stack</h3>
            <p class="s-typo:p s-mbe:30">
                Coffeekraken has a built-in development stack environment that you can use
                to <span class="s-tc:accent">simplify and speed up your process</span>. It use under the hood tools like
                <a class="s-typo:a" href="https://www.npmjs.com/package/vite" title="Vite JS" target="_blanl">Vite</a>,
                <a class="s-typo:a" href="https://www.npmjs.com/package/postcss" title="PostCSS" target="_blank">PostCSS</a>,
                <a class="s-typo:a" href="https://www.npmjs.com/package/typescript" title="Typescript" target="_blank">Typescript</a>
                and some more listed <a class="s-typo:a s-tc:accent" href="/dependencies" title="Coffeekraken dependencies">on the dependencies page</a>.                            
            </p>
            <p class="s-typo:p s-mbe:30">
                Don't be afraid by Kraken Pop, to start using our built-in development stack, you just need to enter 3 simple commands that you
                are more than probably already familiarised with...
            </p>
            <a class="s-btn s-color:accent" href="/#get-started" title="Get started!">
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
                @foreach (['accent','accent','accent','accent'] as $i)
                <li>
                    <div class="s-ratio:1 s-bg:accent s-radius s-depth:50 s-position:relative">
                        <a href="/" title="">
                            <div class="s-text:center s-tc:accent-foreground s-align:abs-center">
                                <i class="s-icon:search s-font:100 s-mbe:20"></i>
                                <p class="s-p">Search input</p>
                            </div>
                        </a>
                    </div>
                </li>
                @endforeach
            </ul>

        </div> 
        <div>
            <h4 class="s-typo:h4 s-mbe:30">
                Built-in <span class="s-tc:accent">recipes</span>
            </h4>
            <p class="s-typo:lead s-mbe:30">
                <span class="s-tc:accent">Recipe</span> is the term used by Coffeekraken to define <span class="s-tc:accent">project template</span>.
            </p>
            <p class="s-typo:p">
                You can check bellow the build-in and official Coffeekraken recipes available and ready to use. Each recipe comes with the development environment, the production testing environment, the full production build process as well as the complete documentation stack.
            </p>
        </div>   
    </div>

</section>