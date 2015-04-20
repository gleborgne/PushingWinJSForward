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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZsaWNraXR5L0ZsaWNraXR5LlNoYXJlZC9wYWdlcy9kZXRhaWwvZGV0YWlsLmVzNi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0EsQ0FBQyxZQUFZO0FBQ1osYUFBWSxDQUFDOztLQUVQLFVBQVU7QUFDSixXQUROLFVBQVUsQ0FDSCxPQUFPLEVBQUUsT0FBTyxFQUFFO3lCQUR6QixVQUFVOztBQUVkLE9BQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLE9BQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLE9BQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQzFCLE9BQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3JCLE9BQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0dBQ3JCOztlQVBJLFVBQVU7O1VBU1gsY0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFOzs7QUFDdEIsUUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDOztBQUUvQixRQUFJLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFNLEVBQUs7QUFDakYsV0FBSyxhQUFhLEdBQUcsTUFBTSxDQUFDOztBQUU1QixZQUFPLE1BQU0sQ0FBQztLQUNkLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNwQzs7O1VBRVEsbUJBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRTs7O0FBQzNCLFFBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDeEQsZ0JBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHLEVBQUs7QUFDbkYsWUFBSyxVQUFVLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztBQUM3QixZQUFLLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3hDLENBQUMsQ0FBQzs7QUFFSCxRQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBTSxFQUFLO0FBQ3ZDLFlBQUssYUFBYSxFQUFFLENBQUM7QUFDckIsU0FBSSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssR0FBRyxFQUFFO0FBQzNDLGFBQUssUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztNQUM3QyxNQUFNO0FBQ04sYUFBSyxRQUFRLENBQUMsT0FBTyxHQUFHLE9BQUssT0FBTyxDQUFDO01BQ3JDO0FBQ0QsWUFBTyxLQUFLLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBSyxNQUFNLENBQUMsQ0FBQztLQUMvQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQU07QUFDYixZQUFLLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztLQUNuQyxDQUFDLENBQUM7SUFDSDs7O1VBRVkseUJBQUc7OztBQUNmLFFBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUU7QUFDN0IsVUFBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2pFLFNBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRyxFQUFLO0FBQ2xELFVBQUksWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFLLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVk7QUFDOUYsWUFBSyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztPQUNyRSxDQUFDLENBQUM7TUFDSCxDQUFDLENBQUM7S0FDSDtJQUNEOzs7VUFFYyx5QkFBQyxHQUFHLEVBQUUsRUFDcEI7OztTQW5ESSxVQUFVOzs7QUFzRGhCLE1BQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQywyQkFBMkIsRUFBRSxVQUFVLENBQUMsQ0FBQztDQUMvRCxDQUFBLEVBQUksQ0FBQyIsImZpbGUiOiJGbGlja2l0eS9GbGlja2l0eS5TaGFyZWQvcGFnZXMvZGV0YWlsL2RldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9qcy9fcmVmZXJlbmNlLmpzXCIgLz5cclxuKGZ1bmN0aW9uICgpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0Y2xhc3MgRGV0YWlsUGFnZSB7XHJcblx0XHRjb25zdHJ1Y3RvcihlbGVtZW50LCBvcHRpb25zKSB7XHJcblx0XHRcdHRoaXMucGljdHVyZSA9IG51bGw7XHJcblx0XHRcdHRoaXMucGljdHVyZUltZyA9IG51bGw7XHJcblx0XHRcdHRoaXMucGljdHVyZURldGFpbCA9IG51bGw7XHJcblx0XHRcdHRoaXMudGFnc0xpc3QgPSBudWxsO1xyXG5cdFx0XHR0aGlzLmNvbW1lbnRzID0gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRpbml0KGVsZW1lbnQsIG9wdGlvbnMpIHtcclxuXHRcdFx0dGhpcy5waWN0dXJlID0gb3B0aW9ucy5waWN0dXJlO1xyXG5cdFx0XHRcclxuXHRcdFx0dGhpcy5kZXRhaWxEYXRhUHJvbWlzZSA9IEZsaWNraXR5LkFwaS5kZXRhaWwob3B0aW9ucy5waWN0dXJlLmlkKS50aGVuKChkZXRhaWwpID0+IHtcclxuXHRcdFx0XHR0aGlzLnBpY3R1cmVEZXRhaWwgPSBkZXRhaWw7XHJcblxyXG5cdFx0XHRcdHJldHVybiBkZXRhaWw7XHJcblx0XHRcdH0sIHRoaXMuZGV0YWlsTG9hZEVycm9yLmJpbmQodGhpcykpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByb2Nlc3NlZChlbGVtZW50LCBvcHRpb25zKSB7XHJcblx0XHRcdHZhciBwaWNVcmwgPSBGbGlja2l0eS5BcGkucGljdHVyZVVybCh0aGlzLnBpY3R1cmUsICdiJyk7XHJcblx0XHRcdFdpbkpTQ29udHJpYi5VSS5sb2FkSW1hZ2UoRmxpY2tpdHkuQXBpLnBpY3R1cmVVcmwodGhpcy5waWN0dXJlLCAnYicpKS50aGVuKChhcmcpID0+IHtcclxuXHRcdFx0XHR0aGlzLnBpY3R1cmVJbWcuc3JjID0gcGljVXJsO1xyXG5cdFx0XHRcdHRoaXMucGljdHVyZUltZy5jbGFzc0xpc3QuYWRkKCdsb2FkZWQnKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR0aGlzLmRldGFpbERhdGFQcm9taXNlLnRoZW4oKGRldGFpbCkgPT4ge1xyXG5cdFx0XHRcdHRoaXMucHJvY2Vzc0RldGFpbCgpO1xyXG5cdFx0XHRcdGlmIChkZXRhaWwucGhvdG8uY29tbWVudHMuX2NvbnRlbnQgPT09IFwiMFwiKSB7XHJcblx0XHRcdFx0XHR0aGlzLmNvbW1lbnRzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5jb21tZW50cy5waWN0dXJlID0gdGhpcy5waWN0dXJlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gV2luSlMuVUkuQW5pbWF0aW9uLmZhZGVPdXQodGhpcy5sb2FkZXIpO1xyXG5cdFx0XHR9KS50aGVuKCgpID0+IHtcclxuXHRcdFx0XHR0aGlzLmxvYWRlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRwcm9jZXNzRGV0YWlsKCkge1xyXG5cdFx0XHRpZiAodGhpcy5waWN0dXJlRGV0YWlsLnBob3RvKSB7XHJcblx0XHRcdFx0V2luSlMuQmluZGluZy5wcm9jZXNzQWxsKHRoaXMuZWxlbWVudCwgdGhpcy5waWN0dXJlRGV0YWlsLnBob3RvKTtcclxuXHRcdFx0XHR0aGlzLnBpY3R1cmVEZXRhaWwucGhvdG8udGFncy50YWcuZm9yRWFjaCgodGFnKSA9PiB7XHJcblx0XHRcdFx0XHRuZXcgV2luSlNDb250cmliLlVJLkZsdWVudERPTSgnU1BBTicsICd0YWcnLCB0aGlzLnRhZ3NMaXN0KS50ZXh0KHRhZy5fY29udGVudCkudGFwKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0V2luSlMuQXBwbGljYXRpb24ucXVldWVFdmVudCh7IHR5cGU6ICdzZWFyY2gnLCB0ZXJtOiB0YWcuX2NvbnRlbnQgfSk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGRldGFpbExvYWRFcnJvcihlcnIpIHtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdFdpbkpTLlVJLlBhZ2VzLmRlZmluZShcIi9wYWdlcy9kZXRhaWwvZGV0YWlsLmh0bWxcIiwgRGV0YWlsUGFnZSk7XHJcbn0pICgpO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=