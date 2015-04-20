'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

/// <reference path="../../js/_reference.js" />

(function () {
	'use strict';

	var HomePage = (function () {
		function HomePage() {
			_classCallCheck(this, HomePage);
		}

		_createClass(HomePage, [{
			key: 'init',
			value: function init(element, options) {
				var _this = this;

				if (options.search) {
					this.dataLoadPromise = Flickity.Api.search(options.search, 0, 100).then(function (items) {
						_this.pictures = items;
						return items;
					}, this.showError.bind(this));
				}
			}
		}, {
			key: 'showError',
			value: function showError(err) {
				console.error(err);
			}
		}, {
			key: 'processed',
			value: function processed(element, options) {
				var _this2 = this;

				this.eventTracker.addEvent(this.picturesList, 'iteminvoked', this.openDetail.bind(this));
				if (this.dataLoadPromise) {
					this.dataLoadPromise.then(function () {
						_this2.picturesList.itemDataSource = new WinJS.Binding.List(_this2.pictures.photos.photo).dataSource;
					});
				}
			}
		}, {
			key: 'openDetail',
			value: function openDetail(arg) {
				arg.detail.itemPromise.then(function (item) {
					WinJS.Navigation.navigate('/pages/detail/detail.html', { picture: item.data });
				});
			}
		}]);

		return HomePage;
	})();

	WinJS.UI.Pages.define('/pages/home/home.html', HomePage);
})();
//# sourceMappingURL=../../../../Flickity/Flickity.Shared/pages/home/home.js.map