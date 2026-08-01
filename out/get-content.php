<?php
// Public, unauthenticated endpoint the live site fetches at runtime so
// admin edits show up without a rebuild.
require __DIR__ . "/inc/config.php";

header("Content-Type: application/json");
header("Cache-Control: no-store");

echo json_encode(fc_get_content(), JSON_UNESCAPED_SLASHES);
