'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

/// <reference path="../../js/_reference.js" />

(function () {
    'use strict';

    var SearchBarControl = (function () {
        function SearchBarControl(element, options) {
            _classCallCheck(this, SearchBarControl);
        }

        _createClass(SearchBarControl, [{
            key: 'processed',
            value: function processed(element, options) {
                var _this = this;

                this.mainHeader = document.getElementById('appheader');
                this.eventTracker.addEvent(this.searchInput, 'focus', this.show.bind(this));
                this.loadLastSearches();

                this.recentItemsPromise = Flickity.Api.recent(0, 80).then(function (items) {
                    _this.recentItemsList.itemDataSource = new WinJS.Binding.List(items.photos.photo).dataSource;
                    _this.recentItemsList.oniteminvoked = function (arg) {
                        arg.detail.itemPromise.then(function (item) {
                            _this.hide();
                            WinJS.Navigation.navigate('/pages/detail/detail.html', { picture: item.data });
                        });
                    };
                }, this.recentItemsError.bind(this));

                this.eventTracker.addEvent(WinJS.Application, 'search', function (arg) {
                    _this.runSearch(arg.term);
                });
            }
        }, {
            key: 'recentItemsError',
            value: function recentItemsError(err) {
                console.error(err);
            }
        }, {
            key: 'loadLastSearches',
            value: function loadLastSearches() {
                var _this2 = this;

                var lastSearches = localStorage.lastSearches;
                if (!lastSearches) lastSearches = [];else lastSearches = JSON.parse(lastSearches);

                this.lastSearches = lastSearches;
                this.lastsearchItems.innerHTML = '';

                lastSearches.forEach(function (s) {
                    var item = document.createElement('SPAN');
                    item.className = 'search-term';
                    item.innerText = s;
                    WinJSContrib.UI.tap(item, function () {
                        _this2.runSearch(s);
                    });
                    _this2.lastsearchItems.appendChild(item);
                });
            }
        }, {
            key: 'addSearchTerm',
            value: function addSearchTerm(s) {
                while (this.lastSearches.indexOf(s) >= 0) {
                    var idx = this.lastSearches.indexOf(s);
                    this.lastSearches.splice(idx, 1);
                }
                this.lastSearches.splice(0, 0, s);
                localStorage.lastSearches = JSON.stringify(this.lastSearches.slice(0, 10));
            }
        }, {
            key: 'runSearchFromInput',
            value: function runSearchFromInput() {
                this.runSearch(this.searchInput.value);
            }
        }, {
            key: 'runSearch',
            value: function runSearch(searchTerm) {
                var _this3 = this;

                if (searchTerm && searchTerm.length > 2) {
                    this.searchInput.value = searchTerm;
                    this.element.classList.add('hasSearch');
                    this.addSearchTerm(searchTerm);
                    this.searchInput.blur();
                    this.hide();
                    setImmediate(function () {
                        WinJS.Navigation.navigate('/pages/home/home.html', { search: _this3.searchInput.value });
                        _this3.loadLastSearches();
                    });
                }
            }
        }, {
            key: 'show',
            value: function show() {
                var _this4 = this;

                this.mainHeader.classList.add('expanded');
                setTimeout(function () {
                    _this4.recentBlock.style.opacity = '0';
                    _this4.recentItemsList.element.style.display = '';
                    WinJS.UI.Animation.fadeIn(_this4.recentBlock);
                }, 300);
            }
        }, {
            key: 'hide',
            value: function hide() {
                var _this5 = this;

                WinJS.UI.Animation.fadeOut(this.recentBlock).then(function () {
                    _this5.recentItemsList.element.style.display = 'none';
                    _this5.searchInput.blur();
                    _this5.mainHeader.classList.remove('expanded');
                });
            }
        }]);

        return SearchBarControl;
    })();

    var SearchBarCtor = WinJS.UI.Pages.define('/controls/searchbar/searchbar.html', SearchBarControl);

    WinJS.Namespace.define('Flickity.UI', { SearchBar: SearchBarCtor });
})();
//# sourceMappingURL=../../../../Flickity/Flickity.Shared/controls/searchbar/searchbar.js.map