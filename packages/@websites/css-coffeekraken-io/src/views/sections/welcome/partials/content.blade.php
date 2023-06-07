
    <div class="s-mbe:30 _logo">
        @include ('sugar.logos.coffeekraken.picto')
    </div>


    <h1 class="s-typo:h1:bold s-mbe:30">
        PostCSS<br />
        <span class="s-tc:complementary">Sugar</span> plugin
    </h1>

    <h2 class="s-typo:h3:bold s-mbe:50 @mobile s-typo:h5">
        The frontend <span class="s-tc:accent">CSS toolkit</span><br />that make our days better...
    </h2>

    <a class="s-btn s-color:accent s-mie:20 @mobile s-display:block" href="#get-started" title="Coffeekraken get started!">
        <i class="s-icon:fire"></i>
        Get started!
        <i class="s-icon:fire"></i>
    </a>
    <a class="s-btn s-color:complementary @mobile s-display:block" href="#documentation" title="PostCSS Sugar plugin documentation!">
        <i class="s-icon:documentation"></i>
        Documentation!
        <i class="s-icon:documentation"></i>
    </a>

    <p class="s-typo:p s-mbs:50 @dwarf hide">
        Version: <span class="s-tc:{{ str_contains($frontspec->package->version, 'alpha') ? 'error' : 'accent' }}">{{ $frontspec->package->version }}</span> - License <a class="s-tc:accent"
            href="https://opensource.org/licenses/MIT" target="_blank">{{ $frontspec->package->license }}</a>
        <br />Fully open source
        <i class="s-icon:logo-opensource s-tc:accent"></i>
    </p>