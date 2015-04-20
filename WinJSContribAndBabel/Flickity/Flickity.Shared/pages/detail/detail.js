'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

/// <reference path="../../js/_reference.js" />
(function () {
	'use strict';

	var DetailPage = (function () {
		function DetailPage(element, options) {
			_classCallCheck(this, DetailPage);

			this.picture = null;
			this.pictureImg = null;
			this.pictureDetail = null;
			this.tagsList = null;
			this.comments = null;
		}

		_createClass(DetailPage, [{
			key: 'init',
			value: function init(element, options) {
				var _this = this;

				this.picture = options.picture;

				this.detailDataPromise = Flickity.Api.detail(options.picture.id).then(function (detail) {
					_this.pictureDetail = detail;

					return detail;
				}, this.detailLoadError.bind(this));
			}
		}, {
			key: 'processed',
			value: function processed(element, options) {
				var _this2 = this;

				var picUrl = Flickity.Api.pictureUrl(this.picture, 'b');
				WinJSContrib.UI.loadImage(Flickity.Api.pictureUrl(this.picture, 'b')).then(function (arg) {
					_this2.pictureImg.src = picUrl;
					_this2.pictureImg.classList.add('loaded');
				});

				this.detailDataPromise.then(function (detail) {
					_this2.processDetail();
					if (detail.photo.comments._content === '0') {
						_this2.comments.element.style.display = 'none';
					} else {
						_this2.comments.picture = _this2.picture;
					}
					return WinJS.UI.Animation.fadeOut(_this2.loader);
				}).then(function () {
					_this2.loader.style.display = 'none';
				});
			}
		}, {
			key: 'processDetail',
			value: function processDetail() {
				var _this3 = this;

				if (this.pictureDetail.photo) {
					WinJS.Binding.processAll(this.element, this.pictureDetail.photo);
					this.pictureDetail.photo.tags.tag.forEach(function (tag) {
						new WinJSContrib.UI.FluentDOM('SPAN', 'tag', _this3.tagsList).text(tag._content).tap(function () {
							WinJS.Application.queueEvent({ type: 'search', term: tag._content });
						});
					});
				}
			}
		}, {
			key: 'detailLoadError',
			value: function detailLoadError(err) {}
		}]);

		return DetailPage;
	})();

	WinJS.UI.Pages.define('/pages/detail/detail.html', DetailPage);
})();
//# sourceMappingURL=../../../../Flickity/Flickity.Shared/pages/detail/detail.js.map