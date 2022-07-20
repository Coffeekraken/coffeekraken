<section id="homepage-welcome">

    <div class="__content">

        <div s-appear in="bottom">
            @include('pages.homepage.welcome.partials.content')
        <div>

        <div class="s-tooltip:left s-color:complementary __tooltip-1" s-appear in="left" delay="900">
            Development stack
        </div>
        <div class="s-tooltip s-color:complementary __tooltip-2" s-appear in="right" delay="900">
            UI Components
        </div>
        <div class="s-tooltip s-color:accent __tooltip-3" s-appear in="top" delay="900">
            Production ready
        </div>

        <div class="s-avatar s-font:100 __avatar-1" s-appear in="right" delay="600">
            <img src="https://i.pravatar.cc/300?v=42863" />
        </div>
         <div class="s-avatar s-font:100 __avatar-2" s-appear in="bottom" delay="600">
            <img src="https://i.pravatar.cc/300?v=42863wefwef" />
        </div>
        <div class="s-avatar s-font:100 __avatar-3" s-appear in="top" delay="600">
            <img src="https://i.pravatar.cc/300?v=428632" />
        </div>

        <i class="s-icon:file-ts __icon-1" s-appear in="left" delay="700"></i>
        <i class="s-icon:file-css __icon-2" s-appear in="right" delay="700"></i>
        <i class="s-icon:file-html __icon-3" s-appear in="bottom" delay="700"></i>
        <i class="s-icon:logo-opensource __icon-4" s-appear in="top" delay="700"></i>
        <i class="s-icon:ui-tooltip __icon-5" s-appear in="bottom" delay="700"></i>

        <div class="s-loader:square-dots __loader-1" s-appear in="top" delay="500"></div>

        <div class="__color-picker s-color:accent" s-appear in="left" delay="800">
            <s-color-picker backdrop>
                <button class="s-btn">
                    <i class="s-icon:color"></i>
                </button>
            </s-color-picker>
        </div>

        <div class="__datetime-picker s-color:accent" s-appear in="right" delay="800">
            <s-datetime-picker calendar backdrop disable="weekend">
                <button class="s-btn">
                    <i class="s-icon:calendar"></i>
                </button>
            </s-datetime-picker>
        </div>

        

    </div>


</section>
