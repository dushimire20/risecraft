<?php
require __DIR__ . "/../inc/config.php";
fc_require_admin();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $token = $_POST["csrf"] ?? "";
    if (fc_csrf_check($token)) {
        $type = $_POST["type"] ?? "";
        $id = $_POST["id"] ?? "";
        $action = $_POST["action"] ?? "";
        if (in_array($type, ["contact", "enrollment"], true) && $id !== "") {
            if ($action === "markRead") {
                fc_mark_submission_read($type, $id);
            } elseif ($action === "delete") {
                fc_delete_submission($type, $id);
            }
        }
    }
    header("Location: submissions.php");
    exit;
}

$csrf = fc_csrf_token();
$submissions = fc_get_submissions();
$contact = $submissions["contact"] ?? [];
$enrollment = $submissions["enrollment"] ?? [];

function fc_render_table($rows, $type, $columns, $csrf) {
    if (empty($rows)) {
        echo '<p class="muted">No submissions yet.</p>';
        return;
    }
    echo '<table><thead><tr>';
    foreach ($columns as $label) {
        echo '<th>' . fc_h($label) . '</th>';
    }
    echo '<th>Received</th><th>Actions</th></tr></thead><tbody>';
    foreach ($rows as $r) {
        $rowClass = empty($r["read"]) ? ' class="unread"' : '';
        echo "<tr{$rowClass}>";
        foreach (array_keys($columns) as $field) {
            echo '<td>' . nl2br(fc_h($r[$field] ?? "")) . '</td>';
        }
        echo '<td>' . fc_h($r["receivedAt"] ?? "") . '</td>';
        echo '<td class="actions-cell">';
        if (empty($r["read"])) {
            echo '<form method="post">'
                . '<input type="hidden" name="csrf" value="' . fc_h($csrf) . '">'
                . '<input type="hidden" name="type" value="' . fc_h($type) . '">'
                . '<input type="hidden" name="id" value="' . fc_h($r["id"]) . '">'
                . '<input type="hidden" name="action" value="markRead">'
                . '<button type="submit" class="secondary">Mark read</button>'
                . '</form> ';
        }
        echo '<form method="post" onsubmit="return confirm(\'Delete this submission?\');">'
            . '<input type="hidden" name="csrf" value="' . fc_h($csrf) . '">'
            . '<input type="hidden" name="type" value="' . fc_h($type) . '">'
            . '<input type="hidden" name="id" value="' . fc_h($r["id"]) . '">'
            . '<input type="hidden" name="action" value="delete">'
            . '<button type="submit" class="danger">Delete</button>'
            . '</form>';
        echo '</td></tr>';
    }
    echo '</tbody></table>';
}
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Submissions — FC Risecraft Admin</title>
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
    <h2>Contact messages</h2>
    <?php fc_render_table($contact, "contact", ["name" => "Name", "email" => "Email", "phone" => "Phone", "message" => "Message"], $csrf); ?>
  </div>
  <div class="card">
    <h2>Enrollments</h2>
    <?php fc_render_table($enrollment, "enrollment", ["name" => "Name", "phone" => "Phone", "email" => "Email", "course" => "Course", "message" => "Message"], $csrf); ?>
  </div>
</main>
</body>
</html>
