<?php
require __DIR__ . "/../inc/config.php";

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}
if (!empty($_SESSION["fc_admin_authed"])) {
    header("Location: index.php");
    exit;
}

$error = "";
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $token = $_POST["csrf"] ?? "";
    $password = $_POST["password"] ?? "";
    if (!fc_csrf_check($token)) {
        $error = "Session expired, please try again.";
    } elseif (hash_equals(ADMIN_PASSWORD, (string) $password)) {
        session_regenerate_id(true);
        $_SESSION["fc_admin_authed"] = true;
        header("Location: index.php");
        exit;
    } else {
        $error = "Incorrect password.";
    }
}

$csrf = fc_csrf_token();
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Admin Login — FC Risecraft</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="style.css">
</head>
<body>
<main style="max-width:400px; margin-top: 60px;">
  <div class="card">
    <h1>FC Risecraft Admin</h1>
    <?php if ($error): ?>
      <p class="error"><?= fc_h($error) ?></p>
    <?php endif; ?>
    <form method="post">
      <input type="hidden" name="csrf" value="<?= fc_h($csrf) ?>">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" required autofocus>
      <div class="section-actions">
        <button type="submit">Log in</button>
      </div>
    </form>
  </div>
</main>
</body>
</html>
