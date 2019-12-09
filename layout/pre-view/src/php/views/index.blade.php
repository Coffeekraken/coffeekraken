<html>
  <head>
    <title>App Name - @yield('title')</title>
    <link rel="stylesheet" href="/dist/css/style.css" type="text/css">
  </head>
  <body>
    <section class="ck-preview__views-selector">
      <select is="ck-select">
        @foreach ($views as $view)
          <option value="{{ $view }}">{{ $view }}</option>
        @endforeach
      </select>
    </section>
    <div class="container">

    </div>
    <script src="/dist/js/app.bundle.js"></script>
  </body>
</html>
