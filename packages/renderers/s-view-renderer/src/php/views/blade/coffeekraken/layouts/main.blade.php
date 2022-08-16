<?php
/**
 * @name               main
 * @namespace          php.views.layouts
 * @type               blade
 *
 * Main layout that handle things like scripts import, stylesheets import, etc...
 *
 * @since            2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

$ogObj = null;
if (isset($metas) && $metas->og) {
    $ogObj = $metas->og;
}
if (isset($frontspec->metas) && $frontspec->metas->og) {
    $ogObj = (object) array_merge(
        (array) $frontspec->metas->og,
        (array) $ogObj
    );
}

if (!isset($metas)) {
    $metas = (object) [];
}
$metasObj = $metas;
if (isset($frontspec->metas)) {
    $metasObj = (object) array_merge((array) $frontspec->metas, (array) $metas);
}
?>
<!DOCTYPE html>
@php
    $lang = 'en';
    if (isset($metas->lang)) {
        $lang = $metas->lang;
    } else if (isset($frontspec->metas->lang)) {
        $lang = $frontspec->metas->lang;
    }
    $dir = 'ltr';
    if (isset($metas->dir)) {
        $dir = $metas->dir;
    } else if (isset($frontspec->metas->dir)) {
        $dir = $frontspec->metas->dir;
    }
@endphp
<html lang="{{ $lang }}" dir="{{ $dir }}">
<head>
    <!-- metas -->
    {!! \Sugar\frontspec\metas($frontspec->metas, $env) !!}

    <!-- og -->
    {!! \Sugar\frontspec\og($ogObj) !!}

    <!-- assets -->
    @php
        $cacheBuster = '';
        if (isset($shared->server->sessionId)) {
            $cacheBuster = $shared->server->sessionId;
        }
    @endphp
    {!! \Sugar\frontspec\assets($frontspec->assets, $cacheBuster) !!}

    @yield('head')

    <!-- GTM -->
    @if (isset($config->google->gtm))
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','{{ $config->google->gtm }}');</script>
    @endif

</head>

<body @if (isset($bodyAttributes)) @foreach ($bodyAttributes as $key => $value){{ $key }}="{{ $value }}" @endforeach @endif>

    <!-- GTM noscript -->
    @if (isset($config->google->gtm))
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id={{ $config->google->gtm }}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    @endif

    @if (isset($SUGAR))
        <script id="sugar-override">
            document.SUGAR = {!! json_encode($SUGAR) !!}
        </script>
    @endif

    @yield('body')

</body>

</html>
