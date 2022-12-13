
    <section id="features-helpers" class="section" s-appear>
        <div class="s-container">

            <div class="section-top-background"></div>

            <h3 class="s-typo:h2 s-mbe:30 @mobile s-typo:h4">All the <span class="s-tc:accent">helpers<br></span> you ever
                need</h3>
            <p class="s-typo:lead s-mbe:50">
                Helpers are a nice way to <span class="s-tc:accent">speed up your workflow</span> as well as keeping your
                code organized. No need of a
                special <code class="s-typo:code">.css</code> for everything when <span class="s-tc:complementary">a simple
                    helper do the job</span>!.
            </p>

        </div>

        @php
            $uiCards = [
                [
                    (object) [
                        "title" => "Text align",
                        "icon" => "ui-align",
                        "url" => "/styleguide/helpers/text",
                        "image" => "https://picsum.photos/600/600?align"
                    ],
                    (object) [
                        "title" => "Typography",
                        "icon" => "ui-typography",
                        "url" => "/styleguide/helpers/typography",
                        "image" => "https://picsum.photos/600/600?typo"
                    ],
                    (object) [
                        "title" => "Colors",
                        "icon" => "theme-colors",
                        "url" => "/styleguide/helpers/colors",
                        "image" => "https://picsum.photos/600/600?color"
                    ]
                ],
                [
                    (object) [
                        "title" => "Flexbox",
                        "icon" => "css-flex",
                        "url" => "/styleguide/helpers/flexbox",
                        "image" => "https://picsum.photos/600/600?flexbox"
                    ],
                    (object) [
                        "title" => "Ratios",
                        "icon" => "layout-ratio",
                        "url" => "/styleguide/helpers/ratio",
                        "image" => "https://picsum.photos/600/600?ratio"
                    ],
                    (object) [
                        "title" => "Border radius",
                        "icon" => "css-radius",
                        "url" => "/styleguide/helpers/radius",
                        "image" => "https://picsum.photos/600/600?radius"
                    ]
                ],
                [
                    (object) [
                        "title" => "Transitions",
                        "icon" => "animation-easing",
                        "url" => "/styleguide/helpers/transition",
                        "image" => "https://picsum.photos/600/600?transition"
                    ],
                    (object) [
                        "title" => "Spaces",
                        "icon" => "layout-space",
                        "url" => "/styleguide/helpers/margin",
                        "image" => "https://picsum.photos/600/600?space"
                    ],
                    (object) [
                        "title" => "Visibility",
                        "icon" => "misc-eye",
                        "url" => "/styleguide/helpers/visibility",
                        "image" => "https://picsum.photos/600/600?visibility"
                    ],
                ],
                [
                    (object) [
                        "title" => "Scales",
                        "icon" => "layout-scale",
                        "url" => "/styleguide/tools/scale",
                        "image" => "https://picsum.photos/600/600?scale"
                    ]
                ]
            ];
        @endphp

        <s-slider controls nav loop pad class="s-mbe:100 s-ratio:none ui-card-slider">
            
            @foreach ($uiCards as $section)

                <div s-slider-slide>
                    <div class="ui-card-container">

                        @foreach ($section as $card)
                            <a class="ui-card s-color:complementary" href="{{ $card->url }}" title="Coffeekraken buttons" s-highlight="light" style="--image: url({{ $card->image }})" opacity="0.6">
                                <div class="ui-card__content">
                                    <i class="s-icon:{{ $card->icon }}"></i>
                                    <p class="s-p">{{ $card->title }}</p>
                                </div>
                            </a>
                        @endforeach
            
                    </div>
                </div>

            @endforeach

        </s-slider>

        <div class="s-container">

            <div class="s-text:center s-pt:50 s-mis:-50 @mobile s-mis:0">
                <p class="s-typo:lead s-mi:auto s-mbe:30">
                    Keep in mind that <span class="s-tc:accent">all of these features are
                        optional</span>.
                    This
                    mean
                    that
                    you can work with the things you like and <span class="s-tc:complementary">let the rest aside</span>...
                </p>
                <a class="s-btn s-color:complementary @mobile s-btn:block" href="/doc/get-started/get-started"
                    title="Get started with Coffeekraken!">
                    Get started!
                </a>
            </div>

        </div>

    </section>