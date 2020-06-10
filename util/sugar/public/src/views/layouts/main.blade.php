<html>
    <head>
        <title>{{ $title }}</title>
        @if ($settings->assets && $settings->assets->css)
          @foreach ($settings->assets->css as $asset)
            @if (!$asset->body)
              <link rel="stylesheet" id="{{ $asset->name }}" href="{{ str_replace($_SERVER['DOCUMENT_ROOT'], '', $asset->path) }}">
            @endif
          @endforeach
        @endif
        @if ($settings->assets && $settings->assets->js)
          @foreach ($settings->assets->js as $asset)
             @if (!$asset->body)
              <script id="{{ $asset->name }}" href="{{ str_replace($_SERVER['DOCUMENT_ROOT'], '', $asset->path) }}"></script>
            @endif
          @endforeach
        @endif
    </head>
    <body>
      @section('sidebar')
        This is the master sidebar.
      @show
      <div class="container">
        @yield('content')
      </div>

      @if ($settings->assets && $settings->assets->css)
        @foreach ($settings->assets->css as $asset)
          @if ($asset->body)
            <link rel="stylesheet" id="{{ $asset->name }}" href="{{ str_replace($_SERVER['DOCUMENT_ROOT'], '', $asset->path) }}">
          @endif
        @endforeach
      @endif
      @if ($settings->assets && $settings->assets->js)
        @foreach ($settings->assets->js as $asset)
          @if ($asset->body)
            <script id="{{ $asset->name }}" href="{{ str_replace($_SERVER['DOCUMENT_ROOT'], '', $asset->path) }}"></script>
          @endif
        @endforeach
      @endif
    </body>
</html>
