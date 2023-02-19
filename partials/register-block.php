<?php

include_once EXPO_PLUGIN_DIR . '/partials/expo-frontend.php';

function register_expo_block()
{
  register_block_type_from_metadata(EXPO_PLUGIN_DIR, ['render_callback' => 'render_expo']);
}
add_action('init', 'register_expo_block');
