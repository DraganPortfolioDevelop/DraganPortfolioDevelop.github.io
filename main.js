// ------------------ nav - menu-open

$(document).ready(function(){
  $(".ham-burger, .nav ul li a").click(function(){

    $(".nav").toggleClass("open")
    $(".ham-burger").toggleClass("active")
  })
})

// ------------------ Arrow scroll the page back to the top
$(document).ready(function() {
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  $('.scroll-to-top').click(function() {
    $('html, body').animate({scrollTop : 0}, 100);
    return false;
  });
});

// ------------------ Services and prices
$(".accordian-container .head").click(function(){
  $(".accordian-container .sub-text").slideUp();
  $(".accordian-container").removeClass("active");
  $(".accordian-container .head span").removeClass("fa-angle-down").addClass("fa-angle-up" );
  $(this).siblings(".sub-text").slideDown();
  $(this).parent().addClass("active");
  $(this).children("span").removeClass("fa-angle-up").addClass("fa-angle-down");
  
});
// ------------------ Highlight each second line
$(".accordian-container p span").each(function(index){
  if (index % 2 == 1) {
    $(this).parent().css({"background-color": "#AC7D88", "border-radius": "0 1rem 0 1rem"});
  }
});

// ------------------ Create an infinite horizontal scroll animation, https://www.youtube.com/watch?v=iLmBy-HKIAw
$(document).ready(function() {
  // Clone list items to fill empty space in scroller
  $('.brend-list li').clone().appendTo('.brend-list');

  // Set data-animated attribute to true
  $('.scroller').attr('data-animated', 'true');

  // Set animation duration based on data-speed attribute
  $('.scroller[data-speed="fast"]').css('--_animation-duration', '20s');
  $('.scroller[data-speed="slow"]').css('--_animation-duration', '60s');
});

// ------------------ Pick up from Instagram top 6 posts for gallery
// $(document).ready(function() {
//   var profileId = "your-instagram-profile-id";
//   var accessToken = "your-access-token";

//   $.ajax({
//     type: "GET",
//   url: "https://api.instagram.com/v1/users/" + profileId + "/media/recent/?access_token=" + accessToken + "&count=6",
//     dataType: "jsonp",
//     success: function(response) {
//       var images = response.data;
      
//       images.forEach(function(image) {
//         var imageUrl = image.images.standard_resolution.url;
//         var caption = image.caption.text;
        
//         $("#instagram-gallery").append("<img class='instagram-image' src='" + imageUrl + "' alt='" + caption + "'>");
//       });
//     },
//     error: function() {
//       console.log("Error loading Instagram images");
//     }
//   });
// });

