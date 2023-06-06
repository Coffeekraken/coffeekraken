
    <div class="s-mbe:30 _logo">
        @include ('sugar.logos.coffeekraken.picto')
    </div>


    <h1 class="s-typo:h1:bold s-mbe:30">
        
    </h1>

    <h2 class="s-typo:h3:bold s-mbe:50 @mobile s-typo:h5">
        The frontend <span class="s-tc:accent">CSS toolkit</span><br />that make our days better...
    </h2>

    <a class="s-btn s-color:accent @mobile s-display:block" href="#get-started" title="Coffeekraken get started!">
        <i class="s-icon:fire"></i>
        Get started!
        <i class="s-icon:fire"></i>
    </a>

    <p class="s-typo:p s-mbs:50 @dwarf hide">
        Version: <span class="s-tc:{{ str_contains($config->package->version, 'alpha') ? 'error' : 'accent' }}">{{ $config->package->version }}</span> - License <a class="s-tc:accent"
            href="https://opensource.org/licenses/MIT" target="_blank">{{ $config->package->license }}</a>
        <br />Fully open source
        <i class="s-icon:logo-opensource s-tc:accent"></i>
    </p>