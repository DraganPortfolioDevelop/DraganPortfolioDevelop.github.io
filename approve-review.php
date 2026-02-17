<?php
// Sigurnosni token koji samo ti znaš
$valid_token = "ddd561ee69b20d6a470fed6ecf7dd9f3";

// Provera tokena
if (!isset($_GET["token"]) || $_GET["token"] !== $valid_token) {
    die("❌ Nevažeći token. Pristup odbijen.");
}

$jsonFile = __DIR__ . "/reviews-approved.json";

$name    = urldecode($_GET["name"] ?? "Anonimno");
$rating  = (int)($_GET["rating"] ?? 0);
$comment = urldecode($_GET["comment"] ?? "");
$date    = date("Y-m-d");

// Učitavanje postojećih recenzija
$reviews = file_exists($jsonFile)
    ? json_decode(file_get_contents($jsonFile), true)
    : [];

// Nova recenzija
$reviews[] = [
    "name"    => $name,
    "rating"  => $rating,
    "comment" => $comment,
    "date"    => $date
];

// Upis u JSON
file_put_contents($jsonFile, json_encode($reviews, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
?>
<h1>Recenzija odobrena! 🎉</h1>
<p>Automatski je dodata na sajt.</p>

<h3>Tekst za Instagram:</h3>
<pre>„<?= htmlspecialchars($comment) ?>”
Ocena: <?= $rating ?> ⭐
— <?= htmlspecialchars($name) ?></pre>

<a href="https://www.google.com/maps/search/?api=1&query=Salon+La+Folie" target="_blank">
  Ostavi Google recenziju
</a>
