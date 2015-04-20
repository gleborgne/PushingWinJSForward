/// <reference path="../../js/_reference.js" />

(function () {
    "use strict";

    class SearchBarControl {
        constructor(element, options){
        }

        processed(element, options) {
            var ctrl = this;
            ctrl.mainHeader = document.getElementById('appheader');         
            ctrl.eventTracker.addEvent(ctrl.searchInput, 'focus', ctrl.show.bind(ctrl));            
            ctrl.loadLastSearches();

            ctrl.recentItemsPromise = Flickity.Api.recent(0, 80).then(function (items) {
                ctrl.recentItemsList.itemDataSource = new WinJS.Binding.List(items.photos.photo).dataSource;
                ctrl.recentItemsList.oniteminvoked = function (arg) {
                    arg.detail.itemPromise.then(function (item) {
                        ctrl.hide();
                        WinJS.Navigation.navigate('/pages/detail/detail.html', { picture: item.data });
                    });
                };
            }, ctrl.recentItemsError.bind(ctrl));

            ctrl.eventTracker.addEvent(WinJS.Application, 'search', function (arg) {
                ctrl.runSearch(arg.term);
            });
        }

        recentItemsError(err) {
            console.error(err);
        }

        loadLastSearches() {
            var ctrl = this;
            var lastSearches = localStorage['lastSearches'];
            if (!lastSearches)
                lastSearches = [];
            else
                lastSearches = JSON.parse(lastSearches);

            ctrl.lastSearches = lastSearches;
            ctrl.lastsearchItems.innerHTML = '';

            lastSearches.forEach((s) => {
                var item = document.createElement('SPAN');
                item.className = 'search-term';
                item.innerText = s;
                WinJSContrib.UI.tap(item, () => {
                    this.runSearch(s);
                });
                ctrl.lastsearchItems.appendChild(item);
            });
        }

        addSearchTerm(s) {
            var ctrl = this;
            while (ctrl.lastSearches.indexOf(s) >= 0) {
                var idx = ctrl.lastSearches.indexOf(s);
                ctrl.lastSearches.splice(idx, 1);
            }
            ctrl.lastSearches.splice(0, 0, s);
            localStorage['lastSearches'] = JSON.stringify(ctrl.lastSearches.slice(0, 10));
        }

        runSearchFromInput() {
            var ctrl = this;
            ctrl.runSearch(ctrl.searchInput.value);
        }

        runSearch(searchTerm) {
            var ctrl = this;
            if (searchTerm && searchTerm.length > 2) {
                ctrl.searchInput.value = searchTerm;
                ctrl.element.classList.add('hasSearch');
                ctrl.addSearchTerm(searchTerm);
                ctrl.searchInput.blur();
                ctrl.hide();
                setImmediate(() => {
                    WinJS.Navigation.navigate('/pages/home/home.html', { search: ctrl.searchInput.value });
                    ctrl.loadLastSearches();
                });

            }
        }

        show() {
            var ctrl = this;
            
            ctrl.mainHeader.classList.add('expanded');
            setTimeout(() => {
                ctrl.recentBlock.style.opacity = '0';
                ctrl.recentItemsList.element.style.display = '';
                WinJS.UI.Animation.fadeIn(ctrl.recentBlock);
            }, 300);
        }

        hide() {
            var ctrl = this;

            WinJS.UI.Animation.fadeOut(ctrl.recentBlock).then(function () {
                ctrl.recentItemsList.element.style.display = 'none';
                ctrl.searchInput.blur();
                ctrl.mainHeader.classList.remove('expanded');
            });
        }
    }

    var SearchBarCtor = WinJS.UI.Pages.define("/controls/searchbar/searchbar.html", SearchBarControl);

    WinJS.Namespace.define('Flickity.UI', { SearchBar: SearchBarCtor});
})();
