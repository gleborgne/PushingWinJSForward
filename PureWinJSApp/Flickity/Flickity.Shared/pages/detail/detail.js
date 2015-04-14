/// <reference path="../../js/_reference.js" />
(function () {
	"use strict";

	WinJS.UI.Pages.define("/pages/detail/detail.html", {
		init: function (element, options) {
			var ctrl = this;
			ctrl.pageTitle = ctrl.element.querySelector('.pagetitle');
			ctrl.picture = options.picture;

			ctrl.detailDataPromise = Flickity.Api.detail(options.picture.id).then(function (detail) {
				ctrl.pictureDetail = detail;

				return detail;
			}, ctrl.detailLoadError.bind(ctrl));			
		},

		processed: function (element, options) {
			var ctrl = this;
			ctrl.loader = ctrl.element.querySelector('.loader');
			ctrl.comments = ctrl.element.querySelector('.comments-bloc');
			ctrl.pictureImg = ctrl.element.querySelector('.picture');
			ctrl.tagsList = ctrl.element.querySelector('.tags-list');
			ctrl.pictureImg.src = Flickity.Api.pictureUrl(ctrl.picture, 'b');

			ctrl.detailDataPromise.then(function (detail) {
				ctrl.processDetail();
				if (detail.photo.comments._content === "0") {
					ctrl.comments.style.display = 'none';
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

			ctrl.pictureDetail.photo.description._content = toStaticHTML(ctrl.pictureDetail.photo.description._content);
			WinJS.Binding.processAll(ctrl.element, ctrl.pictureDetail.photo);
			ctrl.pictureDetail.photo.tags.tag.forEach(function (tag) {
				var e = document.createElement('SPAN');
				e.className = 'tag';
				e.innerText = tag._content;
				ctrl.tagsList.appendChild(e);
				e.onclick = function () {
					WinJS.Application.queueEvent({ type: 'search', term: tag._content });
				}
			});
		},

		detailLoadError: function (err) {
		}
	});
})();
