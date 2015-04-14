/// <reference path="../../js/_reference.js" />

(function () {
    "use strict";

    var SearchBarCtor = WinJS.UI.Pages.define("/controls/searchbar/searchbar.html", {
    	processed: function (element, options) {
    		var ctrl = this;
    		ctrl.mainHeader = document.getElementById('appheader');
    		ctrl.searchInput = ctrl.element.querySelector('#txtSearch');
    		ctrl.searchBtn = ctrl.element.querySelector('#btnSearch');
    		ctrl.recentItemsList = ctrl.element.querySelector('#recentItemsList').winControl;
    		ctrl.btnHide = ctrl.element.querySelector('.btn-hide');
    		ctrl.recentBlock = ctrl.element.querySelector('.recent');

    		ctrl.btnHide.onclick = function () {
    			ctrl.hide();
    		}

    		ctrl.searchInput.onfocus = ctrl.show.bind(ctrl);
    		ctrl.searchBtn.onclick = ctrl.runSearchFromInput.bind(ctrl);

    		ctrl.loadLastSearches();

    		ctrl.recentItemsPromise = Flickity.Api.recent(0, 80).then(function (items) {
    			ctrl.updateLayout();
    			ctrl.recentItemsList.itemDataSource = new WinJS.Binding.List(items.photos.photo).dataSource;
    			ctrl.recentItemsList.oniteminvoked = function (arg) {
    				arg.detail.itemPromise.then(function (item) {
    					ctrl.hide();
    					WinJS.Navigation.navigate('/pages/detail/detail.html', { picture: item.data });
    				});
    			};
    		}, ctrl.recentItemsError.bind(ctrl));

    		window.addEventListener('resize', function () {
    			ctrl.updateLayout();
    		});

    		WinJS.Application.addEventListener('search', function (arg) {
    			ctrl.runSearch(arg.term);
    		});
    	},

    	recentItemsError: function (err) {
    		console.error(err);
    	},

    	loadLastSearches: function () {
    		var ctrl = this;
    		var lastSearches = localStorage['lastSearches'];
    		if (!lastSearches)
    			lastSearches = [];
    		else
    			lastSearches = JSON.parse(lastSearches);

    		ctrl.lastSearches = lastSearches;
    		var container = ctrl.element.querySelector('.lastsearch-items');
    		container.innerHTML = '';
    		lastSearches.forEach(function (s) {
    			var item = document.createElement('SPAN');
    			item.className = 'search-term';
    			item.innerText = s;
    			item.onclick = function () {
    				ctrl.runSearch(s);
    			};
    			container.appendChild(item);
    		});
    	},

    	addSearchTerm: function (s) {
    		var ctrl = this;
    		while (ctrl.lastSearches.indexOf(s) >= 0) {
    			var idx = ctrl.lastSearches.indexOf(s);
    			ctrl.lastSearches.splice(idx, 1);
    		}
    		ctrl.lastSearches.splice(0, 0, s);
    		localStorage['lastSearches'] = JSON.stringify(ctrl.lastSearches.slice(0, 10));
    	},

    	runSearchFromInput: function () {
    		var ctrl = this;
    		ctrl.runSearch(ctrl.searchInput.value);
    	},

    	runSearch: function (searchTerm) {
    		var ctrl = this;
    		if (searchTerm && searchTerm.length > 2) {
    			ctrl.searchInput.value = searchTerm;
    			ctrl.element.classList.add('hasSearch');
    			ctrl.addSearchTerm(searchTerm);
    			ctrl.searchInput.blur();
    			ctrl.hide();
    			setImmediate(function () {
    				WinJS.Navigation.navigate('/pages/home/home.html', { search: ctrl.searchInput.value });
    				ctrl.loadLastSearches();
    			});

    		}
    	},

    	show: function () {
    		var ctrl = this;
    		
    		ctrl.mainHeader.classList.add('expanded');
    		setTimeout(function () {
    			ctrl.recentBlock.style.opacity = '0';
    			ctrl.recentItemsList.element.style.display = '';
    			WinJS.UI.Animation.fadeIn(ctrl.recentBlock);
    		}, 300);
    	},

    	hide: function () {
    		var ctrl = this;

    		WinJS.UI.Animation.fadeOut(ctrl.recentBlock).then(function () {
    			ctrl.recentItemsList.element.style.display = 'none';
    			ctrl.searchInput.blur();
    			ctrl.mainHeader.classList.remove('expanded');
    		});

    	},

    	updateLayout: function () {
    		var ctrl = this;
    		var q = window.matchMedia('screen and (orientation: portrait)');
    		var currentLayout = ctrl.recentItemsList.layout;
    		if (q.matches && currentLayout.orientation == 'horizontal') {
    			ctrl.recentItemsList.layout = new WinJS.UI.GridLayout({ orientation: 'vertical' });
    		} else if (!q.matches && currentLayout.orientation == 'vertical') {
    			ctrl.recentItemsList.layout = new WinJS.UI.GridLayout({ orientation: 'horizontal' });
    		}
    	}
    });

    WinJS.Namespace.define('Flickity.UI', { SearchBar: SearchBarCtor });
})();
