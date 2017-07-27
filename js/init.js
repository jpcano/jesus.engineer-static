jQuery(document).ready(function($) {

// jpcano added

if (!!$.prototype.justifiedGallery) {  // if justifiedGallery method is defined
  var options = {
    rowHeight: 140,
    margins: 4,
    lastRow: 'justify'
  };
  $('.article-gallery').justifiedGallery(options);
}


// Activity Section

function get(url) {
    return new Promise(function(succeed, fail) {
        var req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.addEventListener("load", function() {
            if (req.status < 400)
                succeed(req.responseText);
            else
                fail(new Error("Request failed: " + req.statusText));
        });
        req.addEventListener("error", function() {
            fail(new Error("Network error"));
        });
        req.send(null);
    });
}

function getJSON(url) {
    return get(url).then(JSON.parse);
}

function getFeedHtml(al, text, link, ago) {
    return `<li><span>${al.link(text)}</span><b><a href=${link} target="_blank">${ago}</a></b></li>`;
}

var al_twitter = new Autolinker({mention: "twitter"});
getJSON("http://jesus.engineer:8000/twitter").then(function(json) {
    json.forEach(function(t) {
        $("#twitter").append(getFeedHtml(al_twitter, t.text, "https://twitter.com/RockingML/status/" + t.id_str, t.ago));
    });
}).catch(function(error) {
    console.log(String(error));
});

var ghTypes = {
    "PushEvent": "Commited code to ",
    "CreateEvent": "Created a new repository ",
    "WatchEvent": "Starred the repository ",
    "ForkEvent": "Forked the repository ",
    "ReleaseEvent": "New release of  "
}
function ghText (type, repo) {
    var msg = ghTypes[type];
    if (msg === undefined) {
       msg = type;
    }
    return `${msg} https://github.com/${repo}`;
}
var al_twitter = new Autolinker({mention: "twitter"});
getJSON("http://jesus.engineer:8000/github").then(function(json) {
    json.forEach(function(t) {
        $("#github").append(getFeedHtml(al_twitter, ghText(t.type, t.repo), "https://github.com/" + t.repo, t.ago));
    });
}).catch(function(error) {
    console.log(String(error));
});


// End jpcano added

/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/


/*----------------------------------------------------*/
/* FitText Settings
------------------------------------------------------ */

    setTimeout(function() {
	   $('h1.responsive-headline').fitText(1, { minFontSize: '40px', maxFontSize: '90px' });
	 }, 100);


/*----------------------------------------------------*/
/* Smooth Scrolling
------------------------------------------------------ */

   $('.smoothscroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 800, 'swing', function () {
	        window.location.hash = target;
	    });
	});


/*----------------------------------------------------*/
/* Highlight the current section in the navigation bar
------------------------------------------------------*/

	var sections = $("section");
	var navigation_links = $("#nav-wrap a");

	sections.waypoint({

      handler: function(event, direction) {

		   var active_section;

			active_section = $(this);
			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#nav-wrap a[href="/#' + active_section.attr("id") + '"]');

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		},
		offset: '35%'

	});


/*----------------------------------------------------*/
/*	Make sure that #header-background-image height is
/* equal to the browser height.
------------------------------------------------------ */

   $('header#home').css({ 'height': $(window).height() });
   $(window).on('resize', function() {

        $('header#home').css({ 'height': $(window).height() });
        $('body').css({ 'width': $(window).width() })
   });


/*----------------------------------------------------*/
/*	Fade In/Out Primary Navigation
------------------------------------------------------*/

   $(window).on('scroll', function() {

		var h = $('header').height();
		var y = $(window).scrollTop();
      var nav = $('#nav-wrap');

	   if ( (y > h*.20) && (y < h) && ($(window).outerWidth() > 768 ) ) {
	      nav.fadeOut('fast');
	   }
      else {
         if (y < h*.20) {
            nav.removeClass('opaque').fadeIn('fast');
         }
         else {
            nav.addClass('opaque').fadeIn('fast');
         }
      }

	});

/*----------------------------------------------------*/
/*	contact form
------------------------------------------------------*/

     $('form#contactForm button.submit').click(function() {

	 $('#image-loader').fadeIn();

	 var contactName = $('#contactForm #contactName').val();
	 var contactEmail = $('#contactForm #contactEmail').val();
	 // var contactSubject = $('#contactForm #contactSubject').val();
	 var contactMessage = $('#contactForm #contactMessage').val();

	 if (contactName != '' && validateEmail(contactEmail) && contactMessage != '') {
             $('#image-loader').fadeOut();
             $('#message-warning').hide();
             // $('#contactForm').fadeOut();
             $('#message-success').fadeIn();
	     return true;
	 }
         // There was an error
	 else {
             $('#image-loader').fadeOut();
             // $('#message-warning').html(msg);
	     $('#message-warning').fadeIn();
	     return false;
	 }

     });

     function validateEmail(email) {
	 var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	 return re.test(email);
     }
});







