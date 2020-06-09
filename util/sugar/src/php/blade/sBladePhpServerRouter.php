<?php

include(dirname(__DIR__).'/../../vendor/autoload.php');

use Jenssegers\Blade\Blade;

$fullUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$rootDir = $_GET['rootDir'];
$cacheDir = $_GET['cacheDir'];
$viewPath = substr(parse_url($fullUrl, PHP_URL_PATH), 1);
$viewData = [];

$_POST = json_decode(file_get_contents("php://input"),true);

if (!file_exists($cacheDir)) {
  mkdir($cacheDir);
}

# read data source (JSON) file
if (file_exists($rootDir . '/' . $viewPath . '.json')) {
  $viewData = json_decode(file_get_contents($rootDir . '/' . $viewPath . '.json'));
}

if ($_POST['content']) {
  $viewData['content'] = $_POST['content'];
}
if ($_POST['settings']) {
  $viewData['settings'] = json_decode(json_encode($_POST['settings']), FALSE);
}

$blade = new Blade($rootDir, $cacheDir);
echo $blade->make($viewPath, $viewData)->render();
