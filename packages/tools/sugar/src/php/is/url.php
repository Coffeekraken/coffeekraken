<?php

namespace Sugar\is;

/**
 * @name            Sugar\is\url
 * @namespace            php.is
 * @type            Function
 * @platform         php
 * @status            beta
 * 
 * This function simply check if the passed string a an url or not
 * 
 * @param       {String}        $url            The url to check
 * @return      {Boolean}                       true if a valid url, false if not
 * 
 * @example         php
 * Sugar\is\url('something'); // => false
 * Sugar\is\url('http://hello.com'); // => true
 * 
 * @see                 https://www.php.net/manual/en/function.preg-match.php#93824
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function url($url) {

    return (bool)parse_url($url);

    // $regex = "((https?|ftp)\:\/\/)?"; // SCHEME
    // $regex .= "([a-z0-9+!*(),;?&=\$_.-]+(\:[a-z0-9+!*(),;?&=\$_.-]+)?@)?"; // User and Pass
    // $regex .= "([a-z0-9-.]*)\.([a-z]{2,3})"; // Host or IP
    // $regex .= "(\:[0-9]{2,5})?"; // Port
    // $regex .= "(\/([a-z0-9+\$_-]\.?)+)*\/?"; // Path
    // $regex .= "(\?[a-z+&\$_.-][a-z0-9;:@&%=+\/\$_.-]*)?"; // GET Query
    // $regex .= "(#[a-z_.-][a-z0-9+\$_.-]*)?"; // Anchor
    // if(preg_match("/^$regex$/", $url)) {
    //     echo 'CCCC';
    //     return true;
    // }
    // return false;
}