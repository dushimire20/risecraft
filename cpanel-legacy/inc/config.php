<?php
// Shared config/helpers for the PHP backend (form handlers + admin panel).
// Change this before deploying, same as the old ADMIN_PASSWORD env var.
define("ADMIN_PASSWORD", "risecraft2026");

define("FC_ALLOWED_ICONS", [
    "sewing-machine", "tag", "dress-form", "shirt", "jacket", "tshirt",
    "chat", "briefcase", "growth", "person", "clock", "tools", "people",
    "cap", "mail", "phone", "pin", "check",
]);

function fc_storage_dir() {
    $root = rtrim($_SERVER["DOCUMENT_ROOT"], "/\\");
    $dir = dirname($root) . "/fc_risecraft_data";
    if (!is_dir($dir)) {
        mkdir($dir, 0750, true);
    }
    return $dir;
}

function fc_content_path() {
    return fc_storage_dir() . "/content.json";
}

function fc_submissions_path() {
    return fc_storage_dir() . "/submissions.json";
}

function fc_get_content() {
    $path = fc_content_path();
    if (!file_exists($path)) {
        $seed = __DIR__ . "/../content.seed.json";
        if (file_exists($seed)) {
            copy($seed, $path);
        } else {
            file_put_contents($path, json_encode([
                "site" => [], "services" => [], "products" => [],
                "trainings" => [], "whyChooseUs" => [],
            ]));
        }
    }
    $raw = file_get_contents($path);
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function fc_save_content($content) {
    file_put_contents(fc_content_path(), json_encode($content, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    return $content;
}

function fc_get_submissions() {
    $path = fc_submissions_path();
    if (!file_exists($path)) {
        return ["contact" => [], "enrollment" => []];
    }
    $data = json_decode(file_get_contents($path), true);
    return is_array($data) ? $data : ["contact" => [], "enrollment" => []];
}

function fc_save_submissions($data) {
    file_put_contents(fc_submissions_path(), json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
}

function fc_add_submission($type, $entry) {
    $data = fc_get_submissions();
    if (!isset($data[$type])) {
        $data[$type] = [];
    }
    $record = array_merge([
        "id" => $type . "-" . round(microtime(true) * 1000) . "-" . substr(bin2hex(random_bytes(4)), 0, 6),
        "receivedAt" => gmdate("Y-m-d\TH:i:s\Z"),
        "read" => false,
    ], $entry);
    array_unshift($data[$type], $record);
    fc_save_submissions($data);
    return $record;
}

function fc_mark_submission_read($type, $id) {
    $data = fc_get_submissions();
    if (!isset($data[$type])) return false;
    foreach ($data[$type] as &$record) {
        if ($record["id"] === $id) {
            $record["read"] = true;
            fc_save_submissions($data);
            return true;
        }
    }
    return false;
}

function fc_delete_submission($type, $id) {
    $data = fc_get_submissions();
    if (!isset($data[$type])) return false;
    $before = count($data[$type]);
    $data[$type] = array_values(array_filter($data[$type], function ($r) use ($id) {
        return $r["id"] !== $id;
    }));
    fc_save_submissions($data);
    return count($data[$type]) < $before;
}

function fc_require_admin() {
    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_start();
    }
    if (empty($_SESSION["fc_admin_authed"])) {
        header("Location: login.php");
        exit;
    }
}

function fc_csrf_token() {
    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_start();
    }
    if (empty($_SESSION["fc_csrf"])) {
        $_SESSION["fc_csrf"] = bin2hex(random_bytes(16));
    }
    return $_SESSION["fc_csrf"];
}

function fc_csrf_check($token) {
    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_start();
    }
    return !empty($_SESSION["fc_csrf"]) && is_string($token) && hash_equals($_SESSION["fc_csrf"], $token);
}

function fc_h($value) {
    return htmlspecialchars((string) $value, ENT_QUOTES, "UTF-8");
}

function fc_slugify($text) {
    $slug = strtolower(trim((string) $text));
    $slug = preg_replace("/[^a-z0-9]+/", "-", $slug);
    $slug = trim($slug, "-");
    return $slug !== "" ? $slug : "item-" . substr(bin2hex(random_bytes(3)), 0, 6);
}

function fc_handle_image_upload($fileEntry) {
    if (!is_array($fileEntry) || ($fileEntry["error"] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
        return null;
    }
    if ($fileEntry["error"] !== UPLOAD_ERR_OK) {
        return null;
    }
    if ($fileEntry["size"] > 5 * 1024 * 1024) {
        return null;
    }
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $fileEntry["tmp_name"]);
    finfo_close($finfo);
    $extByMime = [
        "image/jpeg" => "jpg",
        "image/png" => "png",
        "image/webp" => "webp",
    ];
    if (!isset($extByMime[$mime])) {
        return null;
    }
    $ext = $extByMime[$mime];
    $dir = rtrim($_SERVER["DOCUMENT_ROOT"], "/\\") . "/products";
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    $filename = bin2hex(random_bytes(8)) . "." . $ext;
    if (!move_uploaded_file($fileEntry["tmp_name"], $dir . "/" . $filename)) {
        return null;
    }
    return "/products/" . $filename;
}
