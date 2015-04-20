/// <reference path="../../js/_reference.js" />
(function () {
	"use strict";

	class DetailPage {
		constructor(element, options) {
			this.picture = null;
			this.pictureImg = null;
			this.pictureDetail = null;
			this.tagsList = null;
			this.comments = null;
		}

		init(element, options) {
			this.picture = options.picture;
			
			this.detailDataPromise = Flickity.Api.detail(options.picture.id).then((detail) => {
				this.pictureDetail = detail;

				return detail;
			}, this.detailLoadError.bind(this));
		}

		processed(element, options) {
			var picUrl = Flickity.Api.pictureUrl(this.picture, 'b');
			WinJSContrib.UI.loadImage(Flickity.Api.pictureUrl(this.picture, 'b')).then((arg) => {
				this.pictureImg.src = picUrl;
				this.pictureImg.classList.add('loaded');
			});

			this.detailDataPromise.then((detail) => {
				this.processDetail();
				if (detail.photo.comments._content === "0") {
					this.comments.element.style.display = 'none';
				} else {
					this.comments.picture = this.picture;
				}
				return WinJS.UI.Animation.fadeOut(this.loader);
			}).then(() => {
				this.loader.style.display = 'none';
			});
		}

		processDetail() {
			if (this.pictureDetail.photo) {
				WinJS.Binding.processAll(this.element, this.pictureDetail.photo);
				this.pictureDetail.photo.tags.tag.forEach((tag) => {
					new WinJSContrib.UI.FluentDOM('SPAN', 'tag', this.tagsList).text(tag._content).tap(function () {
						WinJS.Application.queueEvent({ type: 'search', term: tag._content });
					});
				});
			}
		}

		detailLoadError(err) {
		}
	}

	WinJS.UI.Pages.define("/pages/detail/detail.html", DetailPage);
}) ();
