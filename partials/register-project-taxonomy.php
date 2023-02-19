<?php
function register_project_taxonomy()
{
  register_taxonomy('collection', 'post', [
    'hierarchical' => true, 'labels' => [
      'name' => __('Collecties'), 'singular_name' => __('Collectie')
    ], 'public' => true, 'show_admin_column' => true,
    'show_in_rest' => true, 'capabilities' => [
      'manage_terms' => 'edit_posts',
      'edit_terms' => 'edit_posts',
      'delete_terms' => 'edit_posts',
      'assign_terms' => 'edit_posts'
    ]
  ]);
};

add_action('init', 'register_project_taxonomy');
