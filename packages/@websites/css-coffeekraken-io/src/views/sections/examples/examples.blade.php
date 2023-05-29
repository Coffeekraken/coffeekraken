<section class="section" id="examples">

    <div class="s-container">

        <div class="_layout s-mbe:50">
            
            <div>
                <i class="s-icon:examples _icon-title"></i>
                <h2 class="s-typo:h2 s-mbe:30 _title">
                    Examples
                </h2>
                <p class="s-typo:h4 s-mbe:30">
                    Here are some examples to showcase the power of our sugar css plugin.
                </p>
                <p class="s-typo:p s-mbe:30">
                    
                </p>
                {{-- <a href="https://postcss.org" class="s-btn s-color:complementary s-mbe:20" title="Discover PostCSS">
                    <i class="s-icon:more"></i>
                    Discover PostCSS
                    <i class="s-icon:more"></i>
                </a> --}}
                {{-- <a href="https://github.com/postcss/postcss#usage" class="s-btn s-color:accent" title="Setup PostCSS plugin">
                    <i class="s-icon:more"></i>
                        Setup PostCSS plugins
                    <i class="s-icon:more"></i>
                </a> --}}
            </div>

        </div>

        <div class="examples">

            <div class="_sidebar">
                <a href="#example-sugar" s-activate group="examples">
                    <i class="s-icon:examples"></i> sugar.css
                </a>
                <a href="#example-index" s-activate group="examples">
                    <i class="s-icon:examples"></i> index.css
                </a>
                <a href="#example-layout" s-activate group="examples">
                    <i class="s-icon:examples"></i> layout.css
                </a>
                <a href="#example-media" s-activate group="examples">
                    <i class="s-icon:examples"></i> media.css
                </a>
                <a href="#example-component" s-activate group="examples">
                    <i class="s-icon:examples"></i> component.css
                </a>
                <a href="#example-colors" s-activate group="examples">
                    <i class="s-icon:examples"></i> colors.css
                </a>
                <a href="#example-icons" s-activate group="examples">
                    <i class="s-icon:examples"></i> icons.css
                </a>
                <a href="#example-html" s-activate group="examples">
                    <i class="s-icon:examples"></i> index.html
                </a>
            </div>

            <div class="_content">

                 <div class="_code" id="example-sugar">

                        <s-code-example>
                            <template lang="css">
/**
* Init sugar. This will import a reset css and print the
* needed variables used across the toolkit classes.
*/
@sugar.init ($variant: 'dark');

/**
* Generate some utility classes like "s-tc:accent, s-mb:30", etc...
* that depends on your theme configuration.
* You can as well import only the classes you need.
* See the API section for more details...
*/
@sugar.classes();
@sugar.flex.classes(); /* import only the flex helper classes */

/**
* Generate media scoped classes to use like "@mobile s-pbe:100", etc...
* that depends on your theme configuration
*/
@sugar.media.classes ('mobile,tablet,wide') {
    @sugar.margin.classes();
    @sugar.padding.classes();
}
                            </template>
                        </s-code-example>

                </div>

                <div class="_code" id="example-index">
                    <s-code-example>
                        <template lang="css">
/* importing sugar toolkit */
@sugar.import ('./sugar.css');

/* importing other css */
@sugar.import ('../views/**/*.css');
@sugar.import ('./generic/**/*.css');

/* make use of the sugar power */
body {
    background: sugar.color(main, background);
}
                         
                        </template>
                    </s-code-example>
                </div>

                <div class="_code" id="example-layout">
                    <s-code-example>
                        <template lang="css">
/* defining some layouts */
 .my-layout {
    @sugar.layout("1 2 4 _ 3 2 4");
 }
 /* This will gives you:
 *
 * |------|------|------|
 * | 1    | 2    | 4    |
 * |------|      |      |
 * | 3    |      |      |
 * |------|------|------|
 *
 */
                         
                        </template>
                    </s-code-example>
                </div>

                <div class="_code" id="example-media">
                    <s-code-example>
                        <template lang="css">
/**
 * The @sugar.media mixin allows you to apply media queries with ease.
 * Available breakpoints are "mobile", "tablet", "desktop" and "wide"
 * but can be cusotmize through the .sugar/themeMedia.config.ts file.
 * By default, the default action is "<=" (desktop first) but you can override
 * this as well in the same file.
 */
.my-element {
    background: sugar.color(complementary);

    /* apply another color for <= mobile */
    @sugar.media mobile {
        background: sugar.color(main);
    }

    /* apply another color only on wide */
    @sugar.media >=wide {
        background: sugar.color(accent);
    }
}
                         
                        </template>
                    </s-code-example>
                </div>

                <div class="_code" id="example-component">
                    <s-code-example>
                        <template lang="css">
.my-component {
    background: sugar.color(main, surface);
    border: 1px solid sugar.color(main, border);
    padding: sugar.padding(30);
    @sugar.border.radius();
    @sugar.depth(100);

    &:hover {
        border-color: sugar.color(accent, --alpha 0.3);
    }
}
                         
                        </template>
                    </s-code-example>
                </div>

                <div class="_code" id="example-colors">
                    <s-code-example>
                        <template lang="css">
/**
 * Colors in a design toolkit is a central part.
 * Sugar let you define your own colors through the .sugar/themeColor.config.ts
 * and using them with the convinient sugar.color function.
 * Default colors available are: "main", "accent", "complementary", "success", "warning",
 * "error", "info" and "current" (more on this one) bellow.
 */
 .my-element {
    background: sugar.color(main);

    /**
     * You can use modifiers like "lighten", "darken", "saturate", "desaturate",
     * "spin" and "alpha" to tweak your color
     */
    color: sugar.color(main, --alpha 0.3 --lighten 10); 

    /**
     * For more convinience, some modifier "presets" are available like "text",
     * "placeholder", "foreground", "background", "surface" and "border".
     * These presets are defined and can be customized in the .sugar/themeColorSchema(Light|Dark).config.ts
     */
    color: sugar.color(accent, text);

    /**
     * The "current" color act like the "currentColor" css native value, but
     * difference that it will have the value of the color defined with the
     * @sugar.color mixin.
     * It uses variables under the hood so the value will be propagated down
     * just like any any other variables.
     */
    @sugar.color(accent);
    color: sugar.color(current);
 }                         
                        </template>
                    </s-code-example>
                </div>
                
                <div class="_code" id="example-icons">
                    <s-code-example>
                        <template lang="css">
/**
 * Define some icons to be used with classes like "s-icon:github", etc...
 * Can be fontawesome icons using the "fa", "fab", "fas" and "far" protocol
 * Or can be some filesystem svg using the "fs" protocol (accept glob)
 * With glob: fs:src/icons/*
 * Without glob: fs:src/icon/my-cool-icon.svg:my-icon
 */
@sugar.icon.classes (
    fab:github
    fab:discord
    fab:twitter
    fab:facebook
    fab:patreon
    fab:instagram
    fs:src/icons/*
    fs:src/icons/kraken.svg
);
                         
                        </template>
                    </s-code-example>
                </div>

                <div class="_code" id="example-html">
                    <s-code-example>
                        <template lang="html">
<!-- applying our layout generated in the layout.css example -->
<div class="my-layout">
    <!-- area 1 -->
    <div>
        <!-- typo h1 with a margin-bottom-end of "30". Spaces values available are 0-10-20...100 and can be customized through the .sugar/themeSpace.config.ts file -->
        <h1 class="s-typo:h1 s-mbe:30">
            Hello world
        </h1>
        <p class="s-typo:p">
            sunt cillum irure...
        </p>
    </div>
    <!-- area 2 -->
    <div>
    </div>
    <!-- area 3 -->
    <div>
    </div>
    <!-- area 4 -->
    <div>
    </div>
</div>                   
                        </template>
                    </s-code-example>
                </div>

            </div>

        </div>

    </div>

</section>