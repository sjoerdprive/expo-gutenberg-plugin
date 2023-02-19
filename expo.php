<?php

/**
 * Plugin Name: Expo
 * Description: Drag 'n' drop expositiebouwer
 * Author: WebModu
 * Version: 1.0.0
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
  exit;
}

// Global variables
define('EXPO_PLUGIN_DIR', plugin_dir_path((__FILE__)));
define('EXPO_PLUGIN_DIR_URL', plugin_dir_url((__FILE__)));

// Includes
include_once EXPO_PLUGIN_DIR . '/partials/register-project-taxonomy.php';
include_once EXPO_PLUGIN_DIR . '/partials/cpt/register-expo.php';
include_once EXPO_PLUGIN_DIR . '/partials/register-block.php';
// include_once EXPO_PLUGIN_DIR . '/partials/register-menu.php';
