<?php

class SDocmapSearchParams
{
    /**
     * @name           slug
     * @type            String
     *
     * Specify the slug to search
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public $slug;

    /**
     * @name           namespace
     * @type            String
     *
     * Specify the namespace to search.
     * The namespace if the dot string that identify a docmap item like @coffeekraken.sugar.php.array.deepMap
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public $namespace;

    public function __construct($params = [])
    {
        foreach ($params as $key => $value) {
            if (is_array($this->{$key}) && is_array($value)) {
                $this->{$key} = array_merge_recursive($this->{$key}, $value);
            } else {
                $this->{$key} = $value;
            }
        }
    }
}
