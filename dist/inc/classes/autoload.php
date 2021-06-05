<?php
/**
 * Autoloader for our php classes
 *
 * @package BootFlow
 * @since 1.0.0
 */

namespace BootFlow;

defined('ABSPATH') || exit;

class Autoload{

    private static $classes_map;

    private static $default_path;

    private static $default_namespace;

    /**
     * Run autoloader.
     *
     * Register a function as `__autoload()` implementation.
     *
     * @param string $default_path
     * @param string $default_namespace
     *
     * @since 1.6.0
     * @access public
     * @static
     */
    public static function run($default_path = '', $default_namespace = '')
    {
        if ('' === $default_path) {
            $default_path = BFL_PATH;
        }

        if ('' === $default_namespace) {
            $default_namespace = __NAMESPACE__;
        }

        self::$default_path = $default_path;
        self::$default_namespace = $default_namespace;

        spl_autoload_register([__CLASS__, 'autoload']);
    }

    public static function get_classes_map()
    {
        if (!self::$classes_map) {
            self::init_classes_map();
        }

        return self::$classes_map;
    }

    private static function init_classes_map()
    {
        self::$classes_map = [
            'Theme_Setup' => 'inc/classes/theme-setup.php'
        ];

    }

    /**
     * Load class.
     *
     * For a given class name, require the class file.
     *
     * @since 1.6.0
     * @access private
     * @static
     *
     * @param string $class_name Class name.
     */
    private static function load_class($class_name)
    {
        $classes_map = self::get_classes_map();

        if (isset($classes_map[$class_name])) {
            $filename = self::$default_path . '/' . $classes_map[$class_name];
        } else {
            $filename = strtolower(
                preg_replace(
                    ['/([a-z])([A-Z])/', '/_/', '/\\\/'],
                    ['$1-$2', '-', DIRECTORY_SEPARATOR],
                    $class_name
                )
            );

            $filename = self::$default_path . '/inc/classes/' . $filename . '.php';

        }

        if (is_readable($filename)) {
            require_once $filename;
        }
    }

    /**
     * Autoload.
     *
     * For a given class, check if it exist and load it.
     *
     * @since 1.6.0
     * @access private
     * @static
     *
     * @param string $class Class name.
     */
    private static function autoload($class)
    {
        if (0 !== strpos($class, self::$default_namespace . '\\')) {
            return;
        }

        $class_name = preg_replace('/^' . self::$default_namespace . '\\\/', '', $class);

        $namespaced_class_name = self::$default_namespace . '\\' . $class_name;

        if (!class_exists($namespaced_class_name)) {
            self::load_class($class_name);
        }

    }

}