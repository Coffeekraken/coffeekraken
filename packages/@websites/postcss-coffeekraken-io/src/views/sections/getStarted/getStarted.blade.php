<section class="section" id="get-started">

    <div class="s-container">

        <div class="_layout">
            
            <div>
                <i class="s-icon:start _icon-title"></i>
                <h2 class="s-typo:h2 s-mbe:30 _title">
                    Get started
                </h2>
                <p class="s-typo:h4 s-mbe:30">
                    Install the <span class="s-tc:complementary">PostCSS plugin</span><br />and start working!
                </p>
                <p class="s-typo:p s-mbe:30">
                    Our PostCSS plugin can be installed just as any other ones. For more informations about PostCSS, please refer to the official website.
                </p>
                <a href="https://postcss.org" target="_blank" class="s-btn s-color:complementary s-mbe:20" title="Discover PostCSS">
                    <i class="s-icon:more"></i>
                    Discover PostCSS
                    <i class="s-icon:more"></i>
                </a>
            </div>

            <div>

                <div class="step s-mbe:50" step="1">
                    <s-code-example>
                        <template language="bash">
    npm i @coffeekraken/s-postcss-sugar-plugin
                        </template>
                    </s-code-example>
                </div>

                <div class="step" step="2">

                    <s-code-example>
                        <template language="js">
// Create a postcss.config.js file at your project root
module.exports = {
    plugins: [
        require('@coffeekraken/s-postcss-sugar-plugin')
    ]
};
                        </template>
                    </s-code-example>
                </div>

            </div>

        </div>

    </div>

</section>