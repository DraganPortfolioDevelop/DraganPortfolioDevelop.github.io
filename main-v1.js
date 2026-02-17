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
  if ($video.length) {
      const videoEl = $video[0];
      videoEl.play();
  }

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

// Text animation service
$(document).ready(function() {
    const $typingElement = $('#typingElement');
    const $videoContainer = $('#videoContainer');
    const $video = $('#serviceVideo');
    
    const words = ['Marka Oreškovića 9, Beograd', 'Zakažite termin', 'Telefon: +381 64 9329522', 'Lepota počinje frizurom, a završava osmehom!', 'Salon La Folie'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let typingTimeout;
    let animationStarted = false;
    let videoPlayed = false;
    let typingCompleted = false;

    // Function to handle the typing animation
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Deleting characters
            $typingElement.text(currentWord.substring(0, charIndex - 1));
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Typing characters
            $typingElement.text(currentWord.substring(0, charIndex + 1));
            charIndex++;
            typingSpeed = 100; // Normal speed when typing
        }
        
        // Check if word is complete
        if (!isDeleting && charIndex === currentWord.length) {
            // Pause at the end of the word
            typingSpeed = 1500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to the next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before starting next word
            
            // Check if we've completed one full cycle through all words
            if (wordIndex === 0) {
                typingCompleted = true;
                restartVideo();
                return; // Stop the typing animation
            }
        }
        
        typingTimeout = setTimeout(type, typingSpeed);
    }

    // Function to restart the video
    function restartVideo() {
        console.log('Typing animation completed - restarting video');
        $videoContainer.removeClass('video-ended');
        $video[0].currentTime = 0;
        $video[0].play().then(() => {
            console.log('Video restarted');
            // Reset animation flags for next cycle
            animationStarted = false;
            typingCompleted = false;
            videoPlayed = true;
        }).catch((error) => {
            console.log('Video restart failed:', error);
            // If video restart fails, restart the typing animation after a delay
            setTimeout(() => {
                animationStarted = false;
                typingCompleted = false;
                startAnimation();
            }, 2000);
        });
    }

    // Function to start the animation
    function startAnimation() {
        if (animationStarted) return; // Prevent multiple starts
        animationStarted = true;
        
        $videoContainer.addClass('video-ended');
        // Start typing animation after a short delay
        setTimeout(() => {
            type();
        }, 800);
    }

    // Function to play video when element is in viewport
    function playVideoWhenVisible() {
        if (videoPlayed && !typingCompleted) return;
        
        const element = $videoContainer[0];
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Check if element is in viewport (with some offset)
        if (rect.top <= windowHeight * 0.8 && rect.bottom >= 0) {
            $video[0].play().then(() => {
                console.log('Video started playing');
                videoPlayed = true;
            }).catch((error) => {
                console.log('Video play failed, starting animation directly:', error);
                startAnimation();
            });
        }
    }

    // Video ended event
    $video.on('ended', function() {
        console.log('Video ended - starting animation');
        // Start the text animation
        startAnimation();
    });
    
    // Video error event
    $video.on('error', function() {
        console.log('Video error - starting animation directly');
        startAnimation();
    });
    
    // Ensure video only plays once and doesn't loop automatically
    $video.attr('loop', false);
    // $video.attr('autoplay', false); // Remove autoplay, we'll control it manually

    // Check if video is already ended (in case it loaded quickly)
    if ($video[0].readyState >= 3) {
        if ($video[0].ended) {
            console.log('Video already ended');
            startAnimation();
        }
    }

    // Scroll event to trigger video play when element is visible
    $(window).on('scroll', playVideoWhenVisible);
    
    // Also check on page load
    playVideoWhenVisible();

    // Fallback: if video doesn't trigger ended event, start animation after reasonable time
    setTimeout(function() {
        if (!$videoContainer.hasClass('video-ended') && !animationStarted) {
            console.log('Fallback triggered - starting animation');
            $video[0].pause();
            startAnimation();
        }
    }, 10000); // 10 second fallback
});

// Poveži leave_review.html sa Google backendom
const backendUrl = "https://script.google.com/macros/s/AKfycbygkJtJwE5wOsV5tk_Gg8x66qVrxUN5LvRd3Rc0IcJC2yq6ZjKjA1GMCKvnNiFDO_AXCw/exec";

$("#sendReview").submit(function(e) {
  e.preventDefault();

  $.ajax({
    url: backendUrl,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      name: $("#name").val(),
      email: $("#email").val(),
      rating: $("#rating").val(),
      comment: $("#comment").val()
    }),
    success: function() {
      alert("Hvala vam! Vaša recenzija je uspešno poslata.");
    },
    error: function(err) {
      console.log("Greška:", err);
      alert("Došlo je do greške. Pokušajte ponovo.");
    }
  });
});
// Kako da prikažeš recenzije na sajtu (index.html)
fetch("https://docs.google.com/spreadsheets/d/1pDeA7dVekYPuF2V_jrGyg0qYj20u5bqTTA9JMsaCUNw/gviz/tq?tqx=out:json")
  .then(r => r.text())
  .then(text => {
    const json = JSON.parse(text.substring(47, text.length - 2));
    const rows = json.table.rows;

    rows.forEach(row => {
      const name = row.c[0]?.v;
      const email = row.c[1]?.v;
      const rating = row.c[2]?.v;
      const comment = row.c[3]?.v;
      const approved = row.c[4]?.v;

      if (approved === "yes") {
        document.querySelector("#reviews").innerHTML += ` <div class="review"> <h3>${name}</h3> <p>${comment}</p> <p>${rating} ⭐</p> </div> `;
      }
    });
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










