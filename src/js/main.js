

$(document).ready(function(){


    // >>>>> Variable pour section information
    var adaptSectionInformation = function() {
        if($(document).width() > 1000) {
            $('#visualAppart').height($("#step01").outerHeight());
            $('.step02Visual').each(function(){
                $(this).height($(this).parent('.step02').outerHeight());
            });
            $('.step03Visual').each(function(){
                $(this).height($(this).parent('.step03').outerHeight());
            });
        } else {
            $('#visualAppart').height('250px');
            $('.step02Visual').each(function(){
                $(this).height('250px');
            });
            $('.step03Visual').each(function(){
                $(this).height('150px');
            });
        }
    };

    adaptSectionInformation();



    // >>>>> Variable pour swiper
    var adaptSwiper = function() {
        if($(document).width() > 768) {
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                slidesPerView: 3,
                paginationClickable: true,
                spaceBetween: 30
            });
        } else {
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                slidesPerView: 2,
                paginationClickable: true,
                spaceBetween: 20
            });
        }
    };
    adaptSwiper();

    // >>>>> Variable pour data-stellar
    var addDataStellar = function() {
        if($(document).width() > 768) {
            $('#mainVisual').attr('data-stellar-background-ratio' , '0.5');
            // $('#visualAppart').attr('data-stellar-background-ratio' , '0.5');
        } else {
            $('#mainVisual').attr('data-stellar-background-ratio' , '0');
            // $('#visualAppart').attr('data-stellar-background-ratio' , '0');
        }
    };
    addDataStellar();



    // >>>>> Changements au resize de + 768px
    $(window).resize(function() {
        adaptSectionInformation();
        adaptSwiper();
        addDataStellar();
    });

    $(".quickLink").click(function(){
        var nomAttribut = $(this).attr("id");
        $(this).siblings(".quickLink").removeClass("active");
        $(this).siblings("div").slideUp();
        $(this).addClass("active").siblings("div[data-quick='"+nomAttribut+"']").slideToggle();
    });

    $(".closeQuick").click(function(e){
        e.preventDefault();
        var nomData = $(this).parent().attr("data-quick");
        $(this).parent().slideUp();
        $(this).parent().siblings("#"+nomData+"").removeClass("active");
    });




	// >>>>> Burger
	$("#burger").click(function(e){
		e.preventDefault();
		$(this).toggleClass("active");
		$("nav").toggleClass("active");
	});

	$(function(){
		$.stellar({
			horizontalScrolling: false,
			verticalOffset: 40
		});
	});








	// >>>>> Tri tableau
    $(".myTable").tablesorter(
        {
            headers: { 0: { sorter: false} }
        }
    );

    // >>>>> smooth scroll
    $('nav>ul>li>a[href^="#"], #topBar > a:first-child, #sectionProjet a').click(function(){
        var the_id = $(this).attr("href");
        $("nav, #burger").removeClass("active");
        $('html, body').animate({
            scrollTop:$(the_id).offset().top - 110
        }, 'slow');
        return false;
    });



    // >>>>> Section appartement et changements d'étapes
    $('.lienTab>a').click(function(e){
        e.preventDefault();
        var $cibleLien = $(this).parent().data("type");
        $('#step01, #'+$cibleLien).addClass('toStep02');
    });
    $('.closeStep02').click(function(e){
        e.preventDefault();
        var $parentsStep = $(this).parent().parent('.step02');
        $('#step01').removeClass('toStep02');
        $($parentsStep).removeClass('toStep02');
    });

    $(".myTable tbody td").click(function(){
        $(this).parents('.step02').addClass('toStep03');
        $('.step03').addClass('toStep03');
    });
     $('.closeStep03').click(function(e){
        e.preventDefault();
        var $parentsStep = $(this).parent().parent('.step03');
        $('.step02.toStep03').removeClass('toStep03');
        $($parentsStep).removeClass('toStep03');
    });


    // >>>>> Map
    var map;
    var grayStyles = [
        {
        	featureType: "all",
            elementType: "all",
        	stylers: [
        		{ saturation: -90 },
        		{ lightness: 30 }
        	]
        },
    ];

    // @50.825587,4.363113
    map = new GMaps({
    	div: '#sectionMap',
    	lat: 50.825587,
    	lng: 4.363113,
    	styles: grayStyles,
        scrollwheel: false
    });
    map.addMarker({
    	lat: 50.825587,
    	lng: 4.363113,
        title: 'CDC',
        icon: 'img/cdc_icn_markerMap.svg',
        // details: {
        // 	database_id: 42,
        // 	author: 'HPNeo'
        // },
     //    click: function(e){
     //    	if(console.log)console.log(e);
     //    	$("#adresss").fadeToggle();
    	// }
  	});


    $(window).scroll(function(){
        var scrollPos = $(window).scrollTop();
        $.each($('*.hidden'), function (){
            var elementHidden = $(this).offset().top;
            if ((elementHidden - scrollPos) <= 850) {
                $(this).removeClass('hidden');
            }
        });
    });



    var $gallery = $('#sectionPhotos a').simpleLightbox();
    var $gallery = $('.step03 .photos a').simpleLightbox();


});


