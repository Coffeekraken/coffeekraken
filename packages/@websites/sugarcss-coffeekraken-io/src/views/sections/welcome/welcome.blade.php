<section class="section" id="homepage-welcome" viewport-aware>

    {{-- <pre>
        @php
        print_r(\SViews\specs\readViewSpec('sugar.views.sections.hero'));
        @endphp
    </pre> --}}

    <div class="s-container">

        <div class="_content">
            @include('sections.welcome.partials.content')
        </div>

        <div class="_illustration">
            <img class="_cup-bkg -light" s-parallax amount-x="0.05" amount-y="0" src="/dist/img/cup-bkg-light.png" alt="Coffeekraken coffee cup background" />
            <img class="_cup-bkg -dark" s-parallax amount-x="0.05" amount-y="0" src="/dist/img/cup-bkg.png" alt="Coffeekraken coffee cup background" />
            <div class="_round _round-1" s-parallax amount-x="0.2" amount-y="0.03">
                <i class="s-icon:display"></i>
            </div>
            <div class="_round _round-2" s-parallax amount-x="0.1" amount-y="0.1"></div>
            <div class="_round _round-6" s-parallax amount-x="0.15" amount-y="0.16"></div>
            <video class="_cup-smoke" src="/dist/video/cup-smoke.webm" s-parallax amount-x="0.03" amount-y="0" autoplay muted loop></video>
            <img class="_cup -light" src="/dist/img/cup-light.png" s-parallax amount-x="0.03" amount-y="0" alt="Coffeekraken coffee cup" />
            <img class="_cup -dark" src="/dist/img/cup.png" s-parallax amount-x="0.03" amount-y="0" alt="Coffeekraken coffee cup" />
            <div class="_round _round-3" s-parallax amount-x="0.1" amount-y="0.05"></div>
            <div class="_round _round-4" s-parallax amount-x="0.54" amount-y="0.1" amount-r="0.2">
                <i class="s-icon:brush"></i>
            </div>
            <div class="_round _round-5" s-parallax amount-x="0.3" amount-y="0.15">
                <i class="s-icon:scissors"></i>
            </div>
        </div>

        {{-- <div class="_illustration">

            <div welcome-slider>
PGet
                <div class="_code">
    <div class="_line _comment">░░░&nbsp;&nbsp;&nbsp;░░░&nbsp;░░░░░░░░░</div>
    <div class="_line _comment">░░░&nbsp;&nbsp;&nbsp;░░░&nbsp;&nbsp;&nbsp;&nbsp;░░░</div>
    <div class="_line _comment">░░░&nbsp;&nbsp;&nbsp;░░░&nbsp;&nbsp;&nbsp;&nbsp;░░░</div>
    <div class="_line _comment">░░░&nbsp;&nbsp;&nbsp;░░░&nbsp;&nbsp;&nbsp;&nbsp;░░░</div>
    <div class="_line _comment">░░░░░░░░░&nbsp;░░░░░░░░░</div>
                    <div class="_line">&nbsp;</div>
                    <div class="_line _comment">Complete framework agnostic UI library</div>
                    <div class="_line">
                        <span class="s-tc--accent">Avatar</span>
                        <span class="s-tc--complementary">Buttons</span>
                        <span class="s-tc--error">Dropdown</span>
                        <span class="s-tc--accent">Radio</span>
                    </div>
                    <div class="_line">
                        <span class="s-tc--info">Tooltips</span>
                        <span class="s-tc--complementary">Blockquote</span>
                        <span class="s-tc--accent">Fs Tree</span>
                        <span class="s-tc--error">Input</span>
                        <span class="">Labels</span>
                        <span class="s-tc--accent">Lists</span>
                        </div>
                    <div class="_line">
                        <span class="s-tc--complementary">Loaders</span>
                        <span class="s-tc--info">Select</span>
                        <span class=>Tabs</span>
                        <span class="s-tc--error">Badges</span>
                        <span class="s-tc--complementary">Range</span>
                        <span class="s-tc--info">Table</span>
                        <span class="s-tc--complementary">Toggles</span>
                        </div>
                    <div class="_line">
                        <span class="s-tc--error">Checkbox</span>
                        <span class="s-tc--complementary">Card</span>
                        <span class="s-tc--info">Typography</span>
                        <span class="s-tc--error">Media</span>
                        <span class="">Icons</span>
                        <span class="s-tc--accent">Switch</span>
                    </div>
                </div>

                <div class="_code">
    <div class="_line _comment"><span class="s-tc--accent">░░░░░░░░░░░░░░░░░░░░░░</span></div>
    <div class="_line _comment"><span class="s-tc--error">░░░░░░░</span>&nbsp;<span class="s-tc--white">Styled</span>&nbsp;<span class="s-tc--error">░░░░░░░</span></div>
    <div class="_line _comment"><span class="s-tc--info">░░░░░░░░░░░░░░░░░░░░░░</span></div>
    <div class="_line _comment">&nbsp;</div>
    <div class="_line _comment">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░░░░░░░░░░░░░░░░░░</div>
    <div class="_line _comment">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░&nbsp;&nbsp;&nbsp;&nbsp;<span class="s-tc--white">Unstyled</span>&nbsp;&nbsp;&nbsp;&nbsp;░░</div>
    <div class="_line _comment">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░░░░░░░░░░░░░░░░░░</div>
                    <div class="_line _comment">&nbsp;</div>
                    <div class="_line">
                        <div class="_comment">Styled components</div>
                    </div>
                    <div class="_line"><span class="s-tc:accent">sugar.ui.button</span>;</div>
                    <div class="_line">
                        <div class="_comment">Unstyled components</div>
                    </div>
                    <div class="_line"><span class="s-tc:accent">sugar.ui.button (<span class="s-tc--complementary">$scope: bare</span>)</span>;</div>
                </div>

                <div class="_code">
    <div class="_line _comment">░░░&nbsp;&nbsp;&nbsp;░░░&nbsp;░░░░░░░░░&nbsp;░░░░░░░░░</div>
    <div class="_line _comment">░░░&nbsp;&nbsp;&nbsp;░░░&nbsp;░░░&nbsp;&nbsp;&nbsp;░░░&nbsp;░░░</div>
    <div class="_line _comment">░░░░░░░░░&nbsp;░░░░░░░░░&nbsp;░░░░░░░░░</div>
    <div class="_line _comment">░░░&nbsp;&nbsp;&nbsp;░░░&nbsp;░░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░</div>
    <div class="_line _comment">░░░&nbsp;&nbsp;&nbsp;░░░&nbsp;░░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░░░░░░░</div>
                    <div class="_line">&nbsp;</div>
                    <div class="_line _comment">Helper classes</div>
                    <div class="_line s-tc:error">
                        &lt;h1 <span class="s-tc:info">class</span>=<span class="s-tc:accent">"s-typo:h1 s-p:30 s-radius<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;s-bg:accent s-depth:40 s-mbe:30"</span>&gt;
                    </div>
                    <div class="_line _text">
                        &nbsp;&nbsp;&nbsp;&nbsp;Colors, spaces, fonts, flex,<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;depth, typography, etc...
                    </div>
                    <div class="_line s-tc:error">
                        &lt;/h1&gt;
                    </div>
                </div>

                <div class="_code">
                    <div class="_line _comment">░░░ <span class="s-tc--accent">░</span> ░░░░░░░░░░░░░░░ Hue</div>
                    <div class="_line _comment">&nbsp;</div>
                    <div class="_line _comment">░░░░░░░░░░░░░░░ <span class="s-tc--complementary">░</span> ░░░ Saturation</div>
                    <div class="_line _comment">&nbsp;</div>
                    <div class="_line _comment">░░░░░░ <span class="s-tc--error">░</span> ░░░░░░░░░░░░ Lightness</div>
                    <div class="_line _comment">&nbsp;</div>
                    <div class="_line _comment">░░░░░░░░░░ <span class="s-tc--info">░</span> ░░░░░░░░ Alpha</div>
                    <div class="_line _comment">&nbsp;</div>
                    <div class="_line">
                        <div class="_comment">Color manipulation</div>
                    </div>
                    <div class="_line"><span class="s-tc:accent">sugar.color</span> (<span class="s-tc:complementary">accent</span>);</div>
                    <div class="_line _comment">Using defined color schema</div>
                    <div class="_line"><span class="s-tc:accent">sugar.color</span> (<span class="s-tc:complementary">accent</span>, <span class="s-tc:error">background</span>);</div>
                    <div class="_line _comment">With inline modifier</div>
                    <div class="_line"><span class="s-tc:accent">sugar.color</span> (<span class="s-tc:complementary">accent</span>, <span class="s-tc:error">--alpha 0.3</span>);</div>
                </div>

                <div class="_code">
                    <div class="_line _comment">░░░░░░░░░░░░░░░░░░░░░░░░░░░░░</div>
                    <div class="_line _comment">░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░</div>
                    <div class="_line _comment">░░&nbsp;&nbsp;&nbsp;<span class="s-tc--accent">1</span>&nbsp;&nbsp;&nbsp;░░&nbsp;&nbsp;&nbsp;<span class="s-tc--complementary">2</span>&nbsp;&nbsp;&nbsp;░░&nbsp;&nbsp;&nbsp;<span class="s-tc--error">4</span>&nbsp;&nbsp;&nbsp;░░</div>
                    <div class="_line _comment">░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░</div>
                    <div class="_line _comment">░░░░░░░░░░░░░░░░░░░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░</div>
                    <div class="_line _comment">░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░</div>
                    <div class="_line _comment">░░&nbsp;&nbsp;&nbsp;<span class="s-tc--info">3</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="s-tc--info">3</span>&nbsp;&nbsp;&nbsp;░░&nbsp;&nbsp;&nbsp;<span class="s-tc--error">4</span>&nbsp;&nbsp;&nbsp;░░</div>
                    <div class="_line _comment">░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░</div>
                    <div class="_line _comment">░░░░░░░░░░░░░░░░░░░░░░░░░░░░░</div>
                    <div class="_line">&nbsp;</div>
                    <div class="_line _comment">Easy complexe layout creation</div>
                    <div class="_line"><span class="s-tc:accent">@sugar.layout</span> <span class="_comment">("</span></div>
                    <div class="_line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="s-tc--accent">1</span> <span class="s-tc--complementary">2</span> <span class="s-tc--error">4</span></div>
                    <div class="_line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="s-tc--info">3</span> <span class="s-tc--info">3</span> <span class="s-tc--error">4</span></div>
                    <div class="_line _comment">");</div>
                </div>

                <div class="_code">

    <div class="_line _comment">░░░░░░░░░░░░░░░░░░░░░░░░░░</div>
    <div class="_line _comment">░░░░░░░░░░░░░░░░░░░░░░░░░░</div>
    <div class="_line _comment">░░░</div>
    <div class="_line _comment">░░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="s-tc--complementary">░░░░░░░░░░░</span></div>
    <div class="_line _comment">░░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="s-tc--complementary">░░</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="s-tc--complementary">░░</span></div>
    <div class="_line _comment">░░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="s-tc--complementary">░░</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="s-tc--white">░░░░░░░░░</span></div>
    <div class="_line _comment">░░░░░░░░░░░░░░&nbsp;&nbsp;&nbsp;<span class="s-tc--complementary">░░</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="s-tc--white">░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░</span></div>
    <div class="_line _comment">░░░░░░░░░░░░░░&nbsp;&nbsp;&nbsp;<span class="s-tc--complementary">░░</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="s-tc--white">░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░</span></div>
    <div class="_line _comment">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░░░&nbsp;&nbsp;&nbsp;<span class="s-tc--complementary">░░</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="s-tc--white">░░</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="s-tc--white">░░</span></div>
    <div class="_line _comment">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░░░░&nbsp;&nbsp;&nbsp;<span class="s-tc--complementary">░░░░░░░</span><span class="s-tc--white">░░░░░░░░░</span></div>

    <div class="_line">&nbsp;</div>
                    <div class="_line">
                        <div class="_comment">Responsive like no other</div>
                    </div>
                    <div class="_line"><span class="s-tc:accent">@sugar.media</span> <span class="s-tc:error">mobile</span> { <span class="_comment">...</span> }</div>
                    <div class="_line"><span class="s-tc:accent">@sugar.media</span> <span class="s-tc:error">=mobile|</span> { <span class="_comment">...</span> }</div>
                    <div class="_line"><span class="s-tc:accent">@sugar.media</span> <span class="s-tc:error">>=tablet</span> { <span class="_comment">...</span> }</div>
                    <div class="_line"><span class="s-tc:accent">@sugar.media</span> <span class="s-tc:error">desktop</span> { <span class="_comment">...</span> }</div>
                </div>

                

                <div class="_code">
    <div class="_line _comment">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░░░░░░</div>
    <div class="_line _comment">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░░░░░░░░░░░░░░░░</div>
    <div class="_line _comment">&nbsp;&nbsp;&nbsp;&nbsp;░░░░░░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░░░░</div>
    <div class="_line _comment">&nbsp;&nbsp;░░░░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="s-tc--info">░░░░</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░░░</div>
    <div class="_line _comment">&nbsp;░░░░&nbsp;&nbsp;<span class="s-tc--complementary">░░░░</span>&nbsp;&nbsp;<span class="s-tc--info">░░░░</span>&nbsp;&nbsp;<span class="s-tc--error">░░░░</span>&nbsp;&nbsp;░░░░</div>
    <div class="_line _comment">░░░░&nbsp;&nbsp;&nbsp;<span class="s-tc--complementary">░░░░</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="s-tc--error">░░░░</span>&nbsp;&nbsp;&nbsp;░░░░</div>
    <div class="_line _comment">░░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░</div>
    <div class="_line _comment">░░░&nbsp;&nbsp;<span class="s-tc--accent">░░░░</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░░</div>
    <div class="_line _comment">░░░&nbsp;&nbsp;<span class="s-tc--accent">░░░░</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░░</div>
    <div class="_line">&nbsp;</div>
                    <div class="_line">
                        <div class="_comment">Easy theming</div>
                    </div>
                    <div class="_line"><span class="s-tc:accent">@sugar.theme.when</span> <span class="s-tc:error">dark</span> {</div>
                    <div class="_line _comment">&nbsp;&nbsp;&nbsp;&nbsp;apply some style...</div>
                    <div class="_line">}</div>
                </div>

                <div class="_code">
    <div class="_line _comment">░░░░░░░░░&nbsp;░░░&nbsp;&nbsp;&nbsp;░░░&nbsp;░░░░░░░░░</div>
    <div class="_line _comment">░░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░░&nbsp;&nbsp;░░░&nbsp;░░░</div>
    <div class="_line _comment">░░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░&nbsp;░&nbsp;░░░&nbsp;░░░░░░░░</div>
    <div class="_line _comment">░░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░&nbsp;&nbsp;░░░░&nbsp;░░░</div>
    <div class="_line _comment">░░░░░░░░░&nbsp;░░░&nbsp;&nbsp;&nbsp;░░░&nbsp;░░░</div>

                    <div class="_line">&nbsp;</div>
                    <div class="_line">
                        <div class="_comment">Easy customization</div>
                    </div>
                    <div class="_line">
                        <span class="s-tc:error">export default</span> <span class="_comment">{</span>
                    </div>
                    <div class="_line">
                        &nbsp;&nbsp;&nbsp;&nbsp;<span class="s-tc:complementary">main</span>: <span class="s-tc:accent">'#6F7C90'</span>,
                    </div>
                    <div class="_line">
                        &nbsp;&nbsp;&nbsp;&nbsp;<span class="s-tc:complementary">accent</span>: <span class="s-tc:accent">'#ffbb00'</span>,
                    </div>
                    <div class="_line">
                        &nbsp;&nbsp;&nbsp;&nbsp;<span class="s-tc:complementary">complementary</span>: <span class="s-tc:accent">'#5100ff'</span>
                    </div>
                    <div class="_line">
                        &nbsp;&nbsp;&nbsp;&nbsp;<span class="_comment">etc...</span>
                    </div>
                    <div class="_line _comment">
                        }
                    </div>
                </div>

            

            </div>
        </div> --}}

    </div>

</section>