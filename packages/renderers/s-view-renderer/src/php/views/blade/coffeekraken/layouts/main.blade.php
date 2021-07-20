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
?>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="chrome=1">
  <meta name="description" content="&amp;lt;p&amp;gt;&amp;lt;a href=&amp;quot;http://support.shufflehound.com/&amp;quot; rel=&amp;quot;nofollow&amp;quot;&amp;gt;&amp;lt;...">
  <meta name="robots" content="{{ $env === 'production' ? 'all' : 'noindex, nofollow' }}" />
  <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1" />
  <title>{{ $title ? $title : $package->name }}</title>
  
  <!-- stylesheets -->
  @if ($assets && $assets->css)
    @foreach ($assets->css as $name=>$css)
      @if (!$css->body)
        @if ($css->raw)
          {!! $css->raw !!}
        @elseif (Sugar\is\absolutePath($css->src) || Sugar\is\url($css->src))
          <link rel="stylesheet" id="{{ $name }}" href="{{ Sugar\string\replaceTokens($css->src) }}" />
        @else
          <link rel="stylesheet" id="{{ $name }}" href="/{{ Sugar\string\replaceTokens($css->src) }}" />
        @endif
      @endif
    @endforeach
  @endif
  <!-- scripts -->
  @if ($assets && $assets->js)
    @foreach ($assets->js as $name=>$js)
      @if (!$js->body)
        @if ($js->raw)
          {!! $js->raw !!}
        @elseif (Sugar\is\absolutePath($js->src) || Sugar\is\url($js->src))
          <script type="{{ $js->type ? $js->type : 'text/javascript' }}" id="{{ $name }}" src="{{ Sugar\string\replaceTokens($js->src) }}"></script>
        @else
          <script type="{{ $js->type ? $js->type : 'text/javascript' }}" id="{{ $name }}" src="/{{ Sugar\string\replaceTokens($js->src) }}"></script>
        @endif
      @endif
    @endforeach
  @endif
  <!-- head -->
  @if ($frontspec && $frontspec->head)
    @foreach ($frontspec->head as $id=>$raw)
      <!-- {{ $id }} -->
      {!! $raw !!}
    @endforeach
  @endif
  @yield('head')
</head>
<body>

  @yield('body')

  <!-- body stylesheets -->
  @if ($assets && $assets->css)
    @foreach ($assets->css as $name=>$css)
      @if ($css->body)
        @if ($css->raw)
          {!! $css->raw !!}
        @elseif (Sugar\is\absolutePath($css->src) || Sugar\is\url($css->src)) {
          <link rel="stylesheet" id="{{ $name }}" href="{{ Sugar\string\replaceTokens($css->src) }}" />
        @else
          <link rel="stylesheet" id="{{ $name }}" href="/{{ Sugar\string\replaceTokens($css->src) }}" />
        @endif
      @endif
    @endforeach
  @endif
  <!-- body scripts -->
  @if ($assets && $assets->js)
    @foreach ($assets->js as $name=>$js)
      @if ($js->body)
        @if ($js->raw)
          {!! $js->raw !!}
        @elseif (Sugar\is\absolutePath($js->src) || Sugar\is\url($js->src))
          <script type="{{ $js->type ? $js->type : 'text/javascript' }}" id="{{ $name }}" src="{{ Sugar\string\replaceTokens($js->src) }}"></script>
        @else
          <script type="{{ $js->type ? $js->type : 'text/javascript' }}" id="{{ $name }}" src="/{{ Sugar\string\replaceTokens($js->src) }}"></script>
        @endif
      @endif
    @endforeach
  @endif
</body>
</html>
