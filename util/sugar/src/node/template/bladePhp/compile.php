<?php
// require the vendors
require_once realpath(__DIR__.'/../../../../vendor/autoload.php');
use Jenssegers\Blade\Blade;
function compile($viewsPath, $view, $data, $tmpPath) {
  // prepare data to pass it to the template engine
	$data = json_decode(json_encode($data), FALSE);
  $data = (array) $data;
  // preparing the paths
  $viewName = str_replace('.blade.php', '', $view);
  // render the view using blade
	$views = $viewsPath;
  $cache = $tmpPath;
  $blade = new Blade($views, $cache);
  try {
    $res = $blade->render('pages.doc', $data);
  } catch(Exception $e) {
    return var_dump('<pre>' . $e . '</pre>');
  }
  return $res;
}
