    <section id="features-ui" class="section:diagonal" s-appear>
        <div class="s-container">

            <h3 class="s-typo:h2 s-mbe:30 @mobile s-typo:h4">Full premium <span class="s-gradient:text:accent">UI<br>Components</span>
                library</h3>
            <p class="s-typo:lead s-mbe:50">
                As part of our ecosystem, you will have access to a nice list of <span class="s-tc:complementary">fully
                    customizable</span>, themeing ready UI
                library. This gives you access to components like:
            </p>

        </div>

        @php
            $uiCards = [
                [
                    (object) [
                        "title" => "Buttons",
                        "icon" => "ui-button",
                        "url" => "/styleguide/ui/button",
                        "image" => "https://picsum.photos/600/600?343ff6"
                    ],
                    (object) [
                        "title" => "Dropdowns",
                        "icon" => "ui-dropdown",
                        "url" => "/styleguide/ui/dropdown",
                        "image" => "https://picsum.photos/600/600?232323"
                    ],
                    (object) [
                        "title" => "Tooltip",
                        "icon" => "ui-tooltip",
                        "url" => "/styleguide/ui/tooltip",
                        "image" => "https://picsum.photos/600/600?343ff612s"
                    ]
                ],
                [
                    (object) [
                        "title" => "Switches",
                        "icon" => "ui-switch",
                        "url" => "/styleguide/form/switch",
                        "image" => "https://picsum.photos/600/600?3212ff6"
                    ],
                    (object) [
                        "title" => "Date picker",
                        "icon" => "ui-datepicker",
                        "url" => "/package/@coffeekraken/s-datetime-picker-component/styleguide/form/s-datetime-picker",
                        "image" => "https://picsum.photos/600/600?3111"
                    ],
                    (object) [
                        "title" => "Filtrable input",
                        "icon" => "ui-autocomplete",
                        "url" => "/package/@coffeekraken/s-filtrable-input-component/styleguide/ui/s-filtrable-input",
                        "image" => "https://picsum.photos/600/600?34wwqd2"
                    ]
                ],
                [
                    (object) [
                        "title" => "Loaders",
                        "icon" => "ui-loader",
                        "url" => "/styleguide/ui/loaders",
                        "image" => "https://picsum.photos/600/600?343ff6"
                    ],
                    (object) [
                        "title" => "Range input",
                        "icon" => "ui-range",
                        "url" => "/package/@coffeekraken/s-range-component/styleguide/form/s-range",
                        "image" => "https://picsum.photos/600/600?32e2e2e"
                    ],
                    (object) [
                        "title" => "Code example",
                        "icon" => "ui-code",
                        "url" => "/package/@coffeekraken/s-code-example-component/styleguide/ui/s-code-example",
                        "image" => "https://picsum.photos/600/600?3ewff"
                    ],
                ],
                [
                    (object) [
                        "title" => "Avatar",
                        "icon" => "ui-avatar",
                        "url" => "/styleguide/ui/avatar",
                        "image" => "https://picsum.photos/600/600?343dda"
                    ]
                ]
            ];
        @endphp

        <s-slider controls nav loop pad class="s-mbe:100 s-ratio:none ui-card-slider">
            

            @foreach ($uiCards as $section)

                <div s-slider-slide>
                    <div class="ui-card-container">

                        @foreach ($section as $card)
                            <a class="ui-card s-color:accent" href="{{ $card->url }}" title="Coffeekraken buttons" s-highlight="light" style="--image: url({{ $card->image }})" opacity="0.6">
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

            <div class="s-text:center s-pt:50">
                <p class="s-typo:lead s-mi:auto s-mbe:30">
                    Keep in mind that <span class="s-tc:accent">all of these features are
                        optional</span>. This mean that you can work with the things you like and <span
                        class="s-tc:complementary">let the rest aside</span>...
                </p>
                <a class="s-btn s-color:complementary @mobile s-btn:block" href="/doc/get-started/get-started"
                    title="Get started with Coffeekraken!">
                    Get started!
                </a>
            </div>

        </div>
    </section>