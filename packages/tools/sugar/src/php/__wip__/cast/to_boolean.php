<?php

namespace thorin;

/**
 * Convert variable to boolean
 *
 * @param       {String}        $var         The var to be convert in boolean
 * @return      {Boolean}                    true or false
 *
 * @example    php
 * Thorin::to_boolean('true');
 * // true
 * Thorin::to_boolean(0);
 * // false
 *
 * @author 		Paul Balanche <pb@buzzbrothers.ch>
 */
function to_boolean($var) {
	if(is_numeric($var) ){
		if($var == 0)
			return false;
		else
			return true;
	}
	else{
		switch($var){
			case 'true':
				return true;

			case 'false':
				return false;
		}
	}
	return false;
}
