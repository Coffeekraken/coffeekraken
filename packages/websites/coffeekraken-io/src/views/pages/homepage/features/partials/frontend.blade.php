<section id="features-frontend" class="s-pb:100">
    <div class="s-container">

        <div class="section-top-background"></div>

        <h3 class="s-typo:h2 s-mbe:30">Frontend<br><span class="s-tc:accent">sugar</span></h3>
        <p class="s-typo:lead s-mbe:50">
            The goal of Coffeekraken is to help having a <span class="s-tc:complementary">better development
                experience</span>
            with a <span class="s-tc:accent">production ready quality grade</span>. Here's some areas where we can
            help you: </p>

        <div class="s-layout:112:gap-x:gap-between s-pb:50">
            <div>
                <div class="s-mbe:30 s-mis:-50">
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
            <div>
                <div class="sticky">
                    <div class="s-flex:align-center">
                        <i class="s-icon:file-css s-tc:main s-opacity:20 s-font:90"></i>
                        <h4 class="s-typo:h4 s-mbe:30 s-pbs:30 s-pis:20">
                            CSS made<br>
                            <span class="s-tc:accent">pleasant</span> again
                        </h4>
                    </div>
                    <ol class="s-list:ol s-color:accent s-mbe:50">
                        <li class="s-typo:p">
                            Powerfull and <span class="s-typo:code">pleasant</span> classnames syntax
                        </li>
                        <li class="s-typo:p">
                            Color management simplified
                        </li>
                        <li class="s-typo:p">
                            Quick compilation through <a class="s-typo:a" href="https://vitejs.dev/"
                                title="ViteJs" target="_blank">ViteJs</a>
                        </li>
                        <li class="s-typo:p">
                            Automatic icons integration from <a class="s-typo:code" href="https://fontawesome.com/"
                                title="Fontawesome" target="_blank">Fontawesome</a>, <span
                                class="s-typo:code">filesystem</span>
                            and more...
                        </li>
                    </ol>
                    <a class="s-btn s-color:accent" href="/doc/css/overview" title="Coffeekraken CSS pleasant syntax">
                        Discover more!
                    </a>
                </div>
            </div>
        </div>


        <div class="s-layout:122:gap-x:gap-between s-pb:50">
            <div>
                <div class="sticky">
                    <div class="s-flex:align-center">
                        <i class="s-icon:theme s-tc:main s-opacity:20 s-font:90"></i>
                        <h4 class="s-typo:h4 s-mbe:30 s-pbs:30 s-pis:30">
                            <span class="s-tc:accent">Theming</span> made<br>
                            As tasty as a donut
                        </h4>
                    </div>
                    <ol class="s-list:ol s-color:accent s-mbe:50">
                        <li class="s-typo:p">
                            Easy and Powerfull <span class="s-typo:code">color management</span>
                        </li>
                        <li class="s-typo:p">
                            Based on powerfull configuration system
                        </li>
                        <li class="s-typo:p">
                            Colors function to apply and tweak colors
                        </li>
                        <li class="s-typo:p">
                            Easy <span class="s-typo:code">dark mode</span> support
                        </li>
                    </ol>
                    <a class="s-btn s-color:accent" href="/doc/css/overview" title="Coffeekraken CSS pleasant syntax">
                        Discover more!
                    </a>
                </div>
            </div>
            <div>

                <div class="s-mbe:30 s-mie:-50">
                    @include('generic.code.example', ['examples' => [
                    'css' => "/* simple color management */
                    h1 {
                    color: sugar.color(accent);
                    &:hover {
                    color: sugar.color(accent, --darken 10);
                    }
                    @sugar.theme.when(dark) {
                    /* apply some css for dark mode */
                    }
                    }
                    "
                    ]])
                </div>
            </div>

        </div>

        <div class="s-layout:112:gap-x:gap-between s-pb:50">
            <div>
                <div class="s-mbe:30 s-mis:-50">
                    @include('generic.code.example', ['examples' => [
                    'css' => '/* defining some layouts */
                    .my-layout-1 {
                    @sugar.layout("1 2 _ 3 3");
                    }
                    .my-layout-2 {
                    @sugar.layout("1 2 _ 3 2");
                    }
                    '
                    ]])
                </div>
                <div class="s-mbe:30">
                    @include('generic.code.example', ['examples' => [
                    'html' => '
                    <!-- using my layout -->
                    <section class="my-layout-1">
                        <div>
                            <!-- content of area 1 -->
                        </div>
                        <div>
                            <!-- content of area 2 -->
                        </div>
                        <div>
                            <!-- content of area 3 -->
                        </div>
                        <div>'
                            ]])
                        </div>
                </div>
                <div>
                    <div class="sticky">
                        <div class="s-flex:align-center">
                            <i class="s-icon:layout s-tc:main s-opacity:20 s-font:90"></i>
                            <h4 class="s-typo:h4 s-mbe:30 s-pbs:30 s-pis:30">
                                <span class="s-tc:accent">Layout</span> finally<br>
                                Nice to work with
                            </h4>
                        </div>
                        <ol class="s-list:ol s-color:accent s-mbe:50">
                            <li class="s-typo:p">
                                <span class="s-typo:code">No more</span> pre-defined columns
                            </li>
                            <li class="s-typo:p">
                                Auto-generated classes for your templates
                            </li>
                            <li class="s-typo:p">
                                Powerfull layout system to handle <span class="s-typo:code">simple</span> and
                                <span class="s-typo:code">complex</span>
                                layouts
                            </li>
                            <li class="s-typo:p">
                                Pre defined layouts as well as full custom capabilities
                            </li>
                        </ol>
                        <a class="s-btn s-color:accent" href="/doc/css/overview"
                            title="Coffeekraken CSS pleasant syntax">
                            Discover more!
                        </a>
                    </div>
                </div>

            </div>

            {{-- <div class="s-layout:122:gap-x:gap-between s-pb:50">
                <div>
                    <div class="sticky">
                        <div class="s-flex:align-center">
                            <i class="s-icon:helpers s-tc:main s-opacity:20 s-font:90"></i>
                            <h4 class="s-typo:h4 s-mbe:30 s-pbs:30 s-pis:30">
                                <span class="s-tc:accent">Helpers</span> as<br>
                                Many as you need
                            </h4>
                        </div>
                        <ol class="s-list:ol s-color:accent s-mbe:30">
                            <li class="s-typo:p">
                                Helpers for things like <code class="s-typo:code">margin</code>, <code
                                    class="s-typo:code">padding</code>,
                                <code class="s-typo:code">color</code>, <code class="s-typo:code">depth</code>,
                                <code class="s-typo:code">radius</code>,<code class="s-typo:code">flex</code>,
                                <code class="s-typo:code">layout</code>,
                                and <span class="s-tc:complementary">many more</span>...
                            </li>
                            <li class="s-typo:p">
                                Helpers are following your theme configuration (margin, padding, color, etc...)
                            </li>
                            <li class="s-typo:p">
                                And more...
                            </li>
                        </ol>
                    </div>
                </div>
                <div>
                    <div class="s-mbe:30">
                        @include('generic.code.example', ['examples' => [
                        'css' => ".my-layout {
                        @sugar.layout('
                        1 2
                        3 3
                        ')
                        }
                        "
                        ]])
                    </div>
                    <div class="s-mbe:30">
                        @include('generic.code.example', ['examples' => [
                        'html' => '
                        <!-- defining my layout -->
                        <section class="my-layout">
                            <div>
                                <!-- content of area 1 -->
                                <h1>Hello World</h1>
                            </div>
                            <div>
                                <!-- content of area 2 -->
                            </div>
                            <div>
                                <!-- content of area 3 -->
                            </div>
                            <div>'
                                ]])

                            </div>

                    </div>



                </div>

                <div class="s-text:center s-pt:50 s-mis:-50">
                    <p class="s-typo:lead s-mi:auto s-mbe:30">
                        Keep in mind that <span class="s-tc:accent">all of these features are
                            optional</span>.
                        This
                        mean
                        that
                        you can work with the things you like and let the rest aside...
                    </p>
                    <a class="s-btn s-color:complementary" href="/#get-started" title="Get started!">
                        Get started!
                    </a>
                </div>

            </div> --}}

</section>
