<?php
use \wapmorgan\UnifiedArchive\UnifiedArchive;

/**
 * Extract an archive file in an output folder
 * @param    {String}    $archive    The archive file to extract
 * @param    {String}    $output    The output folder for the extracted files
 * @return    {Integer,Boolean}    The number of extracted files or false if an error has occured
 *
 * @example    php
 * Thorin::extract_files('my-archive.zip','my-output-folder');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/wapmorgan/UnifiedArchive
 */
function extract_files($archive, $output) {
	$archiveInstance = UnifiedArchive::open($archive);
	return $archiveInstance->extractFiles($output);
}
