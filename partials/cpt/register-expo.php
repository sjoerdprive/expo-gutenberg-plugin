<?php
function create_expo_posttype()
{

  register_post_type(
    'expo',
    array(
      'labels' => array(
        'name' => __('Expo\'s'),
        'singular_name' => __('Expo')
      ),
      'show_ui' => true,
      'query_var' => true,
      'menu_icon' => 'dashicons-star-filled',
      'public' => true,
      'has_archive' => true,
      'show_in_rest' => true,
      'supports' => array('post-formats', 'custom-fields', 'editor', 'title'),
      'taxonomies' => ['collection'],
      'template' => array(array('webmodu/expo')),
      'template_lock' => 'insert',
      'show_in_nav_menus ' => true
    )
  );
}
// Hooking up our function to theme setup
add_action('init', 'create_expo_posttype');
