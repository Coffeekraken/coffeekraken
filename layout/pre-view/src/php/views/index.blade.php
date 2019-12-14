<html>
  <head>
    <title>App Name - @yield('title')</title>
    <link rel="stylesheet" href="/pre-view/dist/css/style.css" type="text/css">
    <script>
      window.ck_hotkey_selector = "{{ $env['hotkey_selector'] }}";
      window.ck_hotkey_states = "{{ $env['hotkey_states'] }}";
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
      <h1 class="h3" intro="letters-in-reveal">
        {{ $env['title'] }}
      </h1>
      <img class="coffeekraken-logo" src="/pre-view/dist/img/coffeekraken-logo.png" />
      <select is="ck-select">
        @foreach ($views as $view)
          <option value="{{ $view }}">{{ $view }}</option>
        @endforeach
      </select>
    </section>

    <section class="ck-preview__welcome-container vr">
      <h1 class="h1">Welome</h1>
      <p class="p">Congratulation! You just have successfully run the <strong class="strong">Pre-view</strong> module.
        This module will help you to quickly start developing your views. You can work with <strong class="strong">blade</strong> or <strong class="strong">twig</strong> views.
        <br />Here's some of the settings:
        <ul class="ul">
          <li class="li">Views folder: <strong class="strong">{{ $env['folder'] }}</strong></li>
          <li class="li">Views selector hotkey: <strong class="strong">{{ $env['hotkey_selector'] }}</strong></li>
          <li class="li">States switcher hotkey: <strong class="strong">{{ $env['hotkey_states'] }}</strong></li>
        </ul>
        <button class="btn">OK! Start working...</button>
    </section>

    <script>
      document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
      ':35729/livereload.js?snipver=1"></' + 'script>')
    </script>

    <script src="/pre-view/dist/js/app.bundle.js"></script>
  </body>
</html>
