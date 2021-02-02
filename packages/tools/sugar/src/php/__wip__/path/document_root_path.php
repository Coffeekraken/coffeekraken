<?php

namespace thorin;

/**
 * Return the document root path depending on the `path.document_root` config
 *
 * @param       {String}        $slug       An optional slug to add to the root url
 * @return      {String}                    The corresponding root url
 *
 * @example    php
 * Thorin::document_root_path('my/cool/file.pdf');
 * // /app/root/public/my/cool/file.pdf
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function document_root_path($slug = '') {
	return \Thorin::root_path($slug);
}
