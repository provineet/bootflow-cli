<?php

use \BootFlow\Loader;

defined('ABSPATH') || exit;

$ = wp_get_theme();

(defined('DEVELOPMENT_MODE')) || define('DEVELOPMENT_MODE', true);
(defined('BFL_NAME')) || define('BFL_NAME', $->get('Name'));
(defined('BFL_VERSION')) || define('BFL_VERSION', $->get('Version'));
(defined('BFL_SLUG')) || define('BFL_SLUG', $->get('TextDomain'));
(defined('BFL_PATH')) || define('BFL_PATH', get_template_directory());
(defined('BFL_ASSETS')) || define('BFL_ASSETS', get_template_directory_uri() . '/assets/');

if (is_readable(BFL_PATH . '/inc/loader.php')) {
    require_once BFL_PATH . '/inc/loader.php';
    Loader::instance();
}
