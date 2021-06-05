<?php
namespace {{namespace}};

defined('ABSPATH') || exit;

/**
 * Our theme setup class
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package {{name}}
 * @since {{version}}
 */

class Theme_Setup
{

    public function __construct()
    {

        add_action('after_setup_theme', array($this, 'theme_setup'));
        add_filter('wp_resource_hints', array($this, 'resource_hints'), 10, 2);
        add_action('wp_enqueue_scripts', array($this, 'enqueue_styles'), 19);
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'), 1);
        add_action('enqueue_block_editor_assets', array($this, 'gutenberg_default_style'));
        add_action('widgets_init', array($this, 'register_sidebars'));
    }


    /**
     * theme setup
     *
     * @since 1.0.0
     */
    public function theme_setup()
    {

        // Add default posts and comments RSS feed links to head.
        add_theme_support('automatic-feed-links');
        add_theme_support('title-tag');
        add_theme_support('customize-selective-refresh-widgets');
        add_theme_support(
            'html5',
            array(
                'search-form',
                'comment-form',
                'comment-list',
                'gallery',
                'caption',
            )
        );
        add_theme_support(
            'custom-logo',
            array(
                'height'      => 150,
                'width'       => 300,
                'flex-width'  => true,
                'flex-height' => true,
            )
        );
        // add_theme_support('post-formats', array('image', 'video', 'quote', 'link', 'gallery'));

        // This theme uses wp_nav_menu() in one location.
        register_nav_menus(
            array(
                'primary' => esc_html__('Primary Menu', 'bootflow')
            )
        );

        // editor style
        add_editor_style();

        add_theme_support('post-thumbnails');
        // add_image_size('BFL-post-thumb', 446, 250, true); // Archive Post Page Thumbnails
        // add_image_size('BFL-tiny-thumb', 80, 80, true); // Archive Post Page Thumbnails
        // add_image_size('BFL-sticky-thumb', 540, 462, true); // Archive Post Page Thumbnails

        // This variable is intended to be overruled from themes.
        // Open WPCS issue: {@link https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/issues/1043}.
        // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
        $GLOBALS['content_width'] = apply_filters('bootflow_content_width', 640);
    }

    /*
    *  gutenberg default style
    */
    public function gutenberg_default_style()
    {
        wp_enqueue_style('bfl-gutenberg', get_theme_file_uri('/assets/css/gutenberg-editor-style.css'), false);
    }

    /**
     * Theme CSS
     *
     * @since 1.0.0
     */
    public function enqueue_styles()
    {

        $version = DEVELOPMENT_MODE ? time() : BFL_VERSION;

        wp_enqueue_style('google-fonts', $this->fonts_url(), array(), $version, 'all');

        wp_enqueue_style(BFL_SLUG . '-vendors', BFL_ASSETS . 'css/vendors.min.css', array(), $version, 'all');

        wp_enqueue_style(BFL_SLUG . '-theme-style', BFL_ASSETS . 'css/style.min.css', array(), $version, 'all');

        wp_enqueue_style(BFL_SLUG . '-style', get_stylesheet_uri());
    }

    /**
     * Theme JS
     *
     * @since 1.0.0
     */
    public function enqueue_scripts()
    {

        $version = DEVELOPMENT_MODE ? time() : BFL_VERSION;

        // jquery js
        wp_enqueue_script('jquery');

        // bootstrap-bundle
        wp_enqueue_script('bootstrap-bundle', BFL_ASSETS . 'js/bootstrap.bundle.min.js', array('jquery'), '5.0.0-beta2', true);

        // wp_enqueue_script(BFL_SLUG . 'script.bundle', BFL_ASSETS . 'js/scripts.bundle.min.js', array('jquery'), $version, true);
        wp_enqueue_script(BFL_SLUG . 'script', BFL_ASSETS . 'js/scripts.min.js', array('jquery'), $version, true);

        if (is_singular() && comments_open() && get_option('thread_comments')) {
            wp_enqueue_script('comment-reply');
        }
    }

    /*
		 *load font
		 */
    public function fonts_url()
    {
        $font_families = array();

        $font_families[] = 'Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i';
        $font_families[] = 'Open Sans:300,300i,400,400i,600,600i,700,700i,800,800i';

        $fonts_url = '';

        $query_args = array(
            'family'  => urlencode(implode('|', $font_families)),
            'display' => 'swap',
        );

        $fonts_url = add_query_arg($query_args, 'https://fonts.googleapis.com/css');

        return esc_url_raw($fonts_url);
    }

    /**
     * Add preconnect for Google Fonts.
     *
     * @version  1.0.0
     * @param  array  $urls          URLs to print for resource hints.
     * @param  string $relation_type The relation type the URLs are printed.
     * @return array  $urls URLs to print for resource hints.
     */
    public function resource_hints($urls, $relation_type)
    {

        if (wp_style_is('google-fonts', 'queue') && 'preconnect' === $relation_type) {
            $urls[] = array(
                'href' => 'https://fonts.gstatic.com',
                'crossorigin',
            );
        }
        return $urls;
    }

    /**
     *  Theme widgets
     */
    public function register_sidebars()
    {
        register_sidebar(
            array(
                'name' => __('Primary Sidebar', 'blogohblog'),
                'id' => 'primary',
                'description' => 'Footer One widget',
                'before_widget' => '<div id="%1$s" class="widget %2$s">',
                'after_widget' => '</div>',
                'before_title' => '<h5 class="widget-title">',
                'after_title' => '</h5>',
            )
        );
    }
}
