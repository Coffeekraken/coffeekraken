<section id="homepage-welcome">

    <s-slider lnf="welcome-header" loop>

        <div s-slider-slide>

            <div class="_content">

                <div>
                    @include('pages.homepage.welcome.partials.content')
                </div>

            </div>

        </div>

        {{-- <div s-slider-slide>

             <div class="_content">

                <h1 class="s-typo:h3:bold s-mbe:50 @mobile s-typo:h5 s-mbe:30">Our <span class="s-tc:complementary">clean</span><br /><span class="s-tc:accent">Theme Switcher</span></h1>

                <p class="s-typo:lead s-mbe:50 @mobile s-hide">
                    Our theme switcher allows you to easily <span class="s-tc:accent">change from one theme to another</span> with a nice dropdown, or like in this example, just the <span class="s-tc:complementary">light/dark mode switcher</span>...
                </p>

                <s-theme-switcher class="s-color:accent"></s-theme-switcher>

                <br />

                <a class="s-font:20 s-display:block s-mbs:30 s-mbe:50" href="/package/@coffeekraken/s-theme-switcher-component/doc/readme" title="Coffeekraken s-theme-switcher component">
                    <i class="s-icon:documentation s-mie:10"></i> Read the doc
                </a>

                <br />

                <div class="s-flex:justify-center s-gap:20 @mobile s-flex:column">
                    <a class="s-btn s-color:accent" s-slider-previous title="Discover our components!">
                        <i class="s-icon:arrow-left s-mie:10"></i> Welcome
                    </a>
                    <a class="s-btn s-color:complementary" s-slider-next title="Discover our components!">
                        Datetime picker <i class="s-icon:arrow-right s-mis:10"></i>
                    </a>
                </div>

            </div>

        </div> --}}

        <div s-slider-slide>

             <div class="_content">

                <h1 class="s-typo:h3:bold s-mbe:50 @mobile s-typo:h5 s-mbe:30">Our <span class="s-tc:complementary">clean</span><br /><span class="s-tc:accent">Datetime picker</span></h1>

                <p class="s-typo:lead s-mbe:50 @mobile s-hide">
                    Our datetime picker support all <span class="s-tc:complementary">ISO formats</span>,<br />disabling weekends or <span class="s-tc:accent">specific dates</span> as well as min and max date...<br />All of this in a nice and clean package.
                </p>

                <s-datetime-picker calendar disable="weekend">
                    <input type="text" class="s-input" placeholder="YYYY-MM-DD" value="2022-09-10" />
                </s-datetime-picker>

                <br />

                <a class="s-font:20 s-display:block s-mbs:30 s-mbe:50" href="/package/@coffeekraken/s-datetime-picker-component/doc/readme" title="Coffeekraken s-datetime-picker component">
                    <i class="s-icon:documentation s-mie:10"></i> Read the doc
                </a>

                <br />

                <div class="s-flex s-gap:20 @mobile s-flex:column">
                    <a class="s-btn s-color:accent" s-slider-previous title="Discover our components!">
                        <i class="s-icon:arrow-left s-mie:10"></i> Welcome
                    </a>
                    <a class="s-btn s-color:complementary" s-slider-next title="Discover our components!">
                        Color picker <i class="s-icon:arrow-right"></i>
                    </a>
                </div>

            </div>

        </div>

        <div s-slider-slide>

             <div class="_content">

                <h1 class="s-typo:h3:bold s-mbe:50 @mobile s-typo:h5 s-mbe:30">Our <span class="s-tc:complementary">clean</span><br /><span class="s-tc:accent">Color picker</span></h1>

                <p class="s-typo:lead s-mbe:50 @mobile s-hide">
                    Out color picker support multiple color format like <span class="s-tc:accent">HSL(A)</span>, <span class="s-tc:complementary">RGB(A)</span> and <span class="s-tc:accent">HEX(A)</span>. All of this with a lot more control options.
                </p>

                <s-color-picker class="s-color:main" format="hsla">
                    <input type="text" class="s-input" placeholder="hsla(30,100,50,1)" value="hsla(30,100,50,1)" />
                </s-color-picker>

                <br />

                <a class="s-font:20 s-display:block s-mbs:30 s-mbe:50" href="/package/@coffeekraken/s-color-picker-component/doc/readme" title="Coffeekraken s-color-picker component">
                    <i class="s-icon:documentation s-mie:10"></i> Read the doc
                </a>

                <br />

                <div class="s-flex s-gap:20 @mobile s-flex:column">
                    <a class="s-btn s-color:accent" s-slider-previous title="Discover our components!">
                        <i class="s-icon:arrow-left s-mie:10"></i> Datetime picker
                    </a>
                    <a class="s-btn s-color:complementary" s-slider-next title="Discover our components!">
                        Icons management<i class="s-icon:arrow-right s-mis:10"></i>
                    </a>
                </div>

            </div>

        </div>

        <div s-slider-slide>

             <div class="_content">

                <h1 class="s-typo:h3:bold s-mbe:50 @mobile s-typo:h5 s-mbe:30">Our <span class="s-tc:complementary">clean</span><br /><span class="s-tc:accent">Icons management</span></h1>

                <p class="s-typo:lead s-mbe:50 @mobile s-hide">
                    Icons are often a pain to manage. Here's our clean solution to make use of <span class="s-tc:complementary">Fontawesome</span> icons, as well as <span class="s-tc:accent">SVG</span> files. More sources can be added depending on the community needs...
                </p>

                <div class="@mobile s-mbe:30">
                    <s-code-example s-deps css="codeExample">
                        <template lang="css">
