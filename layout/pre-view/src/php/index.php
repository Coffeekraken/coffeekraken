<?php

require(__DIR__ . '/../../vendor/autoload.php');

Use eftec\bladeone\BladeOne;

$request = $_SERVER["REQUEST_URI"];
$rawViews = glob($_ENV['folder'] . '/{,*/,*/*/,*/*/*/}*.{blade.php,twig.php}', GLOB_BRACE);

if ($request == '/' && count($rawViews) > 0) {
  $redirectTo = str_replace($_ENV['folder'], '', $rawViews[0]);
  header('Location: ' . $redirectTo);
}

if (explode('/', $request)[1] === 'pre-view' ) {
  $path = __DIR__ . '/../..' . str_replace('/pre-view', '', $request);
  echo file_get_contents($path);
} else if (is_file($_SERVER['DOCUMENT_ROOT'] . explode('?',$request)[0])) {
  $path = $_SERVER['DOCUMENT_ROOT'] . explode('?', $request)[0];
  header('Content-Type: ' . mime_content_type($path));
  echo file_get_contents($path);
} else if ($_GET['iframe']) {

  // process the request to get the view path
  $viewPath = explode('?', $request)[0];
  $jsonPath = preg_split('/\.blade\.php|\.twig\.php/', $viewPath)[0] . '.json';

  // load the data if exist
  $jsonData = [];
  if (file_exists($_ENV['folder'] . '/' . $jsonPath)) {
    $jsonDataString = file_get_contents($_ENV['folder'] . '/' . $jsonPath);
    $jsonData = json_decode($jsonDataString, true);
  }

  // get view content string
  $viewString = file_get_contents($_ENV['folder'] . '/' . $viewPath);

  // get the iframe layout content string
  $iframeViewString = file_get_contents(__DIR__ . '/views/iframe.blade.php');

  // init the content variable
  $content = '';

  // check which render engine is needed
  if (preg_match('/\.blade\.php/', $request)) {
    $views = __DIR__ . '/views';
    $cache = __DIR__ . '/cache';
    $blade = new BladeOne($views,$cache,BladeOne::MODE_AUTO);
    $content = $blade->runString($viewString, $jsonData);
  } else if (preg_match('/\.twig\.php/', $request)) {
    // twig engine
    $loader = new \Twig\Loader\ArrayLoader([
        'index' => $viewString,
    ]);
    $twig = new \Twig\Environment($loader);
    echo $twig->render('index', $jsonData);
  }

  // render the iframe layout with the rendered view content
  $views = __DIR__ . '/views';
  $cache = __DIR__ . '/cache';
  $datas = [
    "html" => $content,
    'js' => $_ENV['js'] . '?iframe=true',
    'css' => $_ENV['css'] . '?iframe=true'
  ];
  $blade = new BladeOne($views,$cache,BladeOne::MODE_AUTO);
  $content = $blade->runString($iframeViewString, $datas);
  echo $content;
} else {
  // list the views folder
  $viewsPaths = [];
  foreach ($rawViews as $view) {
    array_push($viewsPaths, str_replace($_ENV['folder'], '', $view));
  }
  $views = __DIR__ . '/views';
  $cache = __DIR__ . '/cache';
  $blade = new BladeOne($views,$cache,BladeOne::MODE_AUTO);
  echo $blade->run('index', [
    'env' => $_ENV,
    'views' => $viewsPaths,
    'states' => explode(',', str_replace('"','',$_ENV['states']))
  ]);
}
