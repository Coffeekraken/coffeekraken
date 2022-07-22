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

                <i class="__icon-1 s-icon:calendar s-tc:complementary s-font:80"></i>
                <i class="__icon-2 s-icon:color s-tc:accent s-font:80"></i>
                <i class="__icon-3 s-icon:github s-font:80"></i>
                <i class="__icon-4 s-icon:vite s-tc:complementary s-font:80"></i>
                <i class="__icon-5 s-icon:user s-tc:accent s-font:80"></i>
                <i class="__icon-6 s-icon:npm s-font:80"></i>

                <div class="__user-1" s-parallax amount="0.1">
                    <div class="s-avatar s-font:100">
                        <img src="https://i.pravatar.cc/300?v=42863" />
                    </div>
                    <div class="s-tooltip:left" s-parallax amount="0.05">
                        <p class="s-mbe:20 s-text:right">Olivier Bossel</p>
                        <s-rating value="4" readonly></s-rating>
                    </div>
                </div>

                <div class="__user-2" s-parallax amount="0.05">
                    <div class="s-avatar s-font:100">
                        <img src="https://i.pravatar.cc/300?v=4286e3" />
                    </div>
                    <div class="s-tooltip:left" s-parallax amount="0.05">
                    <p class="s-mbe:20 s-text:right">Olivier Bossel</p>
                        <s-rating value="5" readonly></s-rating>
                    </div>
                </div>

                <div class="__user-3" s-parallax amount="0.15">
                    <div class="s-avatar s-font:100">
                        <img src="https://i.pravatar.cc/300?v=42w863" />
                    </div>
                    <div class="s-tooltip:right" s-parallax amount="0.05">
                    <p class="s-mbe:20 s-text:left">Olivier Bossel</p>
                        <s-rating value="4" readonly></s-rating>
                    </div>
                </div>

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
                    <i class="s-icon:arrow-left s-mie:10"></i> Welcome
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
                    <i class="s-icon:arrow-left s-mie:10"></i> Slider
                </a>
                <a class="s-btn s-color:complementary s-mis:10" s-slider-next title="Discover our components!">
                    Slider <i class="s-icon:arrow-right s-mis:10"></i>
                </a>

            </div>

        </div>


    </s-slider>


</section>
