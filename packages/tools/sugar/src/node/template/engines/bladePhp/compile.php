<?php
// require the vendors
require_once realpath(__DIR__.'/../../../../../vendor/autoload.php');
// require Sugar php
require_once realpath(__DIR__.'/../../../../php/autoload.php');
use Jenssegers\Blade\Blade;
use eftec\bladeone\BladeOne;
function compile($viewsPath, $view, $data, $tmpPath) {

  // prepare data to pass it to the template engine
	$data = json_decode(json_encode($data), FALSE);
  $data = (array) $data;
  // preparing the paths
  $viewName = str_replace('.blade.php', '', $view);
  // render the view using blade
	$views = $viewsPath;
  $cache = $tmpPath;

  // $blade = new BladeOne($views, $cache, BladeOne::MODE_AUTO);
  // try {
  //   return $blade->run($view, $data);
  // } catch(Exception $e) {
  //   return var_dump('<pre>' . $e . '</pre>');
  // }

    $blade = new Blade($views, $cache);
    return $blade->render($view, $data);

}
