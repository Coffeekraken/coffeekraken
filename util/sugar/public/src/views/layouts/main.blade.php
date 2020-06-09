<html>
    <head>
        <title>Coffeekraken Sugar | @yield('title')</title>
        @if ($settings->assets && $settings->assets->css && $settings->assets->css->head)
          @foreach ($settings->assets->css->head as $asset)
            <link rel="stylesheet" id="{{ $asset->name }}" href="{{ str_replace($_SERVER['DOCUMENT_ROOT'], '', $asset->path) }}">
          @endforeach
        @endif
        @if ($settings->assets && $settings->assets->js && $settings->assets->js->head)
          @foreach ($settings->assets->js->head as $asset)
            <script id="{{ $asset->name }}" href="{{ str_replace($_SERVER['DOCUMENT_ROOT'], '', $asset->path) }}"></script>
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

      @if ($settings->assets && $settings->assets->css && $settings->assets->css->body)
        @foreach ($settings->assets->css->body as $asset)
          <link rel="stylesheet" id="{{ $asset->name }}" href="{{ str_replace($_SERVER['DOCUMENT_ROOT'], '', $asset->path) }}">
        @endforeach
      @endif
      @if ($settings->assets && $settings->assets->js && $settings->assets->js->body)
        @foreach ($settings->assets->js->body as $asset)
          <script id="{{ $asset->name }}" href="{{ str_replace($_SERVER['DOCUMENT_ROOT'], '', $asset->path) }}"></script>
        @endforeach
      @endif
    </body>
</html>
