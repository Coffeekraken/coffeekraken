<?php

class SDocmapReadParams
{
    /**
     * @name           input
     * @type            String
     * @default         $_ENV['S_FRONTEND_DIR']/docmap.json || $_SERVER['DOCUMENT_ROOT']/docmap.json
     *
     * Specify the docmap.json file path where you want to start the read process
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public $input;

    public function __construct($params = [])
    {
        foreach ($params as $key => $value) {
            if (is_array($this->$key) && is_array($value)) {
                $this->$key = array_merge_recursive($this->{$key}, $value);
            } else {
                $this->$key = $value;
            }
        }

        $rootDir = $_SERVER['DOCUMENT_ROOT'];
        if (isset($_ENV['S_FRONTEND_DIR'])) {
            $rootDir = $_ENV['S_FRONTEND_DIR'];
        }

        if (!isset($this->input)) {
            $this->input = $rootDir . '/docmap.json';
        }
    }
}
