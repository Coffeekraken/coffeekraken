<?php

namespace thorin;

use Jaybizzle\CrawlerDetect\CrawlerDetect;

/**
 * Detect if the "visitor" is a web crawler like googlebot, etc...
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
function is_crawler() {
	$CrawlerDetect = new CrawlerDetect;
	return $CrawlerDetect->isCrawler();
}


