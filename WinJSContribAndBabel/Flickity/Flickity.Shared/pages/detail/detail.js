/// <reference path="../../js/_reference.js" />
(function () {
	"use strict";

	WinJS.UI.Pages.define("/pages/detail/detail.html", {
		init: function (element, options) {
			var ctrl = this;
			ctrl.picture = options.picture;

			ctrl.detailDataPromise = Flickity.Api.detail(options.picture.id).then(function (detail) {
				ctrl.pictureDetail = detail;

				return detail;
			}, ctrl.detailLoadError.bind(ctrl));			
		},

		processed: function (element, options) {
			var ctrl = this;
			var picUrl = Flickity.Api.pictureUrl(ctrl.picture, 'b');
			WinJSContrib.UI.loadImage(Flickity.Api.pictureUrl(ctrl.picture, 'b')).then(function(arg){
				ctrl.pictureImg.src = picUrl;
				ctrl.pictureImg.classList.add('loaded');
			});

			ctrl.detailDataPromise.then(function (detail) {
				ctrl.processDetail();
				if (detail.photo.comments._content === "0") {
					ctrl.comments.element.style.display = 'none';
				} else {
					ctrl.comments.picture = ctrl.picture;
				}
				return WinJS.UI.Animation.fadeOut(ctrl.loader);
			}).then(function () {
				ctrl.loader.style.display = 'none';
			});
		},

		processDetail: function () {
			var ctrl = this;
			if (ctrl.pictureDetail.photo) {				
				WinJS.Binding.processAll(ctrl.element, ctrl.pictureDetail.photo);
				ctrl.pictureDetail.photo.tags.tag.forEach(function (tag) {
					new WinJSContrib.UI.FluentDOM('SPAN', 'tag', ctrl.tagsList).text(tag._content).tap(function () {
						WinJS.Application.queueEvent({ type: 'search', term: tag._content });
					});
				});
			}
		},

		detailLoadError: function (err) {
		}
	});
})();
