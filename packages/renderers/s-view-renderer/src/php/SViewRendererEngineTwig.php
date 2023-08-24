<?php

class SViewRendererEngineTwig
{
    public $settings;

    private $_loader; // store the twig loader
    private $_twig; // store the twig instance

    public function __construct($settings = [])
    {
        $this->settings = $settings;

        // create the twig environment and instance
        $this->_loader = new \Twig\Loader\FilesystemLoader($settings->rootDirs);
        $this->_twig = new \Twig\Environment($this->_loader, [
            'cache' => $this->settings->cacheDir,
            'debug' => true,
        ]);
        $this->_twig->addExtension(new \Twig\Extension\DebugExtension());

        // init sugar on twig
        \SViews\twig\initTwig($this->_twig);
    }

    public function render($viewPath, $data = [])
    {
        foreach ($this->settings->rootDirs as $rootDir) {
            $viewPath = str_replace($rootDir . '/', '', $viewPath);
        }

        return $this->_twig->render($viewPath, $data);
    }
}
