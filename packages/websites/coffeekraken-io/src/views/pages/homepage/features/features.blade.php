<div id="homepage-features">

    <section class="__header s-container s-py:100">

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

    </section>

    <section class="s-container">
        
        <nav class="__tabs">
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
        </nav>

        <div class="__contents">
            <section id="features-development">
                
                <div class="s-grid:122:gutter-x:gutter-between">

                    <div class="s-py:100 s-rhythm-vertical">
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
            <section id="features-frontend">
                <h1>Frontend system</h1>
            </section>
            <section id="features-webcomponents">
                <h1>Versatile webcomponents</h1>
            </section>
            <section id="features-sugar">
                <h1>Sugar toolkit</h1>
            </section>
            <section id="features-documentation">
                <h1>Documentation at your fingertips</h1>
            </section>
        </div>

    </section>

</div>