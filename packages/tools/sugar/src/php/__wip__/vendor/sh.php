<?php

namespace thorin;

/**
 * Call a shell function and pass it some arguments.
 * This use the cool [Shellwrap](https://github.com/MrRio/shellwrap) library to work.
 * @param    {String}    $command    The comment to call
 * @param    {Mixed}    $args...    The arguments to pass to the command
 *
 * @example    php
 * $res = Thorin::sh('ls', '-la');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function sh($command) {
	$args = func_get_args();
	array_shift($args);
	return call_user_func_array('MrRio\ShellWrap::'.$command, $args);
}
