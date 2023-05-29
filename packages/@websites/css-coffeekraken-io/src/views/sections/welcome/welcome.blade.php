<section id="homepage-welcome">

    <div class="_content">
        <div class="_left">
            @include('sections.welcome.partials.content')
        </div>
    </div>

    <div class="_illustration">
        <div welcome-slider>
            <div class="_04">
                <div class="_line">
                    <div class="_comment">/* useful mixins and functions */</div>
                </div>
                <div class="_line"><span class="s-tc:accent">@sugar.media</span> <span class="s-tc:error">mobile</span> {</div>
                <div class="_line"><span class="s-tc:info">&nbsp;&nbsp;&nbsp;&nbsp;padding</span>:&nbsp;<span class="s-tc:accent">sugar.padding</span> (<span class="s-tc:complementary">30</span>);</div>
                <div class="_line">}</div>
            </div>
            <div class="_05">
                <div class="_line">
                    &lt;h1 <span class="s-tc:info">class</span>=<span class="s-tc:accent">"s-typo:h1 s-mbe:30"</span>&gt;
                </div>
                <div class="_line _text">
                    &nbsp;&nbsp;&nbsp;&nbsp;Helper classes
                </div>
                <div class="_line">
                    &lt;/h1&gt;
                </div>
            </div>
            <div class="_06">
                <div class="_line">
                    <div class="_comment">// easy customization</div>
                </div>
                <div class="_line">
                    <span class="s-tc:error">export default {</span>
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
                    &nbsp;&nbsp;&nbsp;&nbsp;<span class="_comment">// etc...</span>
                </div>
                <div class="_line">
                    <span class="s-tc:accent">}</span>
                </div>
            </div>
        </div>
    </div>

</section>