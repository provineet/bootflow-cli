<?php
namespace {{namespace}};

defined('ABSPATH') || exit;
/**
 * Our theme hooks.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package {{name}}
 * @since {{version}}
 */


class Theme_Hooks
{

    public function __construct()
    {

        add_action('wp_head', array( $this, 'print_something_in_head' ));
        
    }

    public function print_something_in_head(){

    }

}
