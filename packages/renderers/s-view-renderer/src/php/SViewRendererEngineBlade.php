<?php

class SViewRendererEngineBlade
{
    public $settings;

    private $_blade; // store the blade instance

    public function __construct($settings = [])
    {
        $this->settings = $settings;

        $cacheDir = $this->settings->cacheDir . '/blade';

        // create the blade instance
        $this->_blade = new eftec\bladeone\BladeOne(
            $this->settings->rootDirs,
            $cacheDir,
            eftec\bladeone\BladeOne::MODE_DEBUG
        );
        $this->_blade->setMode(eftec\bladeone\BladeOne::MODE_DEBUG);

        // ensure folders existence
        if (!file_exists($cacheDir)) {
            mkdir($cacheDir, 0777, true);
        }
    }

    public function render($viewPath, $data = [])
    {
        foreach ($this->settings->rootDirs as $rootDir) {
            $viewPath = str_replace($rootDir . '/', '', $viewPath);
        }

        return $this->_blade->run($viewPath, (array) $data);
    }
}
