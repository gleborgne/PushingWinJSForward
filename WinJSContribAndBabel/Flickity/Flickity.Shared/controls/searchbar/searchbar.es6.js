/// <reference path="../../js/_reference.js" />

(function () {
    "use strict";

    class SearchBarControl {
        constructor(element, options){
        }

        processed(element, options) {
        	this.mainHeader = document.getElementById('appheader');         
            this.eventTracker.addEvent(this.searchInput, 'focus', this.show.bind(this));            
            this.loadLastSearches();

            this.recentItemsPromise = Flickity.Api.recent(0, 80).then((items) => {
                this.recentItemsList.itemDataSource = new WinJS.Binding.List(items.photos.photo).dataSource;
                this.recentItemsList.oniteminvoked = (arg) => {
                    arg.detail.itemPromise.then((item) => {
                        this.hide();
                        WinJS.Navigation.navigate('/pages/detail/detail.html', { picture: item.data });
                    });
                };
            }, this.recentItemsError.bind(this));

            this.eventTracker.addEvent(WinJS.Application, 'search', (arg) => {
                this.runSearch(arg.term);
            });
        }

        recentItemsError(err) {
            console.error(err);
        }

        loadLastSearches() {
            var lastSearches = localStorage['lastSearches'];
            if (!lastSearches)
                lastSearches = [];
            else
                lastSearches = JSON.parse(lastSearches);

            this.lastSearches = lastSearches;
            this.lastsearchItems.innerHTML = '';

            lastSearches.forEach((s) => {
                var item = document.createElement('SPAN');
                item.className = 'search-term';
                item.innerText = s;
                WinJSContrib.UI.tap(item, () => {
                    this.runSearch(s);
                });
                this.lastsearchItems.appendChild(item);
            });
        }

        addSearchTerm(s) {
            while (this.lastSearches.indexOf(s) >= 0) {
                var idx = this.lastSearches.indexOf(s);
                this.lastSearches.splice(idx, 1);
            }
            this.lastSearches.splice(0, 0, s);
            localStorage['lastSearches'] = JSON.stringify(this.lastSearches.slice(0, 10));
        }

        runSearchFromInput() {
            this.runSearch(this.searchInput.value);
        }

        runSearch(searchTerm) {
            if (searchTerm && searchTerm.length > 2) {
                this.searchInput.value = searchTerm;
                this.element.classList.add('hasSearch');
                this.addSearchTerm(searchTerm);
                this.searchInput.blur();
                this.hide();
                setImmediate(() => {
                    WinJS.Navigation.navigate('/pages/home/home.html', { search: this.searchInput.value });
                    this.loadLastSearches();
                });

            }
        }

        show() {
            this.mainHeader.classList.add('expanded');
            setTimeout(() => {
                this.recentBlock.style.opacity = '0';
                this.recentItemsList.element.style.display = '';
                WinJS.UI.Animation.fadeIn(this.recentBlock);
            }, 300);
        }

        hide() {
            WinJS.UI.Animation.fadeOut(this.recentBlock).then(() => {
                this.recentItemsList.element.style.display = 'none';
                this.searchInput.blur();
                this.mainHeader.classList.remove('expanded');
            });
        }
    }

    var SearchBarCtor = WinJS.UI.Pages.define("/controls/searchbar/searchbar.html", SearchBarControl);

    WinJS.Namespace.define('Flickity.UI', { SearchBar: SearchBarCtor});
})();
