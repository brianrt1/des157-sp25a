/* var scene = document.getElementById('scene');
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

 */

var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene);

$(document).ready(function() {
  // Store animation interval IDs to clear them when mouse leaves
  let animationIntervals = {
    guitar: null,
    comb: null,
    birds: null,
    tractor: null,
    pitchfork: null
  };
  
  // Helper function for wiggle animation with rotation
  function wiggleElement($element, callback) {
    const originalLeft = parseInt($element.css('left'));
    const originalTop = parseInt($element.css('top'));
    const originalRotate = $element.data('rotation') || 0;
    
    $element
      .animate({left: originalLeft - 15, rotate: originalRotate - 5 + 'deg'}, 400)
      .animate({left: originalLeft + 15, rotate: originalRotate + 5 + 'deg'}, 400)
      .animate({left: originalLeft - 8, rotate: originalRotate - 3 + 'deg'}, 300)
      .animate({left: originalLeft + 8, rotate: originalRotate + 3 + 'deg'}, 300)
      .animate({left: originalLeft, rotate: originalRotate + 'deg'}, 300, callback);
  }
  
  // Helper function for jump animation
  function jumpElement($element, callback) {
    const originalTop = parseInt($element.css('top'));
    
    $element
      .animate({top: originalTop - 40}, 400)
      .animate({top: originalTop}, 400, callback);
  }
  
  // Function to setup repeating animations
  function setupRepeatingAnimation($element, animType, intervalKey) {
    // Clear any existing interval for this element
    if (animationIntervals[intervalKey]) {
      clearInterval(animationIntervals[intervalKey]);
    }
    
    // Initial animation
    if (animType === 'jump') {
      jumpElement($element);
    } else if (animType === 'wiggle') {
      wiggleElement($element);
    } else if (animType === 'both') {
      jumpElement($element, function() {
        wiggleElement($element);
      });
    }
    
    // Set up repeating animation every 4 seconds
    animationIntervals[intervalKey] = setInterval(function() {
      if (animType === 'jump') {
        jumpElement($element);
      } else if (animType === 'wiggle') {
        wiggleElement($element);
      } else if (animType === 'both') {
        jumpElement($element, function() {
          wiggleElement($element);
        });
      }
    }, 4000); // Repeat every 4 seconds
  }

  // Overlay 1 - Guitar and Comb
  $('.overlay-1').hover(
    function() { // Mouse enter
      // Store initial rotation for resetting
      $('.guitar-1').data('rotation', 0);
      $('.comb-1').data('rotation', 0);
      
      // Show guitar with jump effect
      $('.guitar-1')
        .css('display', 'block')
        .animate({opacity: 1}, 500, function() {
          setupRepeatingAnimation($(this), 'jump', 'guitar');
        });
      
      // Show comb with wiggle and rotation effect
      $('.comb-1')
        .css('display', 'block')
        .animate({opacity: 1}, 500, function() {
          setupRepeatingAnimation($(this), 'wiggle', 'comb');
        });
    },
    function() { // Mouse leave
      // Clear the animation intervals
      clearInterval(animationIntervals.guitar);
      clearInterval(animationIntervals.comb);
      
      // Fade out elements
      $('.guitar-1').animate({opacity: 0}, 700, function() {
        $(this).css({'display': 'none', 'rotate': '0deg'});
      });
      $('.comb-1').animate({opacity: 0}, 700, function() {
        $(this).css({'display': 'none', 'rotate': '0deg'});
      });
    }
  );

  // Overlay 2 - Birds
  $('.overlay-2').hover(
    function() { // Mouse enter
      // Store initial rotation
      $('.birds-1').data('rotation', 0);
      
      // Show birds with combined effects
      $('.birds-1')
        .css('display', 'block')
        .animate({opacity: 1}, 500, function() {
          setupRepeatingAnimation($(this), 'both', 'birds');
        });
    },
    function() { // Mouse leave
      // Clear the animation interval
      clearInterval(animationIntervals.birds);
      
      // Fade out birds
      $('.birds-1').animate({opacity: 0}, 700, function() {
        $(this).css({'display': 'none', 'rotate': '0deg'});
      });
    }
  );

  // Overlay 3 - Tractor and Pitchfork
  $('.overlay-3').hover(
    function() { // Mouse enter
      // Store initial rotation values
      $('.tractor-1').data('rotation', 0);
      $('.pitchfork-1').data('rotation', 0);
      
      // Show tractor with wiggle and slight rotation effect (like engine rumbling)
      $('.tractor-1')
        .css('display', 'block')
        .animate({opacity: 1}, 500, function() {
          setupRepeatingAnimation($(this), 'wiggle', 'tractor');
        });
      
      // Show pitchfork with jump effect
      $('.pitchfork-1')
        .css('display', 'block')
        .animate({opacity: 1}, 500, function() {
          setupRepeatingAnimation($(this), 'jump', 'pitchfork');
        });
    },
    function() { // Mouse leave
      // Clear the animation intervals
      clearInterval(animationIntervals.tractor);
      clearInterval(animationIntervals.pitchfork);
      
      // Fade out elements
      $('.tractor-1').animate({opacity: 0}, 700, function() {
        $(this).css({'display': 'none', 'rotate': '0deg'});
      });
      $('.pitchfork-1').animate({opacity: 0}, 700, function() {
        $(this).css({'display': 'none', 'rotate': '0deg'});
      });
    }
  );
});