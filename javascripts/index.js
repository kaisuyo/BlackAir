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
  new Swiper(mainSliderSelector, mainSliderOptions);

  let bannerNext = $("#banner .right");
  let bannerPrev = $("#banner .left");
  $("#sub-banner .right").on("click", () => {
    bannerNext.click();
  });
  $("#sub-banner .left").on("click", () => {
    bannerPrev.click();
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
  $('.filter').toArray().forEach( tag => {
    $(tag).on('click', () => {
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
    })
  })
  // end isotope
};

function parallax(id) {
  $(`#${id} .parallax`).css("transform", `translateY(calc(${(window.scrollY - $('#'+id).offset().top + Number($('#'+id).css('margin-top').replace('px', '')))*0.5}px))`);
}

(() => {
  'use strict';

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach((form) => {
    form.addEventListener('submit', (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();