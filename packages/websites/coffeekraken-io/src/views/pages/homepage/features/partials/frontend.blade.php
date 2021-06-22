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