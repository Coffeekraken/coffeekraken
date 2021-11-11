<section id="features-webcomponents" class="s-container s-pb:100">

    <div class="section-top-background"></div>

    <div class="s-layout:122:gutter-x:gutter-between">

        <div>
            <h3 class="s-typo:h3 s-mbe:30">
                Fully customizable
                <br /><span class="s-tc:accent">webcomponents</span>
            </h3>
            <p class="s-typo:p s-mbe:40">
                Some features are clearly missing in our web browsers these days like a searchable/filtrable select input for example.
                In order to help with that, Coffeekraken provide some fully customisable and framework agnostic webcomponents that you can
                simply import and use in less than a minute...
            </p>
            <a class="s-btn s-color:accent" href="/doc/" title="Get started!">
                Get started with webcomponents!
            </a>
        </div>

        <div>
            <div class="s-mbe:30">
                @include('generic.code.example', ['examples' => [
                    'js' => '// import webcomponents
import { define } from  \'@coffeekraken/s-clipboard-copy\';
// define it (you can customize the tagName and settings if needed...)
define();
// use it...'
                ]])
            </div>

            <div>
                @include('generic.code.example', ['examples' => [
                    'html' => '<p id="paragraph">
Something cool...
</p>
<s-clipboard-copy target="#paragraph"></s-clipboard-copy>'
                ]])
            </div>

        </div>
    </div>

    <div class="s-pbs:50">

        <h4 class="s-typo:h4 s-mbe:50">
            Some of our <span class="s-tc:accent">webcomponents</span>
        </h4>

        <ul class="__webcomponents-grid s-mbe:50">
            <li>
                <a href="/" title="">
                    <div class="icon-card s-color:accent" style="background-image: url(/src/img/icon-card/test.gif);">
                            <i class="s-icon:autocomplete"></i>
                            <p class="s-p">Filtrable Input</p>
                    </div>
                </a>
            </li>
            <li>
                <a href="/" title="">
                    <div class="icon-card s-color:complementary" style="background-image: url(/src/img/icon-card/test.gif);">
                            <i class="s-icon:copy"></i>
                            <p class="s-p">Clipbord copy</p>
                    </div>
                </a>
            </li>
            <li>
                <a href="/" title="">
                    <div class="icon-card s-color:accent" style="background-image: url(/src/img/icon-card/test.gif);">
                            <i class="s-icon:range"></i>
                            <p class="s-p">Range Input</p>
                    </div>
                </a>
            </li>
            <li>
                <a href="/" title="">
                    <div class="icon-card s-color:complementary" style="background-image: url(/src/img/icon-card/test.gif);">
                            <i class="s-icon:code"></i>
                            <p class="s-p">Code Example</p>
                    </div>
                </a>
            </li>
            <li>
                <a href="/" title="">
                    <div class="icon-card s-color:accent" style="background-image: url(/src/img/icon-card/test.gif);">
                            <i class="s-icon:datepicker"></i>
                            <p class="s-p">Date Picker</p>
                    </div>
                </a>
            </li>
        </ul>

        <div class="s-text:center">
            <p class="s-typo:lead s-mi:auto s-mbe:50">
                These are just some of our webcomponents.<br>
                <span class="s-tc:accent">A lot of others</span> are and will be available throught time.<br />
                <span class="s-tc:complementary">Keep updated by joining us</span>.
            </p>
            <a class="s-btn s-color:complementary" href="/#get-started" title="Get started!">
                Check out more of our webcomponents!
            </a>
        </div>

    </div>

</section>