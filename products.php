<?php
header('Content-Type: application/json');

// Sample product data (stored in a PHP array)
$products = [
  [
    'id' => 1,
    'name' => 'Modern Sofa',
    'price' => 499.99,
    'image' => 'sofa.jpg',
    'description' => 'A comfortable and stylish modern sofa for your living room.'
  ],
  [
    'id' => 2,
    'name' => 'Wooden Table',
    'price' => 299.99,
    'image' => 'table.jpg',
    'description' => 'A sturdy and elegant wooden table for your dining room.'
  ],
  [
    'id' => 3,
    'name' => 'Comfy Chair',
    'price' => 149.99,
    'image' => 'chair.jpg',
    'description' => 'A cozy chair perfect for relaxing after a long day.'
  ],
];

echo json_encode($products);
?>