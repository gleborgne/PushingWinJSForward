/// <reference path="FlickrAPI.js" />
var Flickity = Flickity || {};
Flickity.Bindings = Flickity.Bindings || {};

(function (Bindings) {
	'use strict';

	Bindings.picture = WinJS.Binding.initializer(function (source, sourceProps, dest, destProps) {
		var pic = Flickity.Api.pictureUrl(source, sourceProps[0]);
		WinJSContrib.UI.loadImage(pic).then(function () {
			dest.style.backgroundImage = 'url("' + pic + '")';
			dest.classList.add('loaded');
		});
	});

	Bindings.date = WinJS.Binding.initializer(function (source, sourceProps, dest, destProps) {
		
	});

})(Flickity.Bindings);