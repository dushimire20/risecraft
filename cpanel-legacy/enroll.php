<?php
// Handles the site's Enroll form. Deployed to cPanel alongside the static export.
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
$course = trim($body["course"] ?? "");
$message = trim($body["message"] ?? "");

if ($name === "" || $phone === "" || $course === "") {
    fail("Name, phone number and course are required.");
}
if ($email !== "" && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail("Please provide a valid email address.");
}

$name = mb_substr($name, 0, 200);
$email = mb_substr($email, 0, 200);
$phone = mb_substr($phone, 0, 60);
$course = mb_substr($course, 0, 200);
$message = mb_substr($message, 0, 4000);

fc_add_submission("enrollment", [
    "name" => $name,
    "email" => $email,
    "phone" => $phone,
    "course" => $course,
    "message" => $message,
]);

$subject = "New enrollment: " . $course;
$body_lines = [
    "Name: $name",
    "Phone: $phone",
    "Email: " . ($email !== "" ? $email : "-"),
    "Course: $course",
    "",
    "Message:",
    ($message !== "" ? $message : "-"),
];
$emailBody = implode("\n", $body_lines);

$headers = "From: no-reply@" . ($_SERVER["HTTP_HOST"] ?? "risecraft.rw") . "\r\n";
if ($email !== "") {
    $headers .= "Reply-To: " . $email . "\r\n";
}

$sent = mail($toEmail, $subject, $emailBody, $headers);

if (!$sent) {
    fail("Could not process your enrollment.", 500);
}

echo json_encode(["ok" => true]);
