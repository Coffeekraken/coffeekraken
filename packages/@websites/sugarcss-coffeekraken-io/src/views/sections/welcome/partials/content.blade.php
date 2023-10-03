
<div class="_title">
    @include ('sugar.logos.coffeekraken.picto')

    <h1 class="s-typo:h3:bold">
        <span class="s-tc:accent">Sugar</span>css
    </h1>
</div>

<h2 class="s-typo:h2:bold s-mbe:50">
    The frontend <span class="s-tc:complementary">CSS</span> <span class="s-tc:accent">toolkit</span><br />that make our days better...
</h2>

<div class="ctas">
    <a class="s-btn s-color:accent" href="#get-started" title="Coffeekraken get started!">
        <i class="s-icon:fire"></i>
        Get started!
        <i class="s-icon:fire"></i>
    </a>
    <a class="s-btn s-color:complementary" href="#documentation" title="PostCSS Sugar plugin documentation!">
        <i class="s-icon:documentation"></i>
        Documentation!
        <i class="s-icon:documentation"></i>
    </a>
</div>

<p class="s-typo:p s-mbs:50 @dwarf hide">
    Version: <span class="s-tc:{{ str_contains($frontspec->package->version, 'alpha') ? 'error' : 'accent' }}">{{ $frontspec->package->version }}</span> - License <a class="s-tc:accent"
        href="https://opensource.org/licenses/MIT" title="Fully open source" target="_blank">{{ $frontspec->package->license }}</a>
    <br />Fully open source
    <i class="s-icon:logo-opensource s-tc:accent"></i>
</p>