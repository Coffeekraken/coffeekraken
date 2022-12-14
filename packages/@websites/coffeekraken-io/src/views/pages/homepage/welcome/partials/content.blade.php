<div class="s-mbe:50 __logo">
    @include ('generic.logo')
</div>

<h1 class="s-typo:h4:bold s-mbe:50 @mobile s-typo:h5">The frontend toolkit<br>that works for <span
        class="s-gradient:text:accent">everyone</span>.<br />Experts, <span class="s-gradient:text:complementary">professionals</span> and
    new-comers<br /></h1>

{{-- <p class="s-typo:lead s-mbe:60 @mobile s-hide @dwarf hide">Everything you need like full <span class="s-tc:accent">UI components
        library</span>,<br />strong theming support as well as <span class="s-tc:complementary">full development
        stack</span> based<br />on <a href="https://vitejs.dev" class="s-tc:complementary" title="Vite js"
        target="_blank">Vite JS</a>. All of this with <span class="s-tc:accent">extreme customization</span>
    capabilities!</p> --}}

<a class="s-btn s-color:accent @mobile s-btn:block" href="/doc/get-started/get-started" title="Coffeekraken get started!">
    <i class="s-icon:fire s-mie:10"></i> Get started!
</a>
&nbsp;
<a class="s-btn s-color:complementary @mobile s-btn:block" s-slider-next title="Discover our components!">
    Take a quick features tour <i class="s-icon:arrow-right s-mis:10"></i>
</a>

{{-- 
<p class="s-typo:p s-mb:30">
    Still not convinced?
</p>

<a class="s-btn s-color:complementary @mobile s-btn:block" s-slider-next title="Discover our components!">
    Take a quick features tour <i class="s-icon:arrow-right s-mis:10"></i>
</a> --}}

<p class="s-typo:p s-mbs:50 @dwarf hide">
    Version: <span class="s-tc:accent">{{ $config->package->version }}</span> - License <a class="s-tc:accent"
        href="https://opensource.org/licenses/MIT" target="_blank">{{ $config->package->license }}</a>
    <br />Fully open source
    <i class="s-icon:logo-opensource s-tc:accent"></i>
</p>
