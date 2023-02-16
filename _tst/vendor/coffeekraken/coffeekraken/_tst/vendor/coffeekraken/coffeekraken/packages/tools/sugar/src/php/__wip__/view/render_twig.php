<?php

namespace thorin;

$t_twig = null;

/**
 * Render a view with the data passed to it and return it
 *
 * @param       {String}        $slug       The view slug to render relative to the path.views config
 * @param       {Array}         [$data=null]       The data array to pass as extracted variables to the view
 * @return      {String}                    The rendered view
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
function render_twig($slug, $data = []) {
	global $t_twig;
    // ensure we have an array and not an object
	if (is_object($data)) $data = get_object_vars($data);
	// allow render something like 'myview/myview' this way 'myview'
	if (is_dir(\Thorin::sanitize_path(\Thorin::config('path.views')) . $slug)) {
		$parts = explode('/', $slug);
		$slug = $slug . '/' . $parts[count($parts)-1];
	}
	// append .twig to the slug if not already present
	if (substr($slug, -5) !== '.twig') {
		$slug = $slug . '.twig';
	}
	// load twig
	if ( ! $t_twig) {
		$loader = new \Twig_Loader_Filesystem(\Thorin::sanitize_path(\Thorin::config('path.views')));
		$t_twig = new \Twig_Environment($loader, array(
			// 'cache' => \Thorin::sanitize_path(\Thorin::config('path.views_cache')),
		));
	}
	// render view
	return $t_twig->render($slug, $data);
}
