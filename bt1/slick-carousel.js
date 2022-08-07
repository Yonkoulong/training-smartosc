$(document).ready(function(){
  $('.slides').slick( {
    slidesToShow: 1,
    prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
    nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
    dots: true,
    autoplay: true,
    autoSpeed: 5,
  })
});