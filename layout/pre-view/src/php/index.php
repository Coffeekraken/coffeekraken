<?php

require(__DIR__ . '/../../vendor/autoload.php');

use Jenssegers\Blade\Blade;

$request = $_SERVER["REQUEST_URI"];

// router.php
if (preg_match('/\.(?:png|jpg|jpeg|gif)$/', $request)) {
    return false; // Serve the requested resource as-is
} else if (preg_match('/^\/dist\//', $request)) {
  $content = file_get_contents(__DIR__ . '/../../' . $request);
  echo $content;
} else if (preg_match('/\/view\//', $request)) {
  // list the views folder
  $rawViews = glob($_ENV['folder'] . '/{,*/,*/*/,*/*/*/}*.{blade.php,twig.php}', GLOB_BRACE);
  $views = [];
  foreach ($rawViews as $view) {
    array_push($views, str_replace($_ENV['folder'], '', $view));
  }
  // create and render the index view
  $blade = new Blade(__DIR__ . '/views', __DIR__ . '/cache');
  echo $blade->make('index', [
    'env' => $_ENV,
    'views' => $views
  ])->render();
} else {
    echo "<p>Thanks for using php-server :)</p>";
}
