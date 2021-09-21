<section id="features-webcomponents" class="s-container s-pb:100">
    <div class="s-grid:122:gutter-x:gutter-between">

        <div>
            <h3 class="s-typo:h3 s-mbe:30">
                Fully customizable
                <br /><span class="s-color:complementary">webcomponents</span>
            </h3>
            <p class="s-typo:p s-mbe:30">
                Some features are clearly missing in our web browsers these days like a searchable/filtrable select input for example.
                In order to help with that, Coffeekraken provide some fully customisable and framework agnostic webcomponents that you can
                simply import and use in less than a minute...
            </p>
            <a class="s-btn:complementary" href="/#get-started" title="Get started!">
                Get started!
            </a>
        </div>

        <div>
            <div class="s-mbe:30">
                @include('generic.code.example', ['examples' => [
                    'js' => '// import webcomponents
import \'@coffeekraken/s-filtrable-input\';
import \'@coffeekraken/s-clipboard-copy\';
import \'@coffeekraken/s-code-example\';
// etc...'
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
            Some of our webcomponents
        </h4>

        <ul class="__webcomponents-grid s-mbe:50">
            @foreach (['complementary','accent','complementary','accent','complementary','accent','complementary','accent','complementary','accent'] as $i)
            <li>
                <div class="s-ratio:1-1 s-bg:accent s-border:radius s-depth:50">
                    <a href="/" title="">
                        <div class="s-text:center s-color:accent-foreground s-align:abs-center">
                            <i class="s-icon:search s-font:100 s-mbe:20"></i>
                            <p class="s-p">Search input</p>
                        </div>
                    </a>
                </div>
            </li>
            @endforeach
        </ul>

        <div class="s-text:center">
            <p class="s-typo:p-lead s-mi:auto s-mbe:30">
                There are just some of our webcomponents listed.<br>
                A lot of other components are and will be available throught time. Keep updated by joining us.
            </p>
            <a class="s-btn:complementary" href="/#get-started" title="Get started!">
                Check out more of our webcomponents!
            </a>
        </div>

    </div>

</section>