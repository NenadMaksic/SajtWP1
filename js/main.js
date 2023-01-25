;(function () {
	
	'use strict';



	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	var fullHeight = function() {
		if ( !isiPad() && !isiPhone() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			})
		}
		

	};

	var sliderMain = function() {
		
	  	$('#fh5co-home .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000
	  	});

	  	$('#fh5co-home .flexslider .slides > li').css('height', $(window).height());	
	  	$(window).resize(function(){
	  		$('#fh5co-home .flexslider .slides > li').css('height', $(window).height());	
	  	});

	};

	var sliderSayings = function() {
		$('#fh5co-sayings .flexslider').flexslider({
			animation: "slide",
			slideshowSpeed: 5000,
			directionNav: false,
			controlNav: true,
			smoothHeight: true,
			reverse: true
	  	});
	}

	var offcanvasMenu = function() {
		$('body').prepend('<div id="fh5co-offcanvas" />');
		$('body').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle"><i></i></a>');

		$('.fh5co-main-nav .fh5co-menu-1 a, .fh5co-main-nav .fh5co-menu-2 a').each(function(){

			var $this = $(this);

			$('#fh5co-offcanvas').append($this.clone());

		});
		// $('#fh5co-offcanvas').append
	};

	var mainMenuSticky = function() {
		
		var sticky = $('.js-sticky');

		sticky.css('height', sticky.height());
		$(window).resize(function(){
			sticky.css('height', sticky.height());
		});

		var $section = $('.fh5co-main-nav');
		
		$section.waypoint(function(direction) {
		  	
		  	if (direction === 'down') {

			    	$section.css({
			    		'position' : 'fixed',
			    		'top' : 0,
			    		'width' : '100%',
			    		'z-index' : 99999
			    	}).addClass('fh5co-shadow');;

			}

		}, {
	  		offset: '0px'
		});

		$('.js-sticky').waypoint(function(direction) {
		  	if (direction === 'up') {
		    	$section.attr('style', '').removeClass('fh5co-shadow');
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 69; }
		});

	};
	
	// Parallax
	var parallax = function() {

		$(window).stellar();

	};


	// Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){

			var $this = $(this);

			$('body').toggleClass('fh5co-overflow offcanvas-visible');
			$this.toggleClass('active');
			event.preventDefault();

		});

	};

	var scrolledWindow = function() {

		$(window).scroll(function(){

			var scrollPos = $(this).scrollTop();


			$('#fh5co-home .fh5co-text').css({
		      'opacity' : 1-(scrollPos/300),
		      'margin-top' : (-212) + (scrollPos/1)
		   });

		   $('#fh5co-home .flexslider .fh5co-overlay').css({
				'opacity' : (.5)+(scrollPos/2000)
		   });

		   if (scrollPos > 300) {
				$('#fh5co-home .fh5co-text').css('display', 'none');
			} else {
				$('#fh5co-home .fh5co-text').css('display', 'block');
			}
		   

		});

		$(window).resize(function() {
			if ( $('body').hasClass('offcanvas-visible') ) {
		   	$('body').removeClass('offcanvas-visible');
		   	$('.js-fh5co-nav-toggle').removeClass('active');
		   }
		});
		
	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500);
			
			return false;
		});
	
	};


	// Page Nav
	var clickMenu = function() {
		var topVal = ( $(window).width() < 769 ) ? 0 : 58;

		$(window).resize(function(){
			topVal = ( $(window).width() < 769 ) ? 0 : 58;		
		});
		$('.fh5co-main-nav a:not([class="external"]), #fh5co-offcanvas a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section');

				if ( $('div[data-section="' + section + '"]').length ) {

					$('html, body').animate({
			        	scrollTop: $('div[data-section="' + section + '"]').offset().top - topVal
			    	}, 500);	
			    	
			   }

		    event.preventDefault();

		    // return false;
		});


	};

	// Reflect scrolling in navigation
	var navActive = function(section) {
		
		$('.fh5co-main-nav a[data-nav-section], #fh5co-offcanvas a[data-nav-section]').removeClass('active');
		$('.fh5co-main-nav, #fh5co-offcanvas').find('a[data-nav-section="'+section+'"]').addClass('active');
		
	};

	var navigationSection = function() {

		var $section = $('div[data-section]');
		
		$section.waypoint(function(direction) {
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}

		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};


	// Animations
	var homeAnimate = function() {
		if ( $('#fh5co-home').length > 0 ) {	

			$('#fh5co-home').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						$('#fh5co-home .to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 200);

					
					$(this.element).addClass('animated');
						
				}
			} , { offset: '80%' } );

		}
	};



	var aboutAnimate = function() {
		var about = $('#fh5co-about');
		if ( about.length > 0 ) {	

			about.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						about.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 200);

					setTimeout(function() {
						about.find('.to-animate-2').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeIn animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 200);

					

					$(this.element).addClass('animated');
						
				}
			} , { offset: '80%' } );

		}
	};

	var sayingsAnimate = function() {
		var sayings = $('#fh5co-sayings');
		if ( sayings.length > 0 ) {	

			sayings.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						sayings.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 200);


					$(this.element).addClass('animated');
						
				}
			} , { offset: '80%' } );

		}
	};

	var featureAnimate = function() {
		var feature = $('#fh5co-featured');
		if ( feature.length > 0 ) {	

			feature.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						feature.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 200);

					setTimeout(function() {
						feature.find('.to-animate-2').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('bounceIn animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 500);


					$(this.element).addClass('animated');
						
				}
			} , { offset: '80%' } );

		}
	};

	var typeAnimate = function() {
		var type = $('#fh5co-type');
		if ( type.length > 0 ) {	

			type.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						type.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 200);

					$(this.element).addClass('animated');
						
				}
			} , { offset: '80%' } );

		}
	};

	var foodMenusAnimate = function() {
		var menus = $('#fh5co-menus');
		if ( menus.length > 0 ) {	

			menus.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						menus.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 200);

					setTimeout(function() {
						menus.find('.to-animate-2').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeIn animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 500);

					$(this.element).addClass('animated');
						
				}
			} , { offset: '80%' } );

		}
	};


	var eventsAnimate = function() {
		var events = $('#fh5co-events');
		if ( events.length > 0 ) {	

			events.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						events.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeIn animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 200);

					setTimeout(function() {
						events.find('.to-animate-2').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 500);

					$(this.element).addClass('animated');
						
				}
			} , { offset: '80%' } );

		}
	};

	var reservationAnimate = function() {
		var contact = $('#fh5co-contact');
		if ( contact.length > 0 ) {	

			contact.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						contact.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeIn animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 200);

					setTimeout(function() {
						contact.find('.to-animate-2').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 500);

					$(this.element).addClass('animated');
						
				}
			} , { offset: '80%' } );

		}
	};

	var footerAnimate = function() {
		var footer = $('#fh5co-footer');
		if ( footer.length > 0 ) {	

			footer.waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {


					setTimeout(function() {
						footer.find('.to-animate').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeIn animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 200);

					setTimeout(function() {
						footer.find('.to-animate-2').each(function( k ) {
							var el = $(this);
							
							setTimeout ( function () {
								el.addClass('fadeInUp animated');
							},  k * 200, 'easeInOutExpo' );
							
						});
					}, 500);

					$(this.element).addClass('animated');
						
				}
			} , { offset: '80%' } );

		}
	};
	//RegExp
	
		//var ime = document.getElementById('name').value;
		//var provera = /^([A-Z])\w+/;
		//if (!ime.match(provera))
		//{
		//	alert("Ime i prezime mora biti tipa Pera Peric");
		//	return false;
		//}
		//else return true;
		var ime = document.getElementById('imeIPrezime');
		var proverImena = /\b[A-Z][a-z]* [A-Z][a-z]*( [A-Z])?\b/;
		var greska = document.getElementById('imeGreska');
		ime.addEventListener('input',function(e){
			var trenutno = e.target.value;
			var provera = proverImena.test(trenutno);
			if(!provera) {
				greska.style.display = 'block'
			}
			else{
				greska.style.display = 'none'
			}
		}
		)
		var mail = document.getElementById('email');
		var proverMaila = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		var greska2 = document.getElementById('emailGreska');
		mail.addEventListener('input',function(e){
			var trenutno2 = e.target.value;
			var provera2 = proverMaila.test(trenutno2);
			if(!provera2) {
				greska2.style.display = 'block'
			}
			else{
				greska2.style.display = 'none'
			}
		}
		)


	
//CountDown
var endDate = new Date("Mar 7, 2023 12:00:00").getTime();
		
var timer = setInterval(function() {
	
	let now = new Date().getTime();
	let t = endDate - now;
	
	if (t >= 0) {
	
		let days = Math.floor(t / (1000 * 60 * 60 * 24));
		let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
		let secs = Math.floor((t % (1000 * 60)) / 1000);
	
		document.getElementById("timer-days").innerHTML = days +
		"<span class='label'>d</span>";
	
		document.getElementById("timer-hours").innerHTML = ("0"+hours).slice(-2) +
		"<span class='label'>h</span>";
	
		document.getElementById("timer-mins").innerHTML = ("0"+mins).slice(-2) +
		"<span class='label'>m</span>";
	
		document.getElementById("timer-secs").innerHTML = ("0"+secs).slice(-2) +
		"<span class='label'>s</span>";
	
	} else {

		document.getElementById("timer").innerHTML = "The countdown is over!";
	
	}
	
}, 1000);
//CountDown 1
var endDate1 = new Date("Feb 13, 2023 12:00:00").getTime();
		
var timer = setInterval(function() {
	
	let now1 = new Date().getTime();
	let t1 = endDate1 - now1;
	
	if (t1 >= 0) {
	
		let days = Math.floor(t1 / (1000 * 60 * 60 * 24));
		let hours = Math.floor((t1 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		let mins = Math.floor((t1 % (1000 * 60 * 60)) / (1000 * 60));
		let secs = Math.floor((t1 % (1000 * 60)) / 1000);
	
		document.getElementById("timer-days1").innerHTML = days +
		"<span class='label'>d</span>";
	
		document.getElementById("timer-hours1").innerHTML = ("0"+hours).slice(-2) +
		"<span class='label'>h</span>";
	
		document.getElementById("timer-mins1").innerHTML = ("0"+mins).slice(-2) +
		"<span class='label'>m</span>";
	
		document.getElementById("timer-secs1").innerHTML = ("0"+secs).slice(-2) +
		"<span class='label'>s</span>";
	
	} else {

		document.getElementById("timer").innerHTML = "The countdown is over!";
	
	}

}, 1000);
//CountDown 2
var endDate2 = new Date("Mar 13, 2023 12:00:00").getTime();
		
var timer = setInterval(function() {
	
	let now2 = new Date().getTime();
	let t2 = endDate2 - now2;
	
	if (t2 >= 0) {
	
		let days = Math.floor(t2 / (1000 * 60 * 60 * 24));
		let hours = Math.floor((t2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		let mins = Math.floor((t2 % (1000 * 60 * 60)) / (1000 * 60));
		let secs = Math.floor((t2 % (1000 * 60)) / 1000);
	
		document.getElementById("timer-days2").innerHTML = days +
		"<span class='label'>d</span>";
	
		document.getElementById("timer-hours2").innerHTML = ("0"+hours).slice(-2) +
		"<span class='label'>h</span>";
	
		document.getElementById("timer-mins2").innerHTML = ("0"+mins).slice(-2) +
		"<span class='label'>m</span>";
	
		document.getElementById("timer-secs2").innerHTML = ("0"+secs).slice(-2) +
		"<span class='label'>s</span>";
	
	} else {

		document.getElementById("timer2").innerHTML = "The countdown is over!";
	
	}

}, 1000);
// Footer AutoWrite
const footerIkone = new Array(
	"icon-facebook",
	"icon-twitter",
	"icon-instagram",
	"icon-file"
	
  );
  const footerHref = new Array(
	"https://www.facebook.com/nenad.maksic.3",
	"https://twitter.com/login",
	"https://www.instagram.com/",
	"Dokumentacija.pdf"
	
  );
 var footerIspis = "";
  for (let i = 0; i < footerIkone.length; i++) {
	footerIspis += `<li class="to-animate-2"><a href=${footerHref[i]} target="_blank"><i class=${footerIkone[i]}></i></a></li>`;
  }
  const navDiv = document.querySelector(".fh5co-social");
  navDiv.innerHTML = footerIspis;
	// Document on load.
	$(function(){

		fullHeight();
		sliderMain();
		sliderSayings();
		offcanvasMenu();
		mainMenuSticky();
		parallax();
		burgerMenu();
		scrolledWindow();
		clickMenu();
		navigationSection();
		goToTop();


		// Animations
		homeAnimate();
		aboutAnimate();
		sayingsAnimate();
		featureAnimate();
		typeAnimate();
		foodMenusAnimate();
		eventsAnimate();
		reservationAnimate();
		footerAnimate();

		

	});


}());