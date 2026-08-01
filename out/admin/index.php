<?php
require __DIR__ . "/../inc/config.php";
fc_require_admin();

$submissions = fc_get_submissions();
$unreadCount = 0;
foreach (["contact", "enrollment"] as $type) {
    foreach (($submissions[$type] ?? []) as $r) {
        if (empty($r["read"])) $unreadCount++;
    }
}
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Admin — FC Risecraft</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="style.css">
</head>
<body>
<header class="admin-header">
  <div><a href="index.php">FC Risecraft Admin</a></div>
  <div><a href="logout.php">Log out</a></div>
</header>
<main>
  <div class="card">
    <h2>Site content</h2>
    <p class="muted">Edit site info, services, products, trainings and "why choose us". Changes appear on the live site immediately.</p>
    <a class="btn" href="content.php">Edit content</a>
  </div>
  <div class="card">
    <h2>Submissions <?php if ($unreadCount): ?><span class="muted">(<?= (int) $unreadCount ?> unread)</span><?php endif; ?></h2>
    <p class="muted">Messages from the contact and enroll forms.</p>
    <a class="btn" href="submissions.php">View submissions</a>
  </div>
</main>
</body>
</html>
