<?php
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
    exit;
}

$name    = trim($_POST["name"] ?? "Anonimno");
$email   = trim($_POST["email"] ?? "");
$rating  = trim($_POST["rating"] ?? "");
$comment = trim($_POST["comment"] ?? "");

// Generišemo sigurnosni token
$token = bin2hex(random_bytes(16));

// Enkodujemo podatke
$encoded_name    = urlencode($name);
$encoded_rating  = urlencode($rating);
$encoded_comment = urlencode($comment);
$encoded_token   = urlencode($token);

// Tvoja email adresa
$to = "salonlafolie@gmail.com";

$subject = "Nova recenzija čeka odobrenje — ocena $rating";

// Link za odobravanje
$approve_link = "https://salon-lafolie.com/approve-review.php?name=$encoded_name&rating=$encoded_rating&comment=$encoded_comment&token=$encoded_token";

// HTML email
$message = "
<html>
<body style='font-family:Arial;color:#333'>
  <h2>Nova recenzija sa sajta</h2>

  <p><strong>Ime:</strong> $name</p>
  <p><strong>Ocena:</strong> $rating ⭐</p>
  <p><strong>Komentar:</strong><br>$comment</p>

  <hr>
  <p><strong>Email klijenta (ne prikazuje se javno):</strong> $email</p>
  <hr>

  <p>Klikni na dugme ispod da ODOBRIŠ recenziju:</p>

  <p>
    <a href='$approve_link'
       style='padding:12px 20px;background:#85586F;color:#fff;text-decoration:none;border-radius:6px;'>
       ✅ Odobri recenziju
    </a>
  </p>

  <p style='font-size:12px;color:#777'>Ovaj link je zaštićen sigurnosnim tokenom.</p>
</body>
</html>
";

$headers  = "From: noreply@salon-lafolie.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

mail($to, $subject, $message, $headers);

echo json_encode(["status" => "success", "message" => "Hvala! Vaša recenzija čeka odobrenje."]);
?>
