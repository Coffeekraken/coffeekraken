{{-- <template s-lazy id="examples"> --}}

    <section class="section">

        <div class="s-container">

            <div class="_layout s-mbe:50">
                
                <div>
                    <h2 class="s-typo:h3 s-mbe:30 s-tc:accent">
                        Examples
                    </h2>
                    <p class="s-typo:h5 s-mbe:30">
                        Here are some examples to <span class="s-tc:complementary">showcase the power</span> of our sugar css plugin.
                    </p>
                </div>

            </div>

            <div class="examples">

                <div class="_sidebar">
                    <a href="#example-index" s-activate group="examples" trigger="click,anchor,history" title="Example of index.css file using Coffeekraken postcss sugar plugin">
                        <i class="s-icon:examples"></i> index.css
                    </a>
                    <a href="#example-sugar" s-activate group="examples" trigger="click,anchor,history" title="Example of sugar.css file using Coffeekraken postcss sugar plugin">
                        <i class="s-icon:examples"></i> sugar.css
                    </a>
                    <a href="#example-layout" s-activate group="examples" trigger="click,anchor,history" title="Example using the @s.layout Coffeekraken postcss sugar plugin mixin">
                        <i class="s-icon:examples"></i> layout.css
                    </a>
                    <a href="#example-media" s-activate group="examples" trigger="click,anchor,history" title="Example using the @s.media Coffeekraken postcss sugar plugin mixin">
                        <i class="s-icon:examples"></i> media.css
                    </a>
                    <a href="#example-component" s-activate group="examples" title="Example using the scopes Coffeekraken postcss sugar plugin feature">
                        <i class="s-icon:examples"></i> component.css
                    </a>
                    <a href="#example-colors" s-activate group="examples" title="Example using the colors capabilities of the Coffeekraken postcss sugar plugin">
                        <i class="s-icon:examples"></i> colors.css
                    </a>
                    <a href="#example-icons" s-activate group="examples" title="Example using the icons capabilities of the Coffeekraken postcss sugar plugin">
                        <i class="s-icon:examples"></i> icons.css
                    </a>
                    <a href="#example-html" s-activate group="examples" title="Example of HTML using the Coffeekraken postcss sugar plugin">
                        <i class="s-icon:examples"></i> index.html
                    </a>
                </div>

                <div class="_content">

                    <div class="_code" id="example-sugar">

                            <s-code-example lines="100">
                                <template language="css">
    /**
    &nbsp;* Init s. This will import a reset css and print the
    &nbsp;* needed variables used across the toolkit classes.
    &nbsp;*/
    @s.init ($variant: 'dark');

    /**
    &nbsp;* Generate some utility classes like "s-tc:accent, s-mb:30", etc...
    &nbsp;* that depends on your theme configuration.
    &nbsp;* You can as well import only the classes you need.
    &nbsp;* See the API section for more details...
    &nbsp;*/
    @s.classes();
    @s.flex.classes(); /* import only the flex helper classes */

    /**
    &nbsp;* Generate media scoped classes to use like "@mobile s-pbe:100", etc...
    &nbsp;* that depends on your theme configuration
    &nbsp;*/
    @s.media.classes ('mobile,tablet,wide') {
    &nbsp;&nbsp;&nbsp;&nbsp;@s.margin.classes();
    &nbsp;&nbsp;&nbsp;&nbsp;@s.padding.classes();
    }
                                </template>
                            </s-code-example>

                    </div>

                    <div class="_code" id="example-index">
                        <s-code-example no-more>
                            <template language="css">
    &nbsp;
    /*
    *      ____
    *    / ____|Coffeekraken __ _ _ __
    *    \___ \| | | |/ _` |/ _` | `__|
    *     ___) | |_| | (_| | (_| | |
    *    |____/ \__,_|\__, |\__,_|_|
    *                 |___/
    */

    /* importing sugar toolkit */
    @s.import ('./sugar.css');

    /* importing other css */
    @s.import ('../views/**/*.css');
    @s.import ('./generic/**/*.css');

    /* make use of the sugar power */
    body {
    &nbsp;&nbsp;&nbsp;&nbsp;background: s.color(main, background);
    }
                            
                            </template>
                        </s-code-example>
                    </div>

                    <div class="_code" id="example-layout">
                        <s-code-example>
                            <template language="css">
    /* 
    &nbsp;* |------|------|------|
    &nbsp;* | 1    | 2    | 4    |
    &nbsp;* |-------------|      |
    &nbsp;* | 3      3    |      |
    &nbsp;* |-------------|------|
    &nbsp;*/
    .my-layout {
    &nbsp;&nbsp;&nbsp;&nbsp;@s.layout("1 2 4 _ 3 3 4");
    &nbsp;&nbsp;&nbsp;&nbsp;/* or */
    &nbsp;&nbsp;&nbsp;&nbsp;@s.layout("
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1 2 4
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3 3 4
    &nbsp;&nbsp;&nbsp;&nbsp;");
    }

                            
                            </template>
                        </s-code-example>
                    </div>

                    <div class="_code" id="example-media">
                        <s-code-example>
                            <template language="css">
    /**
    &nbsp;* The @s.media mixin allows you to apply media queries with ease.
    &nbsp;* Available breakpoints are "mobile", "tablet", "desktop" and "wide"
    &nbsp;* but can be cusotmize through the .sugar/themeMedia.config.ts file.
    &nbsp;* By default, the default action is "<=" (desktop first) but you can override
    &nbsp;* this as well in the same file.
    &nbsp;*/
    .my-element {
    &nbsp;&nbsp;&nbsp;&nbsp;background: s.color(complementary);

    &nbsp;&nbsp;&nbsp;&nbsp;/* apply another color for <= mobile */
    &nbsp;&nbsp;&nbsp;&nbsp;@s.media mobile {
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;background: s.color(main);
    &nbsp;&nbsp;&nbsp;&nbsp;}

    &nbsp;&nbsp;&nbsp;&nbsp;/* apply another color only on wide */
    &nbsp;&nbsp;&nbsp;&nbsp;@s.media >=wide {
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;background: s.color(accent);
    &nbsp;&nbsp;&nbsp;&nbsp;}
    }
                            
                            </template>
                        </s-code-example>
                    </div>

                    <div class="_code" id="example-component">
                        <s-code-example>
                            <template language="css">
    .my-component {
    &nbsp;&nbsp;&nbsp;&nbsp;background: s.color(main, surface);
    &nbsp;&nbsp;&nbsp;&nbsp;border: 1px solid s.color(main, border);
    &nbsp;&nbsp;&nbsp;&nbsp;padding: s.padding(30);
    &nbsp;&nbsp;&nbsp;&nbsp;@s.border.radius();
    &nbsp;&nbsp;&nbsp;&nbsp;@s.depth(100);

    &nbsp;&nbsp;&nbsp;&nbsp;&:hover {
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;border-color: s.color(accent, --alpha 0.3);
    &nbsp;&nbsp;&nbsp;&nbsp;}
    }
                            
                            </template>
                        </s-code-example>
                    </div>

                    <div class="_code" id="example-colors">
                        <s-code-example>
                            <template language="css">
    /**
    &nbsp;* Colors in a design toolkit is a central part.
    &nbsp;* Sugar let you define your own colors through
    &nbsp;* the .sugar/themeColor.config.ts
    &nbsp;* and using them with the convinient s.color function.
    &nbsp;* Default colors available are: "main", "accent",
    &nbsp;* "complementary", "success", "warning",
    &nbsp;* "error", "info" and "current" (more on this one) bellow.
    &nbsp;*/
    .my-element {
    &nbsp;&nbsp;&nbsp;&nbsp;background: s.color(main);
    }

    &nbsp;&nbsp;&nbsp;&nbsp;/**
                            * You can use modifiers like "lighten", "darken", "saturate", "desaturate",
                            * "spin" and "alpha" to tweak your color
                            */
    .my-element {
    &nbsp;&nbsp;&nbsp;&nbsp;color: s.color(main, --alpha 0.3 --lighten 10); 
    }

    &nbsp;&nbsp;&nbsp;&nbsp;/**
                            * For more convinience, some modifier "presets" are available like "text",
                            * "placeholder", "foreground", "background", "surface" and "border".
                            * These presets are defined and can be customized in the
                            * .sugar/themeColorSchema(Light|Dark).config.ts
                            */
    .my-element {
    &nbsp;&nbsp;&nbsp;&nbsp;color: s.color(accent, text);
    }

    /**
                            * The "current" color act like the "currentColor" css native value, but
                            * difference that it will have the value of the color defined with the
                            * @s.color mixin.
                            * It uses variables under the hood so the value will be propagated down
                            * just like any any other variables.
                            */
    .my-element {
    &nbsp;&nbsp;&nbsp;&nbsp;@s.color(accent);
    &nbsp;&nbsp;&nbsp;&nbsp;color: s.color(current);
    }                         
                            </template>
                        </s-code-example>
                    </div>
                    
                    <div class="_code" id="example-icons">
                        <s-code-example>
                            <template language="css">
    /**
    &nbsp;* Define some icons to be used with classes like "s-icon:github", etc...
    &nbsp;* Can be fontawesome icons using the "fa", "fab", "fas" and "far" protocol
    &nbsp;* Or can be some filesystem svg using the "fs" protocol (accept glob)
    &nbsp;* With glob: fs:src/icons/*
    &nbsp;* Without glob: fs:src/icon/my-cool-icon.svg:my-icon
    &nbsp;*/
    @s.icon.classes (
    &nbsp;&nbsp;&nbsp;&nbsp;fab:github
    &nbsp;&nbsp;&nbsp;&nbsp;fab:discord
    &nbsp;&nbsp;&nbsp;&nbsp;fab:twitter
    &nbsp;&nbsp;&nbsp;&nbsp;fab:facebook
    &nbsp;&nbsp;&nbsp;&nbsp;fab:patreon
    &nbsp;&nbsp;&nbsp;&nbsp;fab:instagram
    &nbsp;&nbsp;&nbsp;&nbsp;fs:src/icons/*
    &nbsp;&nbsp;&nbsp;&nbsp;fs:src/icons/kraken.svg
    );
                            
                            </template>
                        </s-code-example>
                    </div>

                    <div class="_code" id="example-html">
                        <s-code-example>
                            <template language="html">
    <!-- -->
    <!-- Applying the layout described in the layout.css file -->
    <div class="my-layout">
        <div><!-- area 1 -->
            <h1 class="s-typo:h1 s-mbe:30">Hello world</h1>
            <p class="s-typo:p">sunt cillum irure...</p>
        </div>
        <div><!-- area 2 -->
            <i class="s-icon:github"></i>
        </div>
        <div><!-- area 3 --></div>
        <div><!-- area 4 --></div>
    </div>                   
                            </template>
                        </s-code-example>
                    </div>

                </div>

            </div>

        </div>

    </section>

{{-- </template> --}}