﻿/// <reference path="../../js/_reference.js" />

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

    		page.eventTracker.addEvent(page.picturesList, 'iteminvoked', page.openDetail.bind(page));
    		if (page.dataLoadPromise) {
    			page.dataLoadPromise.then(function () {    				
    				page.picturesList.itemDataSource = new WinJS.Binding.List(page.pictures.photos.photo).dataSource;    				
    			});
    		}
    	},

    	openDetail: function (arg) {
    		arg.detail.itemPromise.then(function (item) {
    			WinJS.Navigation.navigate('/pages/detail/detail.html', { picture: item.data });
    		});
    	}
    });
})();