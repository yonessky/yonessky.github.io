/*--------------------------
    Project Name: DTE
    Version: 1.0
    Author: DTE
    Devloped by: DTE
    Relase Date: -
---------------------------*/
/*---------------------------
      Table of Contents
    --------------------
    01- Pre Loading
    02- Mobile Menu
    03- Sticky Navbar
    04- Search Popup 
    05- Scroll Top Button
    06-  Scroll Top Button
    07- Set Background-img to section 
    08- Add active class to accordions
    09- Load More Items
    10- Slick Carousel
    11- Popup Video
    12- CounterUp
    13- NiceSelect Plugin
     
 ----------------------------*/

$(function () {
  "use strict";

  // Global variables
  var $win = $(window);

  /*==========  Pre Loading   ==========*/
  setTimeout(function () {
    $(".preloader").remove();
  }, 2000);

  /*==========   Mobile Menu   ==========*/
  var $navToggler = $(".navbar-toggler");
  $navToggler.on("click", function () {
    $(this).toggleClass("actived");
  });
  $navToggler.on("click", function () {
    $(".navbar-collapse").toggleClass("menu-opened");
  });

  /*==========   Sticky Navbar   ==========*/
  $win.on("scroll", function () {
    if ($win.width() >= 992) {
      var $navbar = $(".navbar");
      if ($win.scrollTop() > 50) {
        $navbar.addClass("is-sticky");
      } else {
        $navbar.removeClass("is-sticky");
      }
    }
  });

  /*==========  Search Popup  ==========*/
  $(".action-btn__search").on("click", function (e) {
    e.preventDefault();
    $(".search-popup")
      .toggleClass("active", "inActive")
      .removeClass("inActive");
  });
  // Close Module Search
  $(".search-popup__close").on("click", function () {
    $(".search-popup").removeClass("active").addClass("inActive");
  });

  /*==========   Scroll Top Button   ==========*/
  var $scrollTopBtn = $("#scrollTopBtn");
  // Show Scroll Top Button
  $win.on("scroll", function () {
    if ($(this).scrollTop() > 700) {
      $scrollTopBtn.addClass("actived");
    } else {
      $scrollTopBtn.removeClass("actived");
    }
  });
  // Animate Body after Clicking on Scroll Top Button
  $scrollTopBtn.on("click", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      500
    );
  });

  /*==========   Set Background-img to section   ==========*/
  $(".bg-img").each(function () {
    var imgSrc = $(this).children("img").attr("src");
    $(this)
      .parent()
      .css({
        "background-image": "url(" + imgSrc + ")",
        "background-size": "cover",
        "background-position": "center",
      });
    $(this).parent().addClass("bg-img");
    if ($(this).hasClass("background-size-auto")) {
      $(this).parent().addClass("background-size-auto");
    }
    $(this).remove();
  });

  /*==========   Add active class to accordions   ==========*/
  $(".accordion__item-header").on("click", function () {
    $(this).parent(".accordion-item").addClass("opened");
    $(this).parent(".accordion-item").siblings().removeClass("opened");
  });
  $(".accordion__item-title").on("click", function (e) {
    e.preventDefault();
  });

  /*==========   Load More Items  ==========*/
  function loadMore(loadMoreBtn, loadedItem) {
    $(loadMoreBtn).on("click", function (e) {
      e.preventDefault();
      $(this).fadeOut();
      $(loadedItem).fadeIn();
    });
  }

  loadMore(".loadMoreportfolio", ".portfolio-hidden > .portfolio-item");

  /*==========  Contact Form validation  ==========*/
  var contactForm = $("#contactForm"),
    contactResult = $(".contact-result");
  contactForm.validate({
    debug: false,
    submitHandler: function (contactForm) {
      $(contactResult, contactForm).html("Please Wait...");
      $.ajax({
        type: "POST",
        url: "assets/php/contact.php",
        data: $(contactForm).serialize(),
        timeout: 20000,
        success: function (msg) {
          $(contactResult, contactForm)
            .html(
              '<div class="alert alert-success" role="alert"><strong>Thank you. We will contact you shortly.</strong></div>'
            )
            .delay(3000)
            .fadeOut(2000);
        },
        error: $(".thanks").show(),
      });
      return false;
    },
  });

  /*==========   Slick Carousel ==========*/
  $(".slick-carousel").slick();

  /*==========  Popup Video  ==========*/
  $(".popup-video").magnificPopup({
    mainClass: "mfp-fade",
    removalDelay: 0,
    preloader: false,
    fixedContentPos: false,
    type: "iframe",
    iframe: {
      markup:
        '<div class="mfp-iframe-scaler">' +
        '<div class="mfp-close"></div>' +
        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
        "</div>",
      patterns: {
        youtube: {
          index: "youtube.com/",
          id: "v=",
          src: "//www.youtube.com/embed/%id%?autoplay=1",
        },
      },
      srcAction: "iframe_src",
    },
  });
  $(".popup-gallery-item").magnificPopup({
    type: "image",
    tLoading: "Loading image #%curr%...",
    mainClass: "mfp-img-mobile",
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1],
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
    },
  });

  /*==========   counterUp  ==========*/
  $(".counter").counterUp({
    delay: 10,
    time: 4000,
  });

  /*==========  NiceSelect Plugin  ==========*/
  $("select").niceSelect();

  /*==========   portfolio Filtering and Sorting  ==========*/
  $("#filtered-items-wrap").mixItUp();
  $(".portfolio-filter li a").on("click", function (e) {
    e.preventDefault();
  });

  /*----------  slick Carousel with Filter  ----------*/
  $("#slick-filter-buttons .nav__link").on("click", function (e) {
    e.preventDefault();
    $(this).addClass("active").siblings().removeClass("active");
    var key = "." + $(this).data("value");

    $("#filter-carousel").slick("slickUnfilter");
    $("#filter-carousel").slick("slickFilter", key).slick("refresh");
    $("#filter-carousel").slick("slickGoTo", 0);
  });
});

/* ---------------------------------------------- /*
         * Youtube video background
/* ---------------------------------------------- */

$(function () {
  $(".video-player").mb_YTPlayer();
});

$("#video-play").click(function (event) {
  event.preventDefault();
  if ($(this).hasClass("fa-play")) {
    $(".video-player").playYTP();
  } else {
    $(".video-player").pauseYTP();
  }
  $(this).toggleClass("fa-play fa-pause");
  return false;
});

$("#video-volume").click(function (event) {
  event.preventDefault();
  if ($(this).hasClass("fa-volume-off")) {
    $(".video-player").YTPUnmute();
  } else {
    $(".video-player").YTPMute();
  }
  $(this).toggleClass("fa-volume-off fa-volume-up");
  return false;
});

/* ---------------------------------------------- /*
         * Set sections backgrounds
/* ---------------------------------------------- */

var module = $(".home-section, .module, .module-small, .side-image");
module.each(function (i) {
  if ($(this).attr("data-background")) {
    $(this).css(
      "background-image",
      "url(" + $(this).attr("data-background") + ")"
    );
  }
});

/* ---------------------------------------------- /*
         * Share Button
/* ---------------------------------------------- */

const shareBtn = document.getElementById("shareBtn");

shareBtn.addEventListener("click", (event) => {
  // Check for Web Share api support
  if (navigator.share) {
    //Browser supports native share api
    navigator.share({
        text: "Please read this great article: ",
        url: "https://www.google.com/",
      }).then(() => {
        console.log("Thanks for sharing!");
      })
      .catch((err) => console.error(err));
  } else {
    // Fallback
    alert(
      "The current browser does not support the share function. Please, manually share the link"
    );
  }
});
