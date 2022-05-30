<!--
* @name               main
* @namespace          php.views.layouts
* @type               blade
*
* Main layout that handle things like scripts import, stylesheets import, etc...
*
* @since            2.0.0
* @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
-->
<?php
$settings = $settings ? json_decode($settings) : null;
$package = $package ? json_decode($package) : null;
$metasOg = ($metas->og) ? $metas->og : ($frontspec->metas->og ? $frontspec->metas->og : $frontspec->metas->og) ? $frontspec->metas->og : null;
?>
<!doctype html>
<html
    lang="{{ ($metas->lang) ? $metas->lang : ($frontspec->metas->lang) ? $frontspec->metas->lang : 'en' }}"
    dir="{{ ($metas->dir) ? $metas->dir : ($frontspec->metas->dir) ? $frontspec->metas->dir : 'ltr' }}"
    >

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    @if ($frontspec->metas->description)
        <meta name="description" content="{{ $frontspec->metas->description }}">
    @endif
    <meta name="robots" content="{{ $env === 'production' ? 'all' : 'noindex, nofollow' }}" />
    <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1" />
    @if ($frontspec->metas->themeColor)
        <meta name="theme-color" content="{{ $frontspec->metas->themeColor }}" />
    @endif

    <title>
        {{ (($title? $title: $frontspec->metas->title)? $frontspec->metas->title: $frontspec->metas->title)? $frontspec->metas->title: $package->name }}
    </title>

    @if ($metasOg)
        <meta property="og:title" content="{{ $metasOg->title }}">
        <meta property="og:description" content="{{ $metasOg->description }}">
        <meta property="og:type" content="{{ $metasOg->type }}">
        <meta property="og:url" content="{{ $metasOg->url }}">
        <meta property="og:image" content="{{ $metasOg->image }}">
    @endif

    <!-- stylesheets -->
    @if ($frontspec->assets && $frontspec->assets->css)
        @foreach ($frontspec->assets->css as $name => $css)
            @if ($css->raw)
                {!! $css->raw !!}
            @elseif (Sugar\is\absolutePath($css->src) || Sugar\is\url($css->src))
                <link rel="stylesheet" id="{{ $name }}"
                    href="{{ Sugar\string\replaceTokens($css->src) }}" />
            @else
                <link rel="stylesheet" id="{{ $name }}"
                    href="/{{ Sugar\string\replaceTokens($css->src) }}" />
            @endif
        @endforeach
    @endif
    <!-- scripts -->
    @if ($frontspec->assets && $frontspec->assets->js)
        @foreach ($frontspec->assets->js as $name => $js)
            @if ($js->raw)
                {!! $js->raw !!}
            @elseif (Sugar\is\absolutePath($js->src) || Sugar\is\url($js->src))
                <script type="{{ $js->type ? $js->type : 'text/javascript' }}" id="{{ $name }}"
                                {{ $js->nomodule ? 'nomodule' : '' }} src="{{ Sugar\string\replaceTokens($js->src) }}">
                </script>
            @else
                <script type="{{ $js->type ? $js->type : 'text/javascript' }}" id="{{ $name }}"
                                {{ $js->nomodule ? 'nomodule' : '' }} src="/{{ Sugar\string\replaceTokens($js->src) }}">
                </script>
            @endif
        @endforeach
    @endif
    <!-- html -->
    @if ($frontspec->assets && $frontspec->assets->html)
        @foreach ($frontspec->assets->html as $name => $html)
            @if ($html->raw)
                {!! $html->raw !!}
            @elseif (file_exists(realpath($frontspec->metas->folderPath . '/' . $html->src)))
                {!! file_get_contents(realpath($frontspec->metas->folderPath . '/' . $html->src)) !!}
            @else
                <!-- trying to use the file "{{ $html->src }}" from the frontspec.json but something goes wrong... -->
            @endif
        @endforeach
    @endif
    @yield('head')

    @if ($config->google->gtm)
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','{{ $config->google->gtm }}');</script>
    @endif

</head>

<body
    @if ($bodyAttributes) @foreach ($bodyAttributes as $key => $value) {{ $key }}="{{ $value }}" @endforeach
    @endif>

    @if ($config->google->gtm)
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id={{ $config->google->gtm }}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    @endif

    @if ($SUGAR)
        <script>
            document.SUGAR = {!! json_encode($SUGAR) !!}
        </script>
    @endif

    @yield('body')

</body>

</html>
