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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZsaWNraXR5L0ZsaWNraXR5LlNoYXJlZC9wYWdlcy9ob21lL2hvbWUuZXM2LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBRUEsQ0FBQyxZQUFZO0FBQ1osYUFBWSxDQUFDOztLQUVQLFFBQVE7V0FBUixRQUFRO3lCQUFSLFFBQVE7OztlQUFSLFFBQVE7O1VBQ1QsY0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFOzs7QUFDdEIsUUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO0FBQ25CLFNBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsS0FBSyxFQUFLO0FBQ2xGLFlBQUssUUFBUSxHQUFHLEtBQUssQ0FBQztBQUN0QixhQUFPLEtBQUssQ0FBQztNQUNiLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUM5QjtJQUNEOzs7VUFFUSxtQkFBQyxHQUFHLEVBQUU7QUFDZCxXQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25COzs7VUFFUSxtQkFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFOzs7QUFDM0IsUUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUN6RixRQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7QUFDekIsU0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBTTtBQUMvQixhQUFLLFlBQVksQ0FBQyxjQUFjLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFLLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDO01BQ2pHLENBQUMsQ0FBQztLQUNIO0lBQ0Q7OztVQUVTLG9CQUFDLEdBQUcsRUFBRTtBQUNmLE9BQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFDLElBQUksRUFBSztBQUNyQyxVQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQywyQkFBMkIsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUMvRSxDQUFDLENBQUM7SUFDSDs7O1NBM0JJLFFBQVE7OztBQThCZCxNQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsdUJBQXVCLEVBQUUsUUFBUSxDQUFDLENBQUM7Q0FDekQsQ0FBQSxFQUFJLENBQUMiLCJmaWxlIjoiRmxpY2tpdHkvRmxpY2tpdHkuU2hhcmVkL3BhZ2VzL2hvbWUvaG9tZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9qcy9fcmVmZXJlbmNlLmpzXCIgLz5cclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdGNsYXNzIEhvbWVQYWdlIHtcclxuXHRcdGluaXQoZWxlbWVudCwgb3B0aW9ucykge1xyXG5cdFx0XHRpZiAob3B0aW9ucy5zZWFyY2gpIHtcclxuXHRcdFx0XHR0aGlzLmRhdGFMb2FkUHJvbWlzZSA9IEZsaWNraXR5LkFwaS5zZWFyY2gob3B0aW9ucy5zZWFyY2gsIDAsIDEwMCkudGhlbigoaXRlbXMpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMucGljdHVyZXMgPSBpdGVtcztcclxuXHRcdFx0XHRcdHJldHVybiBpdGVtcztcclxuXHRcdFx0XHR9LCB0aGlzLnNob3dFcnJvci5iaW5kKHRoaXMpKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHNob3dFcnJvcihlcnIpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByb2Nlc3NlZChlbGVtZW50LCBvcHRpb25zKSB7XHJcblx0XHRcdHRoaXMuZXZlbnRUcmFja2VyLmFkZEV2ZW50KHRoaXMucGljdHVyZXNMaXN0LCAnaXRlbWludm9rZWQnLCB0aGlzLm9wZW5EZXRhaWwuYmluZCh0aGlzKSk7XHJcblx0XHRcdGlmICh0aGlzLmRhdGFMb2FkUHJvbWlzZSkge1xyXG5cdFx0XHRcdHRoaXMuZGF0YUxvYWRQcm9taXNlLnRoZW4oKCkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5waWN0dXJlc0xpc3QuaXRlbURhdGFTb3VyY2UgPSBuZXcgV2luSlMuQmluZGluZy5MaXN0KHRoaXMucGljdHVyZXMucGhvdG9zLnBob3RvKS5kYXRhU291cmNlO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0b3BlbkRldGFpbChhcmcpIHtcclxuXHRcdFx0YXJnLmRldGFpbC5pdGVtUHJvbWlzZS50aGVuKChpdGVtKSA9PiB7XHJcblx0XHRcdFx0V2luSlMuTmF2aWdhdGlvbi5uYXZpZ2F0ZSgnL3BhZ2VzL2RldGFpbC9kZXRhaWwuaHRtbCcsIHsgcGljdHVyZTogaXRlbS5kYXRhIH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdFdpbkpTLlVJLlBhZ2VzLmRlZmluZShcIi9wYWdlcy9ob21lL2hvbWUuaHRtbFwiLCBIb21lUGFnZSk7XHJcbn0pICgpO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=