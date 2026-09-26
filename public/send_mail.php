<?php
/**
 * Contact form handler: forwards messages from the portfolio contact form by email.
 * Expects a POST request with the fields "name", "mail" and "message".
 */

const RECIPIENT = 'contact@robin4consulting.com';
const SENDER = 'contact@robin4consulting.com';
const SUBJECT_PREFIX = 'Portfolio contact from';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Strip line breaks from values used in headers to prevent header injection
$name = trim(str_replace(["\r", "\n"], ' ', $_POST['name'] ?? ''));
$email = trim($_POST['mail'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid form data']);
    exit;
}

$subject = '=?UTF-8?B?' . base64_encode(SUBJECT_PREFIX . ' ' . $name) . '?=';
$body = "Name: {$name}\nEmail: {$email}\n\n{$message}\n";
$headers = implode("\r\n", [
    'From: Robin4consulting <' . SENDER . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    'Content-Transfer-Encoding: 8bit',
]);

if (mail(RECIPIENT, $subject, $body, $headers, '-f' . SENDER)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Mail could not be sent']);
}
