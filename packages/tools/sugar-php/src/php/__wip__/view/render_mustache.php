<?php

namespace thorin;

$t_mustache_engine = null;

/**
 * Render a view using mustache with the data passed to it and return the result
 *
 * @param       {String}        $slug       The view slug to render relative to the path.views config
 * @param       {Array}         [$data=null]       The data array to pass as extracted variables to the view
 * @return      {String}                    The rendered view
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
function render_mustache($slug, $data = []) {
	global $t_mustache_engine;
	// ensure we have an array and not an object
	if (is_object($data)) $data = get_object_vars($data);
	// allow render something like 'myview/myview' this way 'myview'
	if (is_dir(\Thorin::sanitize_path(\Thorin::config('path.views')) . $slug)) {
		$parts = explode('/', $slug);
		$slug = $slug . '/' . $parts[count($parts)-1];
	}
	// create a mustache template engine if needed
	if ( ! $t_mustache_engine) {
		$t_mustache_engine = new \Mustache_Engine(array(
			'template_class_prefix' => '__mustache__',
			'cache' => \Thorin::sanitize_path(\Thorin::config('path.views_cache')),
			'cache_file_mode' => 0666, // Please, configure your umask instead of doing this :)
			'cache_lambda_templates' => false,
			'loader' => new \Mustache_Loader_FilesystemLoader(\Thorin::sanitize_path(\Thorin::config('path.views'))),
			'partials_loader' => new \Mustache_Loader_FilesystemLoader(\Thorin::sanitize_path(\Thorin::config('path.views'))),
			'helpers' => [],
			'escape' => function($value) {
				return htmlspecialchars($value, ENT_COMPAT, 'UTF-8');
			},
			'charset' => 'UTF-8',
			'logger' => new \Mustache_Logger_StreamLogger('php://stderr'),
			'strict_callables' => true,
			'pragmas' => [\Mustache_Engine::PRAGMA_FILTERS],
		));
	}
	// load the template
	$tpl = $t_mustache_engine->loadTemplate($slug);
	// return the rendered template
	return $tpl->render($data);
}
