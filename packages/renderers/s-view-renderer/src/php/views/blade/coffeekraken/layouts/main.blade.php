<!--
* @name               main
* @namespace          php.views.layouts
* @type               blade
*
* Main layout that handle things like scripts import, stylesheets import, etc...
*
* @since            2.0.0
* @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
-->
<?php
$settings = $settings ? json_decode($settings) : null;
$package = $package ? json_decode($package) : null;
$metasOg = ($metas->og ? $metas->og : $frontspec->metas->og) ? $frontspec->metas->og : null;
?>
<!doctype html>
<html lang="{{ ($metas->lang ? $metas->lang : $frontspec->metas->lang) ? $frontspec->metas->lang : 'en' }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <meta name="description"
        content="{{ ($metas->description? $metas->description: $frontspec->metas->description)? $frontspec->metas->description: '' }}">
    <meta name="robots" content="{{ $env === 'production' ? 'all' : 'noindex, nofollow' }}" />
    <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1" />
    <title>
        {{ (($title? $title: $metas->title)? $metas->title: $frontspec->metas->title)? $frontspec->metas->title: $package->name }}
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
                <link rel="stylesheet" id="{{ $name }}" href="{{ Sugar\string\replaceTokens($css->src) }}" />
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
</head>

<body @if ($bodyAttributes) @foreach ($bodyAttributes as $key => $value) {{ $key }}="{{ $value }}" @endforeach @endif>

    @yield('body')

</body>

</html>
