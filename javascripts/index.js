window.onload = () => {
  new WOW().init();
  // team
  new Swiper(".mySwiper", {
    slidesPerView: 3,
    slidesPerGroup: 3,
    loop: true,
    loopFillGroupWithBlank: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  
  // banner
  // Params
  let mainSliderSelector = ".main-slider",
    interleaveOffset = 0.5;

  // Main Slider
  let mainSliderOptions = {
    loop: true,
    speed: 800,
    autoplay: {
      delay: 8000,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      init: function () {
        this.autoplay.stop();
        $('#mark-banner').css('animation', '8s widthChange linear');
      },
      imagesReady: function () {
        this.el.classList.remove("loading");
        this.autoplay.start();
      },
      
      progress: function () {
        let swiper = this;
        for (let i = 0; i < swiper.slides.length; i++) {
          let slideProgress = swiper.slides[i].progress,
            innerOffset = swiper.width * interleaveOffset,
            innerTranslate = slideProgress * innerOffset;
          swiper.slides[i].querySelector(".slide-bgimg").style.transform =
            "translateX(" + innerTranslate + "px)";
        }
      },
      touchStart: function () {
        let swiper = this;
        for (let i = 0; i < swiper.slides.length; i++) {
          swiper.slides[i].style.transition = "";
        }
      },
      setTransition: function (speed) {
        let swiper = this;
        for (let i = 0; i < swiper.slides.length; i++) {
          swiper.slides[i].style.transition = speed + "ms";
          swiper.slides[i].querySelector(".slide-bgimg").style.transition =
            speed + "ms";
        }
      },
    },
  };
  let bannerSlider = new Swiper(mainSliderSelector, mainSliderOptions);

  bannerSlider.on('slideChangeTransitionStart', () => {
    $('#mark-banner').css('animation', '');
  });
  bannerSlider.on('slideChangeTransitionEnd', () => {
    $('#mark-banner').css('animation', '8s widthChange linear');
  });

  $("#sub-banner .right").on("click", () => {
    $("#banner .right").click();
  });
  $("#sub-banner .left").on("click", () => {
    $("#banner .left").click();
  });

  window.onscroll = () => {
    parallax('banner');
    parallax('excellence');
  };

  // end banner

  // our team
  let ourTeamNext = $("#our-team .swiper-button-next");
  let ourTeamPrev = $("#our-team .swiper-button-prev");
  ourTeamNext.css("display", "none");
  ourTeamPrev.css("display", "none");
  $("#our-team .right").on("click", () => {
    ourTeamNext.click();
  });
  $("#our-team .left").on("click", () => {
    ourTeamPrev.click();
  });

  // isotope
  $('.grid').isotope({
    itemSelector: '.grid-item',
    percentPosition: true,
    filter: '*',
    masonry: {
      columnWidth: '.grid-item'
    }
  });
  modalSlide();

  $('.filter').toArray().forEach( tag => {
    $(tag).on('click', () => {
      $('.grid').off('arrangeComplete,', modalSlide);
      $('.filter.active').removeClass('active');
      $(tag).addClass('active');
      let className = `.${$(tag).html().toLowerCase()}`;
      if (className == '.all') className = '*';
      $('.grid').isotope({
        itemSelector: '.grid-item',
        percentPosition: true,
        filter: className,
        masonry: {
          columnWidth: '.grid-item'
        }
      });
      $('.grid').on('arrangeComplete', modalSlide);
    });
  });
  // end isotope
  
  // enable scroll bar
  $('#overlay-portfolio').on('input', () => {
    enableScroll();
  });

  // promotion
  $('#promotions .left').on('click', () => {
    $('#promotions .carousel-control-prev').click();
  });
  $('#promotions .right').on('click', () => {
    $('#promotions .carousel-control-next').click();
  });
  // end promotion

  // testimonials
  $('#testimonials .left').on('click', () => {
    $('.carousel-control-prev').click();
  });
  $('#testimonials .right').on('click', () => {
    $('.carousel-control-next').click();
  });
  // end testimonials

  // scroll top
  window.onscroll = () => {
    if (window.scrollY > 470) {
      $('#scroll-up').css('visibility', 'visible');
    } else {
      $('#scroll-up').css('visibility', 'hidden');
    }
  }
  $('#scroll-up').on('click', () => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  });
};

function parallax(id) {
  $(`#${id} .parallax`).css("transform", `translateY(calc(${(window.scrollY - $('#'+id).offset().top + Number($('#'+id).css('margin-top').replace('px', '')))*0.5}px))`);
}
// form check
(() => {
  'use strict';

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach((form) => {
    form.addEventListener('submit', (event) => {
      $('#contact .loading').css('visibility', 'visible');
      if (!form.checkValidity()) {
        $('#contact .loading').css('visibility', 'hidden');
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();

// scroll control

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}
// end scroll control


// modal slide
function modalSlide() {
  let list = $('#portfolio .grid-item').toArray().filter( x => $(x).is(':visible'));
  $('.main-slide').toArray().forEach( tag => {$(tag).removeClass('main-slide')});
  let codeRender = '';
  list.forEach( (tag, index) => {
    codeRender += `
    <label for="" class="inner-custom-modal">
    <img src="${$(tag).find('img').attr('src')}" alt="" class="">
    <div class="btn-arrow btn-arrow-small-size btn-arrow-round btn-arrow-left position-absolute top-50 start-0 ms-4"></div>
    <div class="btn-arrow btn-arrow-small-size btn-arrow-round btn-arrow-right position-absolute top-50 end-0 me-4"></div>
    <label for="overlay-portfolio" class="btn-arrow btn-arrow-small-size btn-arrow-round btn-arrow-close position-absolute" style="top: -15px; right: -15px"></label>
    <div class="left" title="previous"></div>
    <div class="right" title="next"></div>
    </label>
    `
  });
  $('.custom-modal').html(codeRender);
  
  let tagList = $('.inner-custom-modal').toArray();
  list.forEach( (tag, index) => {
    $('.main-slide').toArray().forEach( tag => {$(tag).removeClass('main-slide')});
    $(tag).on('click', () => {
      disableScroll();
      clearAnimarionportfolio();
      
      $('#overlay-portfolio').prop('checked', true);
      $('#overlay-portfolio').on('change', () => {
        if (!$('#overlay-portfolio').attr('checked')) {
          clearAnimarionportfolio();
        }
      });
      // active slider
      $(tagList[index]).addClass('main-slide');
      let curr = index;

      $('#portfolio .left').on('click', () => {
        // clear mail slide
        $('.main-slide').toArray().forEach( tag => {$(tag).removeClass('main-slide')});
        clearAnimarionportfolio();

        $(tagList[curr]).addClass('rightOut');

        let prev = (curr == 0)? tagList.length-1 : curr-1;
        $(tagList[prev]).addClass('leftIn');

        curr = prev;
      });

      $('#portfolio .right').on('click', () => {
        $('.main-slide').toArray().forEach( tag => {$(tag).removeClass('main-slide')});
        clearAnimarionportfolio();

        $(tagList[curr]).addClass('leftOut');

        let next = (curr == tagList.length-1)? 0 : curr+1;
        $(tagList[next]).addClass('rightIn');
        
        curr = next;
      });
    });
  });
}

function clearAnimarionportfolio() {
  $('.leftIn').toArray().forEach( tag => {$(tag).removeClass('leftIn')});
  $('.leftOut').toArray().forEach( tag => {$(tag).removeClass('leftOut')});
  $('.rightIn').toArray().forEach( tag => {$(tag).removeClass('rightIn')});
  $('.rightOut').toArray().forEach( tag => {$(tag).removeClass('rightOut')});
}

// end modal slide