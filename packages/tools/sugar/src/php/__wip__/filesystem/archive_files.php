<?php
use \wapmorgan\UnifiedArchive\UnifiedArchive;
/**
 * Create an archive with some files/folders
 * @param    {String,Array}    $files    The file/folder to archive or an array of files/folders to archive
 * @param    {String}    $archive    The archive filename to create
 * @return    {Boolean}    false when format does not support archive creation.
 *
 * @example    php
 * Thorin::archive_files('my-cool-image.jpg', 'my-archive.zip');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/wapmorgan/UnifiedArchive
 */
function archive_files($files, $archive) {
	return UnifiedArchive::archiveFiles($files, $archive);
}
