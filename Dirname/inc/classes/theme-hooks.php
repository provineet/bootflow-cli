<?php
/**
 * Our theme hooks.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package BootFlow
 * @since 1.0.0
 */
namespace BootFlow;

defined('ABSPATH') || exit;

class Theme_Hooks
{

    public function __construct()
    {

        add_action('wp_head', array( $this, 'print_something_in_head' ));
        
    }

    public function print_something_in_head(){

    }

}
