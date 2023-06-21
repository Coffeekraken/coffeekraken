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

if (!isset($frontspec)) {
    $frontspec = (object) [];
}
if (!isset($env)) {
    $env = (object) [];
}

if (!isset($metas)) {
    $metas = (object) [];
}
$metasObj = $metas;
if (isset($frontspec->metas)) {
    $metasObj = (object) array_merge((array) $frontspec->metas, (array) $metas);
}
if (isset($frontspec)) {
    $frontspec->metas = $metasObj;
    $frontspec->metas->og = $ogObj;
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

    $lodClasses = '';
    if (isset($frontspec->lod->enabled) && $frontspec->lod->enabled) {
        $lodClasses = \Sugar\lod\lodClasses(isset($frontspec->lod->defaultLevel) ? $frontspec->lod->defaultLevel : 3);
    }
@endphp
<html lang="{{ $lang }}" dir="{{ $dir }}" class="{{ $lodClasses }}">
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

    {{-- SDashboard --}}
    @if (isset($_ENV['ENV']) && $_ENV['ENV'] != 'production')
        <!-- SDashboard -->
        {{-- <script src="/sugar/dashboard/lazy.js" type="module" defer></script> --}}
        <script src="https://cdnv2.coffeekraken.io/s-dashboard/lazy/lazy.js" defer></script>
    @endif

    <!-- favicon -->
    {!! \Sugar\frontspec\favicon($frontspec) !!}

    @yield('head')

</head>

<body class="{{ isset($bodyAttributes['class']) ? $bodyAttributes['class'] : '' }} initial-loading loading" s-sugar {!! \Sugar\html\attrs($bodyAttributes, ['class']) !!}>

    @if (isset($sugar) || isset($frontspec) || isset($env))
    <script id="sugar-override">
        if (!document.env) document.env = {};
        @if (isset($env))
            document.env = {
                ...document.env,
                ...{!! json_encode($env) !!}
            };
        @endif
        @if (isset($sugar))
            document.env.SUGAR = {!! json_encode($sugar) !!};
        @endif
        @if (isset($frontspec))
            document.env.FRONTSPEC = {!! json_encode(\Sugar\object\deepDiff(\Sugar\frontspec\readFrontspec(), $frontspec)) !!};
        @endif
        @if (isset($classmap))
            document.env.CLASSMAP = {!! json_encode(\Sugar\object\deepDiff(\Sugar\classmap\readClassmap(), $classmap)) !!};
        @endif
    </script>
    @endif

    @yield('body')

</body>

</html>
