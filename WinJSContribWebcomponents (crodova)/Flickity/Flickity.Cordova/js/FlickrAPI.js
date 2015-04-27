/// <reference path="Flickity.config.js" />
var Flickity = Flickity || {};
Flickity.Api = Flickity.Api || {};

(function (Api, Config) {
	'use strict';
	var jsonptoken = 'jsonFlickrApi(';

	function jsonCall(arg) {
		return WinJS.xhr(arg).then(function (r) {
			var text = r.responseText;
			if (text.indexOf(jsonptoken) === 0) {
				text = text.substr(jsonptoken.length, text.length - jsonptoken.length - 1);
			}
			var data = JSON.parse(text);
			return data;
		});
	}

	Api.detail = function (id) {
		var s = this;
		
		var url = Config.FlickrRootUrl + '?method=flickr.photos.getInfo&format=json&api_key=' + Config.FlickrApiKey +
            '&photo_id=' + id +
            '&jsoncallback=?';
		return jsonCall({ url: url });
	}

	Api.comments = function (id) {
		var url = Config.FlickrRootUrl + '?method=flickr.photos.comments.getList&format=json&api_key=' + Config.FlickrApiKey +
            '&photo_id=' + id +
            '&jsoncallback=?';

		return jsonCall({ url: url });
	}

	Api.recent = function (offset, pagesize) {
		offset = offset || 0;
		pagesize = pagesize || 10;
		var url = Config.FlickrRootUrl + '?method=flickr.photos.getRecent&format=json&api_key=' + Config.FlickrApiKey +
            '&page=' + offset + '&per_page=' + pagesize +
            '&jsoncallback=?';
		return jsonCall({ url: url });
	}

	Api.search = function (searchterm, offset, pagesize) {
		offset = offset || 0;
		pagesize = pagesize || 10;
		var url = Config.FlickrRootUrl + '?method=flickr.photos.search&format=json&api_key=' + Config.FlickrApiKey +
            '&enable_text=on&text=' + encodeURIComponent(searchterm) +
            '&page=' + offset + '&per_page=' + pagesize +
            '&jsoncallback=?';

		return jsonCall({ url: url });
	}

	Api.pictureUrl = function (elt, size) {
		/*
			s : 75x75 
			q : 150x150 
			t : 100px thumbnail
			m : 240px thumbnail
			n : 320px thumbnail
			- : 500px thumbnail
			z : 640px thumbnail
			c : 800px thumbnail
			b : 1 024px thumbnail
		 */

		if (!elt)
			return '';

		return 'http://farm' + elt.farm + '.staticflickr.com/' + elt.server + '/' + elt.id + '_' + elt.secret + '_' + size + '.jpg'
	}
})(Flickity.Api, Flickity.Config);