// ------------------ nav - menu-open

$(document).ready(function(){
  $(".ham-burger, .nav ul li a").click(function(){

    $(".nav").toggleClass("open")
    $(".ham-burger").toggleClass("active")
  })
})

// ------------------ Background video
$(document).ready(function() {
  const $video = $('#bg-video');
  const videoEl = $video[0]; // Get the native DOM element
  
  // Ensure video plays only once (remove loop if exists)
  $video.removeAttr('loop');
  
  // Pause video when it ends
  $video.on('ended', function() {
    videoEl.pause();
  });
  
  // Try autoplay first
  videoEl.play().catch(function(error) {
    console.log('Autoplay blocked, will play on first interaction');
    
    // Fallback: Play on first click/touch (only once)
    $(document).one('click touchstart', function() {
      videoEl.play();
    });
  });
});

// ------------------ Arrow scroll the page back to the top
$(document).ready(function() {
  const $scrollButton = $('.scroll-to-top');
  
  // Show/hide button based on scroll position
  $(window).scroll(function() {
    const scrollTop = $(this).scrollTop();
    const windowHeight = $(this).height();
    const docHeight = $(document).height();
    
    // Calculate scroll percentage
    const scrollPercent = (scrollTop / (docHeight - windowHeight)) * 100;
    
    // Update progress ring
    $('.progress-circle circle').css('stroke-dashoffset', 100 - scrollPercent);
    
    // Toggle visibility
    if (scrollTop > 300) {
      $scrollButton.addClass('visible');
    } else {
      $scrollButton.removeClass('visible');
    }
  }).trigger('scroll');

  // Smooth scroll to top
  $scrollButton.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 800, 'easeInOutQuint');
    
    // Add click animation
    $(this).addClass('clicked');
    setTimeout(() => $(this).removeClass('clicked'), 300);
  });
  
  // Add easing function for smooth scrolling
  $.extend($.easing, {
    easeInOutQuint: function(x, t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
      return c/2*((t-=2)*t*t*t*t + 2) + b;
    }
  });
});
// $(document).ready(function() {
//   $(window).scroll(function() {
//     if ($(this).scrollTop() > 100) {
//       $('.scroll-to-top').fadeIn();
//     } else {
//       $('.scroll-to-top').fadeOut();
//     }
//   });

//   $(window).trigger('scroll'); // Trigger scroll event on page load

//   $('.scroll-to-top').click(function() {
//     $('html, body').animate({scrollTop : 0}, 100);
//     return false;
//   });
// });

// ------------------ Highlight each second line
$(".accordian-container p span").each(function(index){
  if (index % 2 == 1) {
    $(this).parent().css({"background-color": "#AC7D88", "border-radius": "0 1rem 0 1rem"});
  }
});

// ------------------ Create an infinite horizontal scroll animation
$(document).ready(function() {
  // Initialize scroller
  $('.brands-scroller').attr('data-animated', 'true');
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


