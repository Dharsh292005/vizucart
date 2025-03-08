<?php
header('Content-Type: application/json');

// Simulate adding a product to the cart
$data = json_decode(file_get_contents('php://input'), true);
$productId = $data['productId'];

// In a real application, you'd store this in a session or database
$response = ['message' => 'Product added to cart!'];
echo json_encode($response);
?> 