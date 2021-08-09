<section id="features-webcomponents" class="s-py:100">
    <div class="s-grid:122:gutter-x:gutter-between">

        <div>
            <h3 class="s-typo:h3 s-mb:30">
                Fully customizable
                <br /><span class="s-color:complementary">webcomponents</span>
            </h3>
            <p class="s-typo:p s-mb:30">
                Some features are clearly missing in our web browsers these days like a searchable/filtrable select input for example.
                In order to help with that, Coffeekraken provide some fully customisable and framework agnostic webcomponents that you can
                simply import and use in less than a minute...
            </p>
            <a class="s-btn:complementary" href="/#get-started" title="Get started!">
                Get started!
            </a>
        </div>

        <div>
            <s-code-example>
                <template lang="js">
// import webcomponents
import '@coffeekraken/s-filtrable-input';
import '@coffeekraken/s-clipboard-copy';
import '@coffeekraken/s-code-example';
// etc...
                </template>
            </s-code-example>

            <s-code-example class="s-mt:50 s-mr:-50 s-ml:50">
                <template lang="html">
<p id="paragraph">
Something cool...
</p>
<s-clipboard-copy target="#paragraph"></s-clipboard-copy>
                </template>
            </s-code-example>

        </div>
    </div>

    <div class="s-pt:50">

        <h4 class="s-typo:h4 s-mb:50">
            Some of our webcomponents
        </h4>

        <ul class="__webcomponents-grid s-mb:50">
            @foreach (['complementary','accent','complementary','accent','complementary','accent','complementary','accent','complementary','accent'] as $i)
            <li>
                <div class="s-ratio:1-1 s-bg:accent s-border:radius s-depth:50">
                    <a href="/" title="">
                        <div class="s-text:center s-color:accent-foreground s-align:abs-center">
                            <i class="s-icon:search s-font:100 s-mb:20"></i>
                            <p class="s-p">Search input</p>
                        </div>
                    </a>
                </div>
            </li>
            @endforeach
        </ul>

        <div class="s-text:center">
            <p class="s-typo:p-lead s-mx:auto s-mb:30">
                There are just some of our webcomponents listed.<br>
                A lot of other components are and will be available throught time. Keep updated by joining us.
            </p>
            <a class="s-btn:complementary" href="/#get-started" title="Get started!">
                Check out more of our webcomponents!
            </a>
        </div>

    </div>

</section>