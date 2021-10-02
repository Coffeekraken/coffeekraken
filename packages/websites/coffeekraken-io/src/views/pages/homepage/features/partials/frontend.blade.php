<section id="features-frontend" class="s-container s-pb:100">

    <h3 class="s-typo:h3 s-mbe:30">Frontend<br><span class="s-tc:accent">sugar</span></h3>
    <p class="s-typo:p s-mbe:50">
        The goal of Coffeekraken is to help having a better development experience with
        a production ready quality grade. Here's some areas where we can help you:
    </p>

    <div class="s-layout:112:gutter-x:gutter-between:align-center s-pb:50">
        <div>  

            <div class="s-mbe:30">
                @include('generic.code.example', ['examples' => [
                    'html' => '<ul class="s-list\:ul\:icon">
<li>
<i class="s-icon\:custom-user"></i>
Hello <span class="s-tc:accent">world</span>
</li>
<li>
<i class="s-icon\:fire"></i>
This is <span class="s-font\:bold">a cool</span> list
</li>
<li>
<i class="s-icon\:copy"></i>
Cool don\'t you think?
</li>
</ul>'
                ]])
            </div>

        </div>
        <div>
            <h4 class="s-typo:h4 s-mbe:30">
                Templates (<span class="s-tc:accent">html</span>, <span class="s-tc:accent">BladePhp</span>, <span class="s-tc:accent">Twig</span>, <span class="s-tc:accent">etc...</span>)
            </h4>
            <ol class="s-list:ol:accent s-mbe:30">
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

    <div class="s-layout:122:gutter-x:gutter-between:align-center s-pb:50">
        <div>
            <h4 class="s-typo:h4 s-mbe:30">
                CSS made<br>
                <span class="s-tc:accent">pleasant</span> again
            </h4>
            <ol class="s-list:ol:accent s-mbe:30">
                <li class="s-typo:p">
                    Powerfull and pleasant classnames syntax
                </li>
                <li class="s-typo:p">
                    Color management simplified
                </li>
                <li class="s-typo:p">
                    Theme handling like <span class="s-tc:complementary">light</span>, <span class="s-tc:complementary">dark</span>, etc...
                </li>
                <li class="s-typo:p">
                    Quick compilation through <a class="s-typo:a" href="https://vitejs.dev/" title="ViteJs" target="_blank">ViteJs</a>
                </li>   
                <li class="s-typo:p">
                    Automatic icons integration from <a class="s-typo:a" href="https://fontawesome.com/" title="Fontawesome" target="_blank">Fontawesome</a>, <span class="s-tc:complementary">filesystem</span> and more...
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
            <div class="s-mbe:30">
                @include('generic.code.example', ['examples' => [
                    'css' => '/* import some globs */
@sugar.import(\'../views/**/*.css\');
/* init sugar (classes, resetcss, etc...) */
@sugar.init;
/* list icons you want in your project */
/* want the fontawesome "user" icon named as "custom-user" */
@sugar.icons(
fa:user:custom-user
fa:fire
fs:src/icons/copy.svg:copy
);'
                ]])
            </div>
        </div>    
    </div>

    <div class="s-layout:112:gutter-x:gutter-between:align-center s-pb:50">
        <div>  

            <div class="s-mbe:30">
                @include('generic.code.example', ['examples' => [
                    'html' => '<ul class="s-list\:ul\:icon">
<li>
<i class="s-icon\:custom-user"></i>
Hello <span class="s-tc:accent">world</span>
</li>
<li>
<i class="s-icon\:fire"></i>
This is <span class="s-font\:bold">a cool</span> list
</li>
<li>
<i class="s-icon\:copy"></i>
Cool don\'t you think?
</li>
</ul>'
                ]])
            </div>
        </div>
        <div>
            <h4 class="s-typo:h4 s-mbe:30">
                Javascript made<br><span class="s-tc:accent">reliable</span>
            </h4>
            <ol class="s-list:ol:accent s-mbe:30">
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

    <div class="s-text:center s-pt:50 s-mis:-50">
        <p class="s-typo:p-lead s-mi:auto s-mbe:30">
            Keep in mind that <span class="s-tc:accent">all of these features are optional</span>. This mean that
            you can work with the things you like and let the rest aside...
        </p>
        <a class="s-btn:complementary" href="/#get-started" title="Get started!">
            Get started!
        </a>
    </div>

</section>