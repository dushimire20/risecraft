<?php
require __DIR__ . "/../inc/config.php";
fc_require_admin();

$error = "";
$saved = isset($_GET["saved"]);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $token = $_POST["csrf"] ?? "";
    if (!fc_csrf_check($token)) {
        $error = "Session expired, please try again.";
    } else {
        $site = $_POST["site"] ?? [];
        $newContent = [
            "site" => [
                "name" => trim($site["name"] ?? ""),
                "shortName" => trim($site["shortName"] ?? ""),
                "tagline" => trim($site["tagline"] ?? ""),
                "subTagline" => trim($site["subTagline"] ?? ""),
                "description" => trim($site["description"] ?? ""),
                "phone" => trim($site["phone"] ?? ""),
                "email" => trim($site["email"] ?? ""),
                "location" => trim($site["location"] ?? ""),
                "heroKicker" => trim($site["heroKicker"] ?? ""),
                "heroHeadline" => trim($site["heroHeadline"] ?? ""),
                "heroSub" => trim($site["heroSub"] ?? ""),
            ],
            "services" => [],
            "products" => [],
            "trainings" => [],
            "whyChooseUs" => [],
        ];

        foreach (($_POST["services"] ?? []) as $row) {
            $title = trim($row["title"] ?? "");
            if ($title === "") continue;
            $id = trim($row["id"] ?? "") ?: ("svc-" . substr(bin2hex(random_bytes(4)), 0, 8));
            $icon = in_array($row["icon"] ?? "", FC_ALLOWED_ICONS, true) ? $row["icon"] : "check";
            $newContent["services"][] = [
                "id" => $id, "icon" => $icon, "title" => $title,
                "description" => trim($row["description"] ?? ""),
            ];
        }

        foreach (($_POST["trainings"] ?? []) as $row) {
            $title = trim($row["title"] ?? "");
            if ($title === "") continue;
            $id = trim($row["id"] ?? "") ?: ("trn-" . substr(bin2hex(random_bytes(4)), 0, 8));
            $icon = in_array($row["icon"] ?? "", FC_ALLOWED_ICONS, true) ? $row["icon"] : "check";
            $newContent["trainings"][] = [
                "id" => $id, "icon" => $icon, "title" => $title,
                "description" => trim($row["description"] ?? ""),
                "standalone" => !empty($row["standalone"]),
            ];
        }

        foreach (($_POST["whyChooseUs"] ?? []) as $row) {
            $title = trim($row["title"] ?? "");
            if ($title === "") continue;
            $id = trim($row["id"] ?? "") ?: ("why-" . substr(bin2hex(random_bytes(4)), 0, 8));
            $icon = in_array($row["icon"] ?? "", FC_ALLOWED_ICONS, true) ? $row["icon"] : "check";
            $newContent["whyChooseUs"][] = ["id" => $id, "icon" => $icon, "title" => $title];
        }

        foreach (($_POST["products"] ?? []) as $idx => $row) {
            $title = trim($row["title"] ?? "");
            if ($title === "") continue;
            $id = trim($row["id"] ?? "") ?: ("prd-" . substr(bin2hex(random_bytes(4)), 0, 8));
            $icon = in_array($row["icon"] ?? "", FC_ALLOWED_ICONS, true) ? $row["icon"] : "check";
            $slugSource = trim($row["slug"] ?? "") ?: $title;
            $slug = fc_slugify($slugSource);
            $imagesRaw = $row["images"] ?? "";
            $images = array_values(array_filter(array_map("trim", explode("\n", str_replace("\r", "", $imagesRaw)))));

            $fileMeta = $_FILES["products"]["name"][$idx]["imageUpload"] ?? "";
            if ($fileMeta !== "") {
                $singleFile = [
                    "name" => $_FILES["products"]["name"][$idx]["imageUpload"],
                    "type" => $_FILES["products"]["type"][$idx]["imageUpload"],
                    "tmp_name" => $_FILES["products"]["tmp_name"][$idx]["imageUpload"],
                    "error" => $_FILES["products"]["error"][$idx]["imageUpload"],
                    "size" => $_FILES["products"]["size"][$idx]["imageUpload"],
                ];
                $uploaded = fc_handle_image_upload($singleFile);
                if ($uploaded) {
                    $images[] = $uploaded;
                }
            }

            $newContent["products"][] = [
                "id" => $id, "slug" => $slug, "icon" => $icon, "title" => $title,
                "description" => trim($row["description"] ?? ""),
                "images" => $images,
            ];
        }

        if ($newContent["site"]["name"] === "") {
            $error = "Site name is required.";
        } else {
            fc_save_content($newContent);
            header("Location: content.php?saved=1");
            exit;
        }
    }
}

$content = fc_get_content();
$site = $content["site"] ?? [];
$services = $content["services"] ?? [];
$products = $content["products"] ?? [];
$trainings = $content["trainings"] ?? [];
$whyChooseUs = $content["whyChooseUs"] ?? [];
$csrf = fc_csrf_token();

function fc_icon_select($name, $selected) {
    echo '<select name="' . fc_h($name) . '">';
    foreach (FC_ALLOWED_ICONS as $icon) {
        $sel = $icon === $selected ? " selected" : "";
        echo '<option value="' . fc_h($icon) . '"' . $sel . '>' . fc_h($icon) . '</option>';
    }
    echo '</select>';
}
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Edit content — FC Risecraft Admin</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="style.css">
</head>
<body>
<header class="admin-header">
  <div><a href="index.php">FC Risecraft Admin</a></div>
  <div><a href="logout.php">Log out</a></div>
</header>
<main>
  <h1>Edit site content</h1>
  <?php if ($saved): ?><p class="success">Saved. The live site now reflects these changes.</p><?php endif; ?>
  <?php if ($error): ?><p class="error"><?= fc_h($error) ?></p><?php endif; ?>

  <form method="post" enctype="multipart/form-data">
    <input type="hidden" name="csrf" value="<?= fc_h($csrf) ?>">

    <div class="card">
      <h2>Site info</h2>
      <label>Name</label>
      <input type="text" name="site[name]" value="<?= fc_h($site["name"] ?? "") ?>" required>
      <label>Short name</label>
      <input type="text" name="site[shortName]" value="<?= fc_h($site["shortName"] ?? "") ?>">
      <label>Tagline</label>
      <input type="text" name="site[tagline]" value="<?= fc_h($site["tagline"] ?? "") ?>">
      <label>Sub-tagline</label>
      <input type="text" name="site[subTagline]" value="<?= fc_h($site["subTagline"] ?? "") ?>">
      <label>Description</label>
      <textarea name="site[description]" rows="3"><?= fc_h($site["description"] ?? "") ?></textarea>
      <label>Phone</label>
      <input type="text" name="site[phone]" value="<?= fc_h($site["phone"] ?? "") ?>">
      <label>Email</label>
      <input type="email" name="site[email]" value="<?= fc_h($site["email"] ?? "") ?>">
      <label>Location</label>
      <input type="text" name="site[location]" value="<?= fc_h($site["location"] ?? "") ?>">
      <label>Hero kicker</label>
      <input type="text" name="site[heroKicker]" value="<?= fc_h($site["heroKicker"] ?? "") ?>">
      <label>Hero headline</label>
      <input type="text" name="site[heroHeadline]" value="<?= fc_h($site["heroHeadline"] ?? "") ?>">
      <label>Hero sub-text</label>
      <textarea name="site[heroSub]" rows="2"><?= fc_h($site["heroSub"] ?? "") ?></textarea>
    </div>

    <div class="card">
      <h2>Services</h2>
      <div id="services-list">
        <?php foreach ($services as $i => $s): ?>
        <div class="row-item">
          <button type="button" class="secondary remove-row">Remove</button>
          <input type="hidden" name="services[<?= $i ?>][id]" value="<?= fc_h($s["id"] ?? "") ?>">
          <label>Icon</label>
          <?php fc_icon_select("services[$i][icon]", $s["icon"] ?? ""); ?>
          <label>Title</label>
          <input type="text" name="services[<?= $i ?>][title]" value="<?= fc_h($s["title"] ?? "") ?>">
          <label>Description</label>
          <textarea name="services[<?= $i ?>][description]" rows="2"><?= fc_h($s["description"] ?? "") ?></textarea>
        </div>
        <?php endforeach; ?>
      </div>
      <div class="section-actions"><button type="button" class="secondary" data-add="services">Add service</button></div>
    </div>

    <div class="card">
      <h2>Products</h2>
      <div id="products-list">
        <?php foreach ($products as $i => $p): ?>
        <div class="row-item">
          <button type="button" class="secondary remove-row">Remove</button>
          <input type="hidden" name="products[<?= $i ?>][id]" value="<?= fc_h($p["id"] ?? "") ?>">
          <label>Icon</label>
          <?php fc_icon_select("products[$i][icon]", $p["icon"] ?? ""); ?>
          <label>Title</label>
          <input type="text" name="products[<?= $i ?>][title]" value="<?= fc_h($p["title"] ?? "") ?>">
          <label>Slug (used in the product's URL, leave blank to derive from title)</label>
          <input type="text" name="products[<?= $i ?>][slug]" value="<?= fc_h($p["slug"] ?? "") ?>">
          <label>Description</label>
          <textarea name="products[<?= $i ?>][description]" rows="2"><?= fc_h($p["description"] ?? "") ?></textarea>
          <label>Photos (one path per line)</label>
          <textarea name="products[<?= $i ?>][images]" rows="3"><?= fc_h(implode("\n", $p["images"] ?? [])) ?></textarea>
          <label>Upload a new photo (adds to the list above)</label>
          <input type="file" name="products[<?= $i ?>][imageUpload]" accept="image/jpeg,image/png,image/webp">
        </div>
        <?php endforeach; ?>
      </div>
      <div class="section-actions"><button type="button" class="secondary" data-add="products">Add product</button></div>
      <p class="muted">Note: a brand-new product needs a site rebuild to get its own clean URL. Existing products' text and photos update live.</p>
    </div>

    <div class="card">
      <h2>Trainings</h2>
      <div id="trainings-list">
        <?php foreach ($trainings as $i => $t): ?>
        <div class="row-item">
          <button type="button" class="secondary remove-row">Remove</button>
          <input type="hidden" name="trainings[<?= $i ?>][id]" value="<?= fc_h($t["id"] ?? "") ?>">
          <label>Icon</label>
          <?php fc_icon_select("trainings[$i][icon]", $t["icon"] ?? ""); ?>
          <label>Title</label>
          <input type="text" name="trainings[<?= $i ?>][title]" value="<?= fc_h($t["title"] ?? "") ?>">
          <label>Description</label>
          <textarea name="trainings[<?= $i ?>][description]" rows="2"><?= fc_h($t["description"] ?? "") ?></textarea>
          <label style="margin-top:10px;">
            <input type="checkbox" name="trainings[<?= $i ?>][standalone]" value="1" <?= ($t["standalone"] ?? true) ? "checked" : "" ?> style="width:auto; display:inline-block; margin-right:6px;">
            Can be enrolled in on its own
          </label>
          <p class="muted">Unchecked = it's an add-on included with any standalone course, not enrolled separately.</p>
        </div>
        <?php endforeach; ?>
      </div>
      <div class="section-actions"><button type="button" class="secondary" data-add="trainings">Add training</button></div>
    </div>

    <div class="card">
      <h2>Why choose us</h2>
      <div id="whyChooseUs-list">
        <?php foreach ($whyChooseUs as $i => $w): ?>
        <div class="row-item">
          <button type="button" class="secondary remove-row">Remove</button>
          <input type="hidden" name="whyChooseUs[<?= $i ?>][id]" value="<?= fc_h($w["id"] ?? "") ?>">
          <label>Icon</label>
          <?php fc_icon_select("whyChooseUs[$i][icon]", $w["icon"] ?? ""); ?>
          <label>Title</label>
          <input type="text" name="whyChooseUs[<?= $i ?>][title]" value="<?= fc_h($w["title"] ?? "") ?>">
        </div>
        <?php endforeach; ?>
      </div>
      <div class="section-actions"><button type="button" class="secondary" data-add="whyChooseUs">Add item</button></div>
    </div>

    <div class="card">
      <button type="submit">Save changes</button>
    </div>
  </form>
</main>

<script>
const ICONS = <?= json_encode(FC_ALLOWED_ICONS) ?>;
let counters = {
  services: <?= count($services) ?>,
  products: <?= count($products) ?>,
  trainings: <?= count($trainings) ?>,
  whyChooseUs: <?= count($whyChooseUs) ?>,
};

function iconOptions() {
  return ICONS.map((i) => `<option value="${i}">${i}</option>`).join("");
}

function rowTemplate(section, idx) {
  if (section === "services") {
    return `<div class="row-item">
      <button type="button" class="secondary remove-row">Remove</button>
      <input type="hidden" name="${section}[${idx}][id]" value="">
      <label>Icon</label>
      <select name="${section}[${idx}][icon]">${iconOptions()}</select>
      <label>Title</label>
      <input type="text" name="${section}[${idx}][title]" value="">
      <label>Description</label>
      <textarea name="${section}[${idx}][description]" rows="2"></textarea>
    </div>`;
  }
  if (section === "trainings") {
    return `<div class="row-item">
      <button type="button" class="secondary remove-row">Remove</button>
      <input type="hidden" name="trainings[${idx}][id]" value="">
      <label>Icon</label>
      <select name="trainings[${idx}][icon]">${iconOptions()}</select>
      <label>Title</label>
      <input type="text" name="trainings[${idx}][title]" value="">
      <label>Description</label>
      <textarea name="trainings[${idx}][description]" rows="2"></textarea>
      <label style="margin-top:10px;">
        <input type="checkbox" name="trainings[${idx}][standalone]" value="1" checked style="width:auto; display:inline-block; margin-right:6px;">
        Can be enrolled in on its own
      </label>
      <p class="muted">Unchecked = it's an add-on included with any standalone course, not enrolled separately.</p>
    </div>`;
  }
  if (section === "whyChooseUs") {
    return `<div class="row-item">
      <button type="button" class="secondary remove-row">Remove</button>
      <input type="hidden" name="whyChooseUs[${idx}][id]" value="">
      <label>Icon</label>
      <select name="whyChooseUs[${idx}][icon]">${iconOptions()}</select>
      <label>Title</label>
      <input type="text" name="whyChooseUs[${idx}][title]" value="">
    </div>`;
  }
  if (section === "products") {
    return `<div class="row-item">
      <button type="button" class="secondary remove-row">Remove</button>
      <input type="hidden" name="products[${idx}][id]" value="">
      <label>Icon</label>
      <select name="products[${idx}][icon]">${iconOptions()}</select>
      <label>Title</label>
      <input type="text" name="products[${idx}][title]" value="">
      <label>Slug (used in the product's URL, leave blank to derive from title)</label>
      <input type="text" name="products[${idx}][slug]" value="">
      <label>Description</label>
      <textarea name="products[${idx}][description]" rows="2"></textarea>
      <label>Photos (one path per line)</label>
      <textarea name="products[${idx}][images]" rows="3"></textarea>
      <label>Upload a new photo (adds to the list above)</label>
      <input type="file" name="products[${idx}][imageUpload]" accept="image/jpeg,image/png,image/webp">
    </div>`;
  }
  return "";
}

document.querySelectorAll("[data-add]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const section = btn.getAttribute("data-add");
    const list = document.getElementById(section + "-list");
    const idx = counters[section]++;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = rowTemplate(section, idx);
    list.appendChild(wrapper.firstElementChild);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.matches(".remove-row")) {
    e.target.closest(".row-item").remove();
  }
});
</script>
</body>
</html>
