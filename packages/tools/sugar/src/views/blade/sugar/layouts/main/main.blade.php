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
$frontspec->metas = $metasObj;
$frontspec->metas->og = $ogObj;
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
    {!! \Sugar\frontspec\metas($frontspec, $env) !!}

    <!-- og -->
    {!! \Sugar\frontspec\og($frontspec) !!}

    <!-- assets -->
    @php
        $cacheBuster = '';
        if (isset($shared->server->sessionId)) {
            $cacheBuster = $shared->server->sessionId;
        }
    @endphp
    {!! \Sugar\frontspec\assets($frontspec, $cacheBuster) !!}

    @yield('head')

    @if (isset($config->google->gtm))
    <!-- GTM -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','{{ $config->google->gtm }}');</script>
    @endif

</head>

<body class="{{ \Sugar\lod\lodClasses(2) }}" @if (isset($bodyAttributes)) @foreach ($bodyAttributes as $key => $value){{ $key }}="{{ $value }}" @endforeach @endif>

    @if (isset($config->google->gtm))
    <!-- GTM noscript -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id={{ $config->google->gtm }}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    @endif

    @if (isset($SUGAR))
    <script id="sugar-override">
        if (!document.env) document.env = {};
        document.env.SUGAR = {!! json_encode($SUGAR) !!};
    </script>
    @endif

    @yield('body')

    @if (isset($config->google->ga))
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id={{ $config->google->ga }}"></script>
    <script>
        function gtag(){dataLayer.push(arguments);}
        document.addEventListener('DOMContentLoaded', () => {
            if ((document.env && document.env.ENV && document.env.ENV === 'production')
                || (!document.env && !document.env.ENV)) {
                window.dataLayer = window.dataLayer || [];
                gtag('js', new Date());
                gtag('config', '{{ $config->google->ga }}');
            } else {
                console.log(`%c[GA] Google analytics installed with the id "{{ $config->google->ga }}" but does not track anything in this environment...`, 'color: orange');
            }
        });
    </script>
    @endif

</body>

</html>
