/// <reference path="../../js/_reference.js" />

(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
    	init: function (element, options) {
    		var page = this;
			if (options.search){
				page.dataLoadPromise = Flickity.Api.search(options.search, 0, 100).then(function (items) {
					page.pictures = items;
					return items;
				}, page.showError.bind(page));
			}
    	},

    	showError: function (err) {
    		var page = this;
			//show API error text
    	},

    	processed: function (element, options) {
    		var page = this;
    		page.picturesList = page.element.querySelector('#picturesList').winControl;
    		page.openDetailBinded = page.openDetail.bind(page);

    		page.picturesList.addEventListener('iteminvoked', page.openDetailBinded);
    		if (page.dataLoadPromise) {
    			page.dataLoadPromise.then(function () {    				
    				page.updateLayout();
    				page.picturesList.itemDataSource = new WinJS.Binding.List(page.pictures.photos.photo).dataSource;    				
    			});
    		}
    	},

    	openDetail: function (arg) {
    		arg.detail.itemPromise.then(function (item) {
    			WinJS.Navigation.navigate('/pages/detail/detail.html', { picture: item.data });
    		});
    	},

    	unload: function (element, options) {
    		var page = this;
    		page.picturesList.removeEventListener('iteminvoked', page.openDetailBinded);
    	},

    	updateLayout: function () {
    		var page = this;
    		var q = window.matchMedia('screen and (orientation: portrait)');
    		var currentLayout = page.picturesList.layout;
    		if (q.matches && currentLayout.orientation == 'horizontal') {
    			page.picturesList.layout = new WinJS.UI.GridLayout({ orientation: 'vertical' });
    		} else if (!q.matches && currentLayout.orientation == 'vertical') {
    			page.picturesList.layout = new WinJS.UI.GridLayout({ orientation: 'horizontal' });
    		}
    	}
    });
})();
