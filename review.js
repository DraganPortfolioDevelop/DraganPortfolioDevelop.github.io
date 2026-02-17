$("#sendReview").submit(function(e) {
  e.preventDefault();

  $.ajax({
    url: backendUrl,
    method: "POST",
    contentType: "application/x-www-form-urlencoded",
    data: {
      name: $("#name").val(),
      email: $("#email").val(),
      rating: $("#rating").val(),
      comment: $("#comment").val()
    },
    success: function() {
      alert("Hvala vam! Vaša recenzija je uspešno poslata.");
    },
    error: function(err) {
      console.log("Greška:", err);
      alert("Došlo je do greške. Pokušajte ponovo.");
    }
  });
});
