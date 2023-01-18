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

</head>

<body class="{{ \Sugar\lod\lodClasses(2) }} {{ isset($bodyAttributes['class']) ? $bodyAttributes['class'] : '' }}" s-sugar {!! \Sugar\html\attrs($bodyAttributes, ['class']) !!}>

    <script>
        document.body.classList.add('initial-loading');
        document.body.classList.add('loading');
    </script>

    @if (isset($SUGAR) || isset($frontspec))
    <script id="sugar-override">
        if (!document.env) document.env = {};
        @if (isset($SUGAR))
            document.env.SUGAR = {!! json_encode($SUGAR) !!};
        @endif
        @if (isset($frontspec))
            document.env.FRONTSPEC = {!! json_encode(\Sugar\object\deepDiff(\Sugar\frontspec\readFrontspec(), $frontspec)) !!};
        @endif
    </script>
    @endif

    @yield('body')

</body>

</html>
