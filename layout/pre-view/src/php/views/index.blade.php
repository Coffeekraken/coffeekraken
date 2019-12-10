<html>
  <head>
    <title>App Name - @yield('title')</title>
    <link rel="stylesheet" href="/dist/css/style.css" type="text/css">
    <script>
      window.ck_states = [];
      @foreach ($states as $state)
        window.ck_states.push('{{ $state }}');
      @endforeach
    </script>
  </head>
  <body>
    <div class="ck-preview__iframe-container">
      <iframe src="http://{{ $_SERVER[HTTP_HOST] }}{{$_SERVER[REQUEST_URI] }}?iframe=true" class="ck-preview__iframe"></iframe>
    </div>
    <section class="ck-preview__views-selector">
      <select is="ck-select">
        @foreach ($views as $view)
          <option value="{{ $view }}">{{ $view }}</option>
        @endforeach
      </select>
    </section>
    <script src="/dist/js/app.bundle.js"></script>
  </body>
</html>
