
window.onload = () => {
  new WOW().init();
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
  let list = $('.banner-item').toArray();
  let curr = 0;
  let next = 1;

  $('#mark-banner').css('width', "100%");
  setInterval( () => {
    list.forEach( tag => {
      $(tag).find("img").css("left", '0');
    });
    next = (curr < list.length-1)? curr+1 : 0;
    if ($(list[next]).offset().left > 0) {
      $(list[curr]).css('left', '-100%');
      $(list[curr]).find("img").css('left', '50%');
    } else {
      $(list[curr]).css('left', '100%');
      $(list[curr]).find("img").css('left', '-50%');
    }
    $(list[next]).css('left', '0');
    curr = next;

    $('#mark-banner').css('transition', "all linear 0s");
    $('#mark-banner').css('width', "0");
    setTimeout( () => {
      $('#mark-banner').css('transition', "all linear 5s");
      $('#mark-banner').css('width', "100%");
    }, 10);
  }, 5000);
  // end banner

  // our team
  let ourTeamNext = $('#our-team .swiper-button-next');
  let ourTeamPrev = $('#our-team .swiper-button-prev');
  ourTeamNext.css("display", "none");
  ourTeamPrev.css("display", "none");
  $('#our-team .right').on('click', () => {
    ourTeamNext.click()
  });
  $('#our-team .left').on('click', () => {
    ourTeamPrev.click()
  });
  // ourTeamNext
  // end our team
}