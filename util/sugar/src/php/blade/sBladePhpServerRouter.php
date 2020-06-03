<?php

include(dirname(__DIR__).'/../../vendor/autoload.php');

use Jenssegers\Blade\Blade;

$fullUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$viewsDir = $_GET['viewsDir'];
$cacheDir = $_GET['cacheDir'];
$viewPath = substr(parse_url($fullUrl, PHP_URL_PATH), 1);
$viewData = [];

# read data source (JSON) file
if (file_exists($viewsDir . '/' . $viewPath . '.json')) {
  $viewData = json_decode(file_get_contents($viewsDir . '/' . $viewPath . '.json'), true);
}

$blade = new Blade($_SERVER['DOCUMENT_ROOT'] . '/' . $viewsDir, $_SERVER['DOCUMENT_ROOT'] . '/' . $cacheDir);
echo $blade->make($viewPath, $viewData)->render();
