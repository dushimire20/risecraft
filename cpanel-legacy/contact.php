<?php
// Handles the site's Contact form. Deployed to cPanel alongside the static export.
require __DIR__ . "/inc/config.php";
header("Content-Type: application/json");

$toEmail = "info@risecraft.rw"; // change if submissions should go elsewhere

function fail($message, $code = 400) {
    http_response_code($code);
    echo json_encode(["error" => $message]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    fail("Method not allowed.", 405);
}

$raw = file_get_contents("php://input");
$body = json_decode($raw, true);
if (!is_array($body)) {
    fail("Invalid request body.");
}

$name = trim($body["name"] ?? "");
$email = trim($body["email"] ?? "");
$phone = trim($body["phone"] ?? "");
$message = trim($body["message"] ?? "");

if ($name === "" || $email === "" || $message === "") {
    fail("Name, email and message are required.");
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail("Please provide a valid email address.");
}

$name = mb_substr($name, 0, 200);
$email = mb_substr($email, 0, 200);
$phone = mb_substr($phone, 0, 60);
$message = mb_substr($message, 0, 4000);

fc_add_submission("contact", [
    "name" => $name,
    "email" => $email,
    "phone" => $phone,
    "message" => $message,
]);

$subject = "New contact message from " . $name;
$body_lines = [
    "Name: $name",
    "Email: $email",
    "Phone: " . ($phone !== "" ? $phone : "-"),
    "",
    "Message:",
    $message,
];
$emailBody = implode("\n", $body_lines);

$headers = "From: no-reply@" . ($_SERVER["HTTP_HOST"] ?? "risecraft.rw") . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";

$sent = mail($toEmail, $subject, $emailBody, $headers);

if (!$sent) {
    fail("Could not process your message.", 500);
}

echo json_encode(["ok" => true]);