@sugar.icon.classes {
&nbsp;&nbsp;fa:calendar-alt:calendar
&nbsp;&nbsp;fab:npm
&nbsp;&nbsp;fa:search
&nbsp;&nbsp;fs:icons/chrome.svg:chromium
}
                        </template>
                        <template lang="html">
                            <i class="s-icon:calendar"></i>
                            <i class="s-icon:npm"></i>
                            <i class="s-icon:search"></i>
                            <i class="s-icon:chromium"></i>
<!-- Use your icons the same way
independantly of the source -->
                        </template>
                    </s-code-example>
                </div>

                <br />

                <a class="s-font:20 s-display:block s-mbs:20 s-mbe:30" href="/styleguide/ui/icons" title="Coffeekraken icons management">
                    <i class="s-icon:documentation s-mie:10"></i> Read the doc
                </a>

                <br />

                <div class="s-flex s-gap:20 @mobile s-flex:column">
                    <a class="s-btn s-color:accent" s-slider-previous title="Discover our components!">
                        <i class="s-icon:arrow-left s-mie:10"></i> Icons management
                    </a>
                    <a class="s-btn s-color:complementary" s-slider-next title="Discover our components!">
                         Forms <i class="s-icon:arrow-right s-mis:10"></i>
                    </a>
                </div>

            </div>

        </div>

        {{-- <div s-slider-slide>

             <div class="_content">

                <h1 class="s-typo:h3:bold s-mbe:50 @mobile s-typo:h5 s-mbe:30">Our <span class="s-tc:complementary">clean</span><br /><span class="s-tc:accent">Slider</span></h1>

                <p class="s-typo:lead s-mbe:50 @mobile s-hide">
                    Our slider has built-in support for <span class="s-tc:accent">horizontal/vertical</span> directions, as well as touch capabilities, <span class="s-tc:complementary">extreme customization</span>, and more...
                </p>

                <s-slider class="s-width:40 s-display:inline-block s-mbe:50 @mobile s-width:100" behavior="slideable" mousewheel controls nav>
                    <div s-slider-slide class="s-bg--accent">
                        <h1 class="s-typo:h1">Slide #1</h1>
                        <p class="s-typo:lead">Click and drag</p>
                    </div>
                    <div s-slider-slide class="s-bg:complementary">
                        <h1 class="s-typo:h1">Slide #2</h1>
                        <p class="s-typo:lead">Click and drag</p>
                    </div>
                    <div s-slider-slide class="s-bg:info">
                        <h1 class="s-typo:h1">Slide #3</h1>
                        <p class="s-typo:lead">Click and drag</p>
                    </div>
                    <div s-slider-slide class="s-bg:error">
                        <h1 class="s-typo:h1">Slide #4</h1>
                        <p class="s-typo:lead">Click and drag</p>
                    </div>
                </s-slider>

                <br />

                <a class="s-font:20 s-display:block s-mbs:30 s-mbe:30" href="/package/@coffeekraken/s-slider-component/doc/readme" title="Coffeekraken s-slider component">
                    <i class="s-icon:documentation s-mie:10"></i> Read the doc
                </a>

                <br />

                <div class="s-flex:justify-center s-gap:20 @mobile s-flex:column">
                    <a class="s-btn s-color:accent" s-slider-previous title="Discover our components!">
                        <i class="s-icon:arrow-left s-mie:10"></i> Icons management
                    </a>
                    <a class="s-btn s-color:complementary" s-slider-next title="Discover our components!">
                        Forms <i class="s-icon:arrow-right s-mis:10"></i>
                    </a>
                </div>

            </div>

        </div> --}}

        <div s-slider-slide>

             <div class="_content">

                <h1 class="s-typo:h3:bold s-mbe:50 @mobile s-typo:h5 s-mbe:30">Our <span class="s-tc:complementary">clean</span><br /><span class="s-tc:accent">Forms</span></h1>

                <p class="s-typo:lead s-mbe:50 @mobile s-hide">
                    We have a lot of form components for your to discover but here's a simple example of a login/signin form <span class="s-tc:accent">with validations</span> and responsive labels.
                </p>

                <form>

                    <label class="s-label:responsive" s-form-validate email required>
                        <span>Email</span>
                        <div>
                            <input
                                type="text"
                                class="s-input"
                                placeholder="olivier.bossel@gmail.com"
                            />
                        </div>
                    </label>

                    <label class="s-label:responsive s-mbs:30" s-form-validate="" password="strong">
                        <span>Password</span>
                        <div>
                            <div class="s-input-container:addon">
                                <input
                                    type="text"
                                    class="s-input"
                                    required=""
                                    placeholder="olivierbossel"
                                />
                                <div class="_levels">
                                    <div class="_weak s-badge s-color:error">Weak</div>
                                    <div class="_medium s-badge s-color:warning">Medium</div>
                                    <div class="_strong s-badge s-color:success">Strong</div>
                                </div>
                            </div>
                        </div>
                    </label>

                    <label class="s-label s-mbs:30">
                        <span>Remember me?</span>
                        <div>
                            <input
                                type="checkbox"
                                class="s-switch"
                            />
                        </div>
                    </label>

                    <div class="s-text:end s-mbs:30">
                        <input type="reset" class="s-btn" value="Reset!" />
                        {{-- <input
                            type="submit"
                            class="s-btn s-color:complementary s-ml:20"
                            value="Submit!"
                        /> --}}
                    </div>
                
                </form>

                <br />

                <a class="s-font:20 s-display:block s-mbs:30 s-mbe:50" href="/package/@coffeekraken/s-form-validate-feature/doc/readme" title="Coffeekraken s-theme-switcher component">
                    <i class="s-icon:documentation s-mie:10"></i> Read the doc
                </a>

                <br />


                <div class="s-flex s-gap:20 @mobile s-flex:column">
                    <a class="s-btn s-color:accent" s-slider-previous title="Discover our components!">
                        <i class="s-icon:arrow-left s-mie:10"></i> Icons management
                    </a>
                    <a class="s-btn s-color:complementary" s-slider-next title="Discover our components!">
                        Ranges <i class="s-icon:arrow-right s-mis:10"></i>
                    </a>
                </div>

            </div>

        </div>

        <div s-slider-slide>

             <div class="_content">

                <h1 class="s-typo:h3:bold s-mbe:50 @mobile s-typo:h5 s-mbe:30">Our <span class="s-tc:complementary">clean</span><br /><span class="s-tc:accent">Ranges</span></h1>

                <p class="s-typo:lead s-mbe:50 @mobile s-hide">
                    Ranges can be used for a lot of purposes. However, <span class="s-tc:accent">it often lacks of clear information about the value you are selecting</span>. Here's our ranges that handle that problem:
                </p>

                <div>
                    <s-range name="myCoolRange" value="90" class="s-color:accent s-mbe:30"></s-range>
                    <s-range name="myOtherRanfe" class="s-mbe:30 s-color:complementary" tooltip></s-range>
                    <s-range name="myOtherRanfe" class="s-mbe:30 s-color:accent" tooltip step="10"></s-range>
                    <div class="s-flex:align-center s-mbe:30">
                        <s-range name="myRangeWithTarget" value="30" target="#my-range-with-target-target"></s-range>
                        <span class="s-pis:20" id="my-range-with-target-target"></span>
                    </div>
                </div>

                <br />

                <a class="s-font:20 s-display:block s-mbs:30 s-mbe:30" href="/package/@coffeekraken/s-range-component/doc/readme" title="Coffeekraken s-slider component">
                    <i class="s-icon:documentation s-mie:10"></i> Read the doc
                </a>

                <br />

                <div class="s-flex s-gap:20 @mobile s-flex:column">
                    <a class="s-btn s-color:accent" s-slider-previous title="Discover our components!">
                        <i class="s-icon:arrow-left s-mie:10"></i> Forms
                    </a>
                    <a class="s-btn s-color:complementary" s-slider-next title="Discover our components!">
                        And helpers... <i class="s-icon:arrow-right s-mis:10"></i>
                    </a>
                </div>

            </div>

        </div>

        <div s-slider-slide>

             <div class="_content">

                <h1 class="s-typo:h3:bold s-mbe:50 @mobile s-typo:h5 s-mbe:30">A lot<br />of <span class="s-tc:accent">Helpers</span></h1>

                <p class="s-typo:lead s-mbe:50 @mobile s-hide">
                    Using Coffeekraken, you have access to a lot of helpers like:
                </p>

                <h3 class="s-typo:h5 s-mbe:20 s-display:inline-block">
                    CSS classes (postcss)
                </h3>
                <p class="s-font:50 s-mbe:30 s-color:accent">
                    <span class="s-badge:outline s-mie:10 s-mbe:20">Margins</span> <span class="s-badge:outline s-mie:10 s-mbe:20">Paddings</span> <span class="s-badge:outline s-mie:10 s-mbe:20">Colors</span> <span class="s-badge:outline s-mie:10 s-mbe:20">Flexbox</span> <span class="s-badge:outline s-mie:10 s-mbe:20">Typography</span> <span class="s-badge:outline s-mie:10 s-mbe:20">And more...</span>
                </p>

                <br />

                <h3 class="s-typo:h5 s-mbe:20 s-display:inline-block">
                    JS (browser)
                </h3>
                <p class="s-font:50 s-mbe:30 s-color:accent">
                    <span class="s-badge:outline s-mie:10 s-mbe:20">querySelectorLive</span> <span class="s-badge:outline s-mie:10 s-mbe:20">whenInViewport</span> <span class="s-badge:outline s-mie:10 s-mbe:20">deepMerge</span> <span class="s-badge:outline s-mie:10 s-mbe:20">deepProxy</span> <span class="s-badge:outline s-mie:10 s-mbe:20">isMobile</span> <span class="s-badge:outline s-mie:10 s-mbe:20">And more...</span>
                </p>

                {{-- <br />

                <div class="@mobile s-hide">
                    <h3 class="s-typo:h5 s-mbe:20 s-display:inline-block">
                        Node JS
                    </h3>
                    <p class="s-font:50 s-mbe:50 s-color:accent">
                        <span class="s-badge:outline s-mie:10 s-mbe:20">getFreePort</span> <span class="s-badge:outline s-mie:10 s-mbe:20">isChildProcess</span> <span class="s-badge:outline s-mie:10 s-mbe:20">hotkey</span> <span class="s-badge:outline s-mie:10 s-mbe:20">packageRoot</span> <span class="s-badge:outline s-mie:10 s-mbe:20">onProcessExit</span> <span class="s-badge:outline s-mie:10 s-mbe:20">And more...</span>
                    </p>

                    <br />
                </div> --}}

                <p class="s-font:30 s-mbe:50">
                    And a lot more...
                </p>

                <div class="s-flex s-gap:20 @mobile s-flex:column">
                    <a class="s-btn s-color:accent" s-slider-previous title="Discover our components!">
                        <i class="s-icon:arrow-left s-mie:10"></i> Ranges
                    </a>
                    {{-- <a class="s-btn s-color:complementary" s-slider-next title="Discover our components!">
                        And more... <i class="s-icon:arrow-right s-mis:10"></i>
                    </a> --}}
                    <a class="s-btn s-color:complementary" href="/doc/get-started/get-started"  title="Discover our components!">
                        Get started!</i>
                    </a>
                </div>

            </div>

        </div>
        
        {{-- <div s-slider-slide>

             <div class="_content">

                <h1 class="s-typo:h3:bold s-mbe:50 @mobile s-typo:h5 s-mbe:30">And<br /><span class="s-tc:accent">Many more!</span></h1>

                <p class="s-typo:lead s-mbe:50 @mobile s-hide">
                    Coffeekraken is a <span class="s-tc:accent">modular exosystem</span> from which you can take <span class="s-tc:complementary">the elements you need and leave the rest aside</span>. Here's some of our available packages to discover:
                </p>

                <br />

                <div class="s-display:inline-block s-width:70 s-mbe:50">
                    <div class="s-flex:wrap:justify-center s-font:50 s-gap:30">
                        @foreach($packages as $packageName => $packageObj)
                            @if ($loop->index > 4)
                                <a href="{{ $packageObj->url }}" class="s-badge:outline s-color:accent @mobile s-hide">{{ $packageName }}</a>
                            @else
                                <a href="{{ $packageObj->url }}" class="s-badge:outline s-color:accent">{{ $packageName }}</a>
                            @endif
                        @endforeach
                    </div>
                </div>

                <br />

                <div class="s-flex s-gap:20 @mobile s-flex:column">
                    <a class="s-btn s-color:accent" s-slider-previous title="Discover our components!">
                        <i class="s-icon:arrow-left s-mie:10"></i> Helpers
                    </a>
                    <a class="s-btn s-color:complementary" href="/doc/get-started/get-started"  title="Discover our components!">
                        Get started!</i>
                    </a>
                </div>

            </div>

        </div> --}}


    </s-slider>

    <div class="welcome-illustration-kraken">
        <svg xmlns="http://www.w3.org/2000/svg">
            <linearGradient id="gradient-accent">
                <stop class="_gradient-accent-start" offset="0"/>
                <stop class="_gradient-accent-end" offset="100%"/>
            </linearGradient>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg">
            <linearGradient id="gradient-complementary">
                <stop class="_gradient-complementary-start" offset="0"/>
                <stop class="_gradient-complementary-end" offset="100%"/>
            </linearGradient>
        </svg>

        <div class="_tentacule-01" s-parallax amount-tx="0.05" amount-ty="0.05" amount-r="0.2">
            <img s-inline src="/dist/img/illustrations/welcome/tentacule-01.svg" />
        </div>
        <div class="_tentacule-02" s-parallax amount-tx="0.1" amount-ty="0.3" amount-r="0.2">
            <img s-inline src="/dist/img/illustrations/welcome/tentacule-02.svg" />
        </div>
        <div class="_tentacule-03" s-parallax amount-tx="0.2" amount-ty="0.05" amount-r="0.2">
            <img s-inline src="/dist/img/illustrations/welcome/tentacule-03.svg" />
        </div>
        <div class="_tentacule-04" s-parallax amount-tx="0.05" amount-ty="0.1" amount-r="0.2">
            <img s-inline src="/dist/img/illustrations/welcome/tentacule-04.svg" />
        </div>
        <div class="_tentacule-05" s-parallax amount-tx="0.1" amount-ty="0.05" amount-r="0.2">
            <img s-inline src="/dist/img/illustrations/welcome/tentacule-05.svg" />
        </div>
        <div class="_tentacule-06" s-parallax amount-tx="0.05" amount-ty="0.1" amount-r="0.2">
            <img s-inline src="/dist/img/illustrations/welcome/tentacule-06.svg" />
        </div>
        <div class="_tentacule-07" s-parallax amount-tx="0.1" amount-ty="0" amount-r="0.2">
            <img s-inline src="/dist/img/illustrations/welcome/tentacule-07.svg" />
        </div>

        <div class="_cup">
            <img class="_dark" src="/dist/img/welcome/cup.png" />
            <img class="_light" src="/dist/img/welcome/cup-light.png" />
        </div>
        <div class="_smoke">
            <video playsinline autoplay muted loop>
                <source src="/dist/img/cup-smoke.webm" type="video/webm">
            </video>
        </div>
        
        <div class="_waves-cup" s-parallax amount-tx="0.06" amount-ty="0" amount-r="0">
            <img s-inline src="/dist/img/illustrations/welcome/waves-cup.svg" />
        </div>

        <div class="_waves-01" s-parallax amount-tx="0.1" amount-ty="0" amount-r="0">
            <img s-inline src="/dist/img/illustrations/welcome/waves-01.svg" />
        </div>
        <div class="_waves-02" s-parallax amount-tx="0.07" amount-ty="0" amount-r="0">
            <img s-inline src="/dist/img/illustrations/welcome/waves-02.svg" />
        </div>
        <div class="_waves-03" s-parallax amount-tx="0.1" amount-ty="0" amount-r="0">
            <img s-inline src="/dist/img/illustrations/welcome/waves-03.svg" />
        </div>
        <div class="_waves-04" s-parallax amount-tx="0.1" amount-ty="0" amount-r="0">
            <img s-inline src="/dist/img/illustrations/welcome/waves-04.svg" />
        </div>
        <div class="_waves-05" s-parallax amount-tx="0.1" amount-ty="0" amount-r="0">
            <img s-inline src="/dist/img/illustrations/welcome/waves-05.svg" />
        </div>
        <div class="_waves-06" s-parallax amount-tx="0.07" amount-ty="0" amount-r="0">
            <img s-inline src="/dist/img/illustrations/welcome/waves-06.svg" />
        </div>
        <div class="_waves-07" s-parallax amount-tx="0.1" amount-ty="0" amount-r="0">
            <img s-inline src="/dist/img/illustrations/welcome/waves-07.svg" />
        </div>
        <div class="_waves-08" s-parallax amount-tx="0.07" amount-ty="0" amount-r="0">
            <img s-inline src="/dist/img/illustrations/welcome/waves-08.svg" />
        </div>
        <div class="_waves-09" s-parallax amount-tx="0.1" amount-ty="0" amount-r="0">
            <img s-inline src="/dist/img/illustrations/welcome/waves-09.svg" />
        </div>
        <div class="_waves-10" s-parallax amount-tx="0.07" amount-ty="0" amount-r="0">
            <img s-inline src="/dist/img/illustrations/welcome/waves-10.svg" />
        </div>

        <div class="_shadow"></div>
        <div class="_discover-02">
            <ck-discover-welcome></ck-discover-welcome>
        </div>

    </div>

</section>