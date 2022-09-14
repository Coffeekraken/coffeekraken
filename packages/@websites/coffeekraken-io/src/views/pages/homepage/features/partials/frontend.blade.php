
<section id="features-frontend" class="section">
    <div class="s-container">

        <h3 class="s-typo:h2 s-mbe:30 @mobile s-typo:h4">Frontend<br><span class="s-tc:accent">Sugar</span></h3>
        <p class="s-typo:lead s-mbe:80">
            The goal of Coffeekraken is to help having a <span class="s-tc:complementary">better development
                experience</span>
            with a <span class="s-tc:accent">production ready quality grade</span>. Here's some areas where we can
            help you: </p>

        <div class="code-example-section" ">
            <div>
                <h4 class="s-typo:h4 s-mbe:30 s-pbs:30">
                    CSS made<br>
                    <span class="s-tc:accent">pleasant</span> again
                </h4>
                <ol class="s-list:ol s-color:accent">
                    <li>
                        Powerfull and <span class="s-typo:code">pleasant</span> classnames syntax
                    </li>
                    <li>
                        Color management simplified
                    </li>
                    <li>
                        Quick compilation through <a class="s-typo:a" href="https://vitejs.dev/"
                            title="ViteJs" target="_blank">ViteJs</a>
                    </li>
                    <li>
                        Automatic icons integration from <a class="s-typo:code" href="https://fontawesome.com/"
                            title="Fontawesome" target="_blank">Fontawesome</a>, <span
                            class="s-typo:code">filesystem</span>
                        and more...
                    </li>
                </ol>
            </div>
            <div>
                @include('generic.code.example', ['examples' => [
                'html' => '
                <!-- Pleasant syntax -->
                <h1 class="s-typo:h1 s-font:100">
                    Hello world
                </h1>
                <!-- Responsive classes -->
                <p class="s-typo:lead @mobile s-typo:p">
                    Hello world
                </p>
                <!-- Apply a specific color to a UI element -->
                <s-range class="s-color:accent" value="40"></s-range>
                <!-- Apply some margins and color -->
                <p class="s-tc:accent s-mbe:50 @mobile s-mbe:30">
                    Hello world
                </p>
                <!-- Extend with your own classes -->
                <div class="s-typo:p @mobile my-cool-class">
                    Hello world
                </div>',
                'css' => '/* import some globs */
                @sugar.import(\'../views/**/*.css\');
                /* init sugar (classes, resetcss, etc...) */
                @sugar.init;
                /* Register some new responsive classes */
                @sugar.media.classes(mobile) {
                .my-cool-class {
                color: red;
                font-size: 100px;
                }
                }
                /* list icons you want in your project */
                /* want the fontawesome "user" icon named as "custom-user" */
                @sugar.icons(
                fa:user:custom-user
                fa:fire
                fs:src/icons/copy.svg:copy
                );'
                ]])
            </div>
            <div>
                <a class="s-btn s-color:complementary @mobile s-btn:block" href="/doc/css/pleasant-syntax"
                    title="Coffeekraken CSS pleasant syntax">
                    Discover more!
                </a>
            </div>
        </div>



        <div class="code-example-section:right" ">
            <div>
                <h4 class="s-typo:h4 s-mbe:30 s-pbs:30">
                    <span class="s-tc:accent">Theming</span> made<br>
                    As tasty as a donut
                </h4>
                <ol class="s-list:ol s-color:accent">
                    <li>
                        Easy and Powerfull <span class="s-typo:code">color management</span>
                    </li>
                    <li>
                        Based on powerfull configuration system
                    </li>
                    <li>
                        Colors function to apply and tweak colors
                    </li>
                    <li>
                        Easy <span class="s-typo:code">dark mode</span> support
                    </li>
                </ol>
            </div>
            <div>
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
            <div>
                <a class="s-btn s-color:accent @mobile s-btn:block" href="/doc/css/theming" title="Coffeekraken CSS pleasant syntax">
                    Discover more!
                </a>
            </div>

        </div>

        <div class="code-example-section" ">
            <div>
                <h4 class="s-typo:h4 s-mbe:30 s-pbs:30">
                    <span class="s-tc:accent">Layout</span> finally<br>
                    Nice to work with
                </h4>
                <ol class="s-list:ol s-color:accent">
                    <li>
                        <span class="s-typo:code">No more</span> pre-defined columns
                    </li>
                    <li>
                        Auto-generated classes for your templates
                    </li>
                    <li>
                        Powerfull layout system to handle <span class="s-typo:code">simple</span> and
                        <span class="s-typo:code">complex</span>
                        layouts
                    </li>
                    <li>
                        Pre defined layouts as well as full custom capabilities
                    </li>
                </ol>
            </div>
            <div class="s-layout:12 s-gap:30">
                <div>
                    @include('generic.code.example', ['examples' => [
                    'css' => '/* defining some layouts */
                    .my-layout-2 {
                    @sugar.layout("1 2 _ 3 3");
                    }
                    /* This will gives you:
                        *
                        * |------|------|
                        * | 1    | 2    |
                        * |------|------|
                        * | 3           |
                        * |------|------|
                        *
                        */
                    ',
                    'html' => '
                    <!-- using my layout -->
                    <section class="my-layout-2">
                        <div>
                            <!-- content of area 1 -->
                        </div>
                        <div>
                            <!-- content of area 2 -->
                        </div>
                        <div>
                            <!-- content of area 3 -->
                        </div>
                    </section>'
                            ]])
                </div>

                <div class="@mobile s-hide">
                        @include('generic.code.example', ['examples' => [
                        'css' => '/* defining some layouts */
                        .my-layout-1 {
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
                        ',
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
                            <div>
                                <!-- content of area 4 -->
                            </div>
                        <section>'
                                ]])

                </div>
            </div>
            <div>
                <a class="s-btn s-color:complementary @mobile s-btn:block" href="/doc/css/layout"
                    title="Coffeekraken CSS pleasant syntax">
                    Discover more!
                </a>
            </div>

        </div>


</section>