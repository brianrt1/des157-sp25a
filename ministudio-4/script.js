var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene);

$(document).ready(function() {
  // When hovering over overlay-1
  $('.overlay-1').hover(
    function() { // Mouse enter
      $('.guitar-1').css('display', 'block').animate({opacity: 1}, 500); // Show and fade in
      $('.comb-1').css('display', 'block').animate({opacity: 1}, 500);
    },
    function() { // Mouse leave
      $('.guitar-1').animate({opacity: 0}, 500, function() {
        $(this).css('display', 'none'); // Hide after fade out completes
      });
      $('.comb-1').animate({opacity: 0}, 500, function() {
        $(this).css('display', 'none');
      });
    }
  );

  //

  $('.overlay-2').hover(
    function() { // Mouse enter 
      $('.birds-1').css('display', 'block').animate({opacity: 1}, 500); // Show and fade in
     
    },
    function() { // Mouse leave
      
      $('.birds-1').animate({opacity: 0}, 500, function() {
        $(this).css('display', 'none'); // Hide after fade out completes
      });
      
    }
  );

  $('.overlay-3').hover(
    function() { // Mouse enter
    
      $('.tractor-1').css('display', 'block').animate({opacity: 1}, 500); // Show and fade in
      $('.pitchfork-1').css('display', 'block').animate({opacity: 1}, 500);
    },
    function() { // Mouse leave
      
      $('.tractor-1').animate({opacity: 0}, 500, function() {
        $(this).css('display', 'none'); // Hide after fade out completes
      });
      $('.pitchfork-1').animate({opacity: 0}, 500, function() {
        $(this).css('display', 'none');
      });
    }
  );

  


});

