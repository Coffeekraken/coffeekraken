<section id="homepage-welcome">

    <s-slider lnf="welcome-header" loop>

        <div s-slider-slide>

            <div class="__content">

                <div>
                    @include('pages.homepage.welcome.partials.content')
                </div>

                <i class="s-icon:file-js __icon-1"></i>
                <i class="s-icon:file-ts __icon-2"></i>
                <i class="s-icon:file-css __icon-3"></i>
                <i class="s-icon:file-md __icon-4"></i>

                {{-- <i class="__icon-1 s-icon:calendar s-tc:complementary s-font:80"></i>
                <i class="__icon-2 s-icon:color s-tc:accent s-font:80"></i>
                <i class="__icon-3 s-icon:github s-font:80"></i>
                <i class="__icon-4 s-icon:vite s-tc:complementary s-font:80"></i>
                <i class="__icon-5 s-icon:user s-tc:accent s-font:80"></i>
                <i class="__icon-6 s-icon:npm s-font:80"></i> --}}

                <ck-welcome-ratings></ck-welcome-ratings>

            </div>

        </div>

        <div s-slider-slide>

             <div class="__content">

                <h1 class="s-typo:h3:bold s-mbe:50 @mobile s-typo:h5">Our <span class="s-tc:complementary">clean</span><br /><span class="s-tc:accent">Theme Switcher</span></h1>

                <p class="s-typo:lead s-mbe:50 @mobile s-typo:p">
                    Our datetime picker support all <span class="s-tc:complementary">ISO formats</span>,<br />disabling weekends or <span class="s-tc:accent">specific dates</span> as well as min and max date...<br />All of this in a nice and clean package.
                </p>

                <s-theme-switcher></s-theme-switcher>

                <br />

                <a class="s-font:20 s-display:block s-mbs:30 s-mbe:50" href="/package/@coffeekraken/s-theme-switcher-component/doc/readme" title="Coffeekraken s-theme-switcher component">
                    <i class="s-icon:documentation s-mie:10"></i> Read the doc
                </a>

                <br />

                <a class="s-btn s-color:accent" s-slider-previous title="Discover our components!">
                    <i class="s-icon:arrow-left s-mie:10"></i> Welcome
                </a>
                <a class="s-btn s-color:complementary s-mis:10" s-slider-next title="Discover our components!">
                    Color picker <i class="s-icon:arrow-right s-mis:10"></i>
                </a>

            </div>

        </div>

        <div s-slider-slide>

             <div class="__content">

                <h1 class="s-typo:h3:bold s-mbe:50 @mobile s-typo:h5">Our <span class="s-tc:complementary">clean</span><br /><span class="s-tc:accent">Datetime picker</span></h1>

                <p class="s-typo:lead s-mbe:50 @mobile s-typo:p">
                    Our datetime picker support all <span class="s-tc:complementary">ISO formats</span>,<br />disabling weekends or <span class="s-tc:accent">specific dates</span> as well as min and max date...<br />All of this in a nice and clean package.
                </p>

                <s-datetime-picker input button calendar disable="weekend" class="s-color:main">
                </s-datetime-picker>

                <br />

                <a class="s-font:20 s-display:block s-mbs:30 s-mbe:50" href="/package/@coffeekraken/s-datetime-picker-component/doc/readme" title="Coffeekraken s-datetime-picker component">
                    <i class="s-icon:documentation s-mie:10"></i> Read the doc
                </a>

                <br />

                <a class="s-btn s-color:accent" s-slider-previous title="Discover our components!">
                    <i class="s-icon:arrow-left s-mie:10"></i> Theme switcher
                </a>
                <a class="s-btn s-color:complementary s-mis:10" s-slider-next title="Discover our components!">
                    Color picker <i class="s-icon:arrow-right s-mis:10"></i>
                </a>

            </div>

        </div>

        <div s-slider-slide>

             <div class="__content">

                <h1 class="s-typo:h3:bold s-mbe:50 @mobile s-typo:h5">Our <span class="s-tc:complementary">clean</span><br /><span class="s-tc:accent">Color picker</span></h1>

                <p class="s-typo:lead s-mbe:50 @mobile s-typo:p">
                    Our datetime picker support all <span class="s-tc:complementary">ISO formats</span>,<br />disabling weekends, <span class="s-tc:accent">specific dates</span> as well as min and max date...<br />All of this in a nice and clean package.
                </p>

                <s-color-picker input button class="s-color:main" format="hsla">
                </s-color-picker>

                <br />

                <a class="s-font:20 s-display:block s-mbs:30 s-mbe:50" href="/package/@coffeekraken/s-color-picker-component/doc/readme" title="Coffeekraken s-color-picker component">
                    <i class="s-icon:documentation s-mie:10"></i> Read the doc
                </a>

                <br />

                <a class="s-btn s-color:accent" s-slider-previous title="Discover our components!">
                    <i class="s-icon:arrow-left s-mie:10"></i> Datetime picker
                </a>
                <a class="s-btn s-color:complementary s-mis:10" s-slider-next title="Discover our components!">
                    Slider <i class="s-icon:arrow-right s-mis:10"></i>
                </a>

            </div>

        </div>


        <div s-slider-slide>

             <div class="__content">

                <h1 class="s-typo:h3:bold s-mbe:50 @mobile s-typo:h5">Our <span class="s-tc:complementary">clean</span><br /><span class="s-tc:accent">Slider</span></h1>

                <p class="s-typo:lead s-mbe:50 @mobile s-typo:p">
                    Our slider has built-in support for horizontal/vertical directions, as well as touch capabilities, extreme customization, and more...
                </p>

                <s-slider class="s-width:40 s-display:inline-block s-mbe:50" behavior="slideable" mousewheel controls nav>
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

                <a class="s-btn s-color:accent" s-slider-previous title="Discover our components!">
                    <i class="s-icon:arrow-left s-mie:10"></i> Color picker
                </a>
                <a class="s-btn s-color:complementary s-mis:10" s-slider-next title="Discover our components!">
                    Forms <i class="s-icon:arrow-right s-mis:10"></i>
                </a>

            </div>

        </div>

        <div s-slider-slide>

             <div class="__content">

                <h1 class="s-typo:h3:bold s-mbe:50 @mobile s-typo:h5">Our <span class="s-tc:complementary">clean</span><br /><span class="s-tc:accent">Forms</span></h1>

                <p class="s-typo:lead s-mbe:50 @mobile s-typo:p">
                    Our datetime picker support all <span class="s-tc:complementary">ISO formats</span>,<br />disabling weekends or <span class="s-tc:accent">specific dates</span> as well as min and max date...<br />All of this in a nice and clean package.
                </p>

                <form class="s-display:inline-block s-width:50">

                    <label class="s-label:responsive" s-form-validate email required>
                        <span>Email</span>
                        <div class="s-width:60">
                            <input
                                type="text"
                                class="s-input"
                                placeholder="olivier.bossel@gmail.com"
                            />
                        </div>
                    </label>

                    <label class="s-label:responsive s-mbs:30" s-form-validate="" password="strong">
                        <span>Password</span>
                        <div class="s-width:60">
                            <div class="s-input-container:addon">
                                <input
                                    type="text"
                                    class="s-input"
                                    required=""
                                    placeholder="olivierbossel"
                                />
                                <div class="__levels">
                                    <div class="__weak s-badge s-color:error">Weak</div>
                                    <div class="__medium s-badge s-color:warning">Medium</div>
                                    <div class="__strong s-badge s-color:success">Strong</div>
                                </div>
                            </div>
                        </div>
                    </label>

                    <label class="s-label:responsive s-mbs:30">
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

                <a class="s-font:20 s-display:block s-mbs:30 s-mbe:50" href="/package/@coffeekraken/s-theme-switcher-component/doc/readme" title="Coffeekraken s-theme-switcher component">
                    <i class="s-icon:documentation s-mie:10"></i> Read the doc
                </a>

                <br />

                <a class="s-btn s-color:accent" s-slider-previous title="Discover our components!">
                    <i class="s-icon:arrow-left s-mie:10"></i> Slider
                </a>
                <a class="s-btn s-color:complementary s-mis:10" s-slider-next title="Discover our components!">
                    Ranges <i class="s-icon:arrow-right s-mis:10"></i>
                </a>

            </div>

        </div>

        <div s-slider-slide>

             <div class="__content">

                <h1 class="s-typo:h3:bold s-mbe:50 @mobile s-typo:h5">Our <span class="s-tc:complementary">clean</span><br /><span class="s-tc:accent">Ranges</span></h1>

                <p class="s-typo:lead s-mbe:50 @mobile s-typo:p">
                    Our slider has built-in support for horizontal/vertical directions, as well as touch capabilities, extreme customization, and more...
                </p>

                <div class="s-display:inline-block s-width:50">
                    <s-range name="myCoolRange" value="90" class="s-color:accent s-mbe:30"></s-range>
                    <s-range name="myOtherRanfe" class="s-mbe:30 s-color:complementary" tooltip></s-range>
                    <s-range name="myOtherRanfe" class="s-mbe:30 s-color:accent" tooltip step="10"></s-range>
                    <div class="s-flex:align-center s-mbe:30">
                        <s-range name="myRangeWithTarget" value="30" target="#my-range-with-target-target"></s-range>
                        <span class="s-pis:20" id="my-range-with-target-target"></span>
                    </div>
                </div>

                <br />

                <a class="s-font:20 s-display:block s-mbs:30 s-mbe:30" href="/package/@coffeekraken/s-slider-component/doc/readme" title="Coffeekraken s-slider component">
                    <i class="s-icon:documentation s-mie:10"></i> Read the doc
                </a>

                <br />

                <a class="s-btn s-color:accent" s-slider-previous title="Discover our components!">
                    <i class="s-icon:arrow-left s-mie:10"></i> Forms
                </a>
                <a class="s-btn s-color:complementary s-mis:10" s-slider-next title="Discover our components!">
                    And helpers... <i class="s-icon:arrow-right s-mis:10"></i>
                </a>

            </div>

        </div>

        <div s-slider-slide>

             <div class="__content">

                <h1 class="s-typo:h3:bold s-mbe:50 @mobile s-typo:h5">A lot<br />of <span class="s-tc:accent">Helpers</span></h1>

                <p class="s-typo:lead s-mbe:50 @mobile s-typo:p">
                    Using Coffeekraken, you have access to a lot of helpers like:
                </p>

                <h3 class="s-typo:h5 s-mbe:20 s-display:inline-block">
                    CSS classes (postcss)
                </h3>
                <p class="s-font:50 s-mbe:30 s-color:accent">
                    <span class="s-badge:outline s-mie:10">Margins</span> <span class="s-badge:outline s-mie:10">Paddings</span> <span class="s-badge:outline s-mie:10">Colors</span> <span class="s-badge:outline s-mie:10">Flexbox</span> <span class="s-badge:outline s-mie:10">Typography</span> <span class="s-badge:outline s-mie:10">And more...</span>
                </p>

                <br />

                <h3 class="s-typo:h5 s-mbe:20 s-display:inline-block">
                    JS (browser)
                </h3>
                <p class="s-font:50 s-mbe:30 s-color:accent">
                    <span class="s-badge:outline s-mie:10">querySelectorLive</span> <span class="s-badge:outline s-mie:10">whenInViewport</span> <span class="s-badge:outline s-mie:10">deepMerge</span> <span class="s-badge:outline s-mie:10">deepProxy</span> <span class="s-badge:outline s-mie:10">isMobile</span> <span class="s-badge:outline s-mie:10">And more...</span>
                </p>

                <br />

                <h3 class="s-typo:h5 s-mbe:20 s-display:inline-block">
                    Node JS
                </h3>
                <p class="s-font:50 s-mbe:50 s-color:accent">
                    <span class="s-badge:outline s-mie:10">getFreePort</span> <span class="s-badge:outline s-mie:10">isChildProcess</span> <span class="s-badge:outline s-mie:10">hotkey</span> <span class="s-badge:outline s-mie:10">packageRoot</span> <span class="s-badge:outline s-mie:10">onProcessExit</span> <span class="s-badge:outline s-mie:10">And more...</span>
                </p>

                <br />

                <p class="s-font:30 s-mbe:50">
                    And a lot more...
                </p>


                <a class="s-btn s-color:accent" s-slider-previous title="Discover our components!">
                    <i class="s-icon:arrow-left s-mie:10"></i> Ranges
                </a>
                <a class="s-btn s-color:complementary s-mis:10" s-slider-next title="Discover our components!">
                    And more... <i class="s-icon:arrow-right s-mis:10"></i>
                </a>

            </div>

        </div>
        
        <div s-slider-slide>

             <div class="__content">

                <h1 class="s-typo:h3:bold s-mbe:50 @mobile s-typo:h5">And<br /><span class="s-tc:accent">Many more!</span></h1>

                <p class="s-typo:lead s-mbe:50 @mobile s-typo:p">
                    Coffeekraken is a <span class="s-tc:accent">modular exosystem</span> from which you can take <span class="s-tc:complementary">the elements you need and leave the rest aside</span>. Here's some of our available packages to discover:
                </p>

                <br />

                <div class="s-flex:wrap:justify-center s-font:50 s-gap:30 s-mbe:50">
                    @foreach($packages as $packageName => $packageObj)
                        <a href="{{ $packageObj->url }}" class="s-badge s-color:accent">{{ $packageName }}</a>
                    @endforeach
                </div>

                <br />

                <a class="s-btn s-color:accent" s-slider-previous title="Discover our components!">
                    <i class="s-icon:arrow-left s-mie:10"></i> Ranges
                </a>
                <a class="s-btn s-color:complementary s-mis:10" s-slider-next title="Discover our components!">
                    Back home <i class="s-icon:arrow-right s-mis:10"></i>
                </a>

            </div>

        </div>


    </s-slider>


</section>
