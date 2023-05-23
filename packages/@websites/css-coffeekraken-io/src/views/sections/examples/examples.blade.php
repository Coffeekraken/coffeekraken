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
                <a href="https://postcss.org" class="s-btn s-color:complementary s-mbe:20" title="Discover PostCSS">
                    <i class="s-icon:more"></i>
                    Discover PostCSS
                    <i class="s-icon:more"></i>
                </a>
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
            </div>

            <div class="_content">

                 <div class="_code" id="example-sugar">

                        <s-code-example>
                            <template lang="css">
/**
* Init sugar. This will import a reset css and print the
* needed variables
*/
@sugar.init ($variant: 'dark');

/**
* Generate some utility classes like "s-tc:accent, s-mb:30", etc...
* that depends on your theme configuration
*/
@sugar.classes();

/**
* Generate media scoped classes to use like "@mobile s-pbe:100", etc...
* that depends on your theme configuration
*/
@sugar.media.classes ('mobile,tablet,wide') {
    @sugar.margin.classes();
    @sugar.padding.classes();
}

/* @sugar.ui.menu.classes(); */
@sugar.ui.slider.classes();
@sugar.ui.googleMap.classes();
@sugar.ui.googleMapMarker.classes();

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
    sugar:misc-image:drop-file
    sugar:ui-help-solid:help
);

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

            </div>

        </div>

    </div>

</section>