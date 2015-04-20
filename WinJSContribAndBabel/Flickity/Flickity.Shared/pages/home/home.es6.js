/// <reference path="../../js/_reference.js" />

(function () {
	"use strict";

	class HomePage {
		init(element, options) {
			if (options.search) {
				this.dataLoadPromise = Flickity.Api.search(options.search, 0, 100).then((items) => {
					this.pictures = items;
					return items;
				}, this.showError.bind(this));
			}
		}

		showError(err) {
			console.error(err);
		}

		processed(element, options) {
			this.eventTracker.addEvent(this.picturesList, 'iteminvoked', this.openDetail.bind(this));
			if (this.dataLoadPromise) {
				this.dataLoadPromise.then(() => {
					this.picturesList.itemDataSource = new WinJS.Binding.List(this.pictures.photos.photo).dataSource;
				});
			}
		}

		openDetail(arg) {
			arg.detail.itemPromise.then((item) => {
				WinJS.Navigation.navigate('/pages/detail/detail.html', { picture: item.data });
			});
		}
	}

	WinJS.UI.Pages.define("/pages/home/home.html", HomePage);
}) ();
