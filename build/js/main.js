$(document).ready(function () {

	const date = new Date();
	const year = date.getFullYear();

	/* For the sticky nav */
	$(".header-border").waypoint(function (direction) {
		if (direction === "down") {
			$(".navbar").addClass("nav-sticky");
		} else {
			$(".navbar").removeClass("nav-sticky");
		}
	}, {
		offset: '50px'
	});

	/* Scroll on arrow icon */

	$(".projects-arrow").click(function () {
		$("html, body").animate({
			scrollTop: $(".project-section").offset().top
		}, 1000);
	});


	/* Navigation scroll */

	$(function () {
		$('a[href*="#"]:not([href="#"])').click(function () {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
					$('html, body').animate({
						scrollTop: target.offset().top
					}, 1000);
					return false;
				}
			}
		});
	});

	/* Mobile navigation */
	$(".menu-toggle").click(function () {
		var nav = $(".mobile-menu");
		var icon = $(".menu-icon");

		nav.slideToggle(200);

		if (icon.hasClass("fa-bars")) {
			icon.addClass("fa-times");
			icon.removeClass("fa-bars");
		} else {
			icon.addClass("fa-bars");
			icon.removeClass("fa-times");
		}

	});

	/* Displays nav bar again when view is resized to desktop view */
	$(window).resize(function () {
		var w = $(window).width();
		var menu = $('nav ul');
		if (w > 1000 && menu.is(':hidden')) {
			menu.removeAttr('style');
		}
	});

	$(".copyright").html("Copyright © " + year + " by Kieff Wong. All rights reserved.")
});
