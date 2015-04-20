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
        }, {
            key: 'recentItemsError',
            value: function recentItemsError(err) {
                console.error(err);
            }
        }, {
            key: 'loadLastSearches',
            value: function loadLastSearches() {
                var _this = this;

                var ctrl = this;
                var lastSearches = localStorage.lastSearches;
                if (!lastSearches) lastSearches = [];else lastSearches = JSON.parse(lastSearches);

                ctrl.lastSearches = lastSearches;
                ctrl.lastsearchItems.innerHTML = '';

                lastSearches.forEach(function (s) {
                    var item = document.createElement('SPAN');
                    item.className = 'search-term';
                    item.innerText = s;
                    WinJSContrib.UI.tap(item, function () {
                        _this.runSearch(s);
                    });
                    ctrl.lastsearchItems.appendChild(item);
                });
            }
        }, {
            key: 'addSearchTerm',
            value: function addSearchTerm(s) {
                var ctrl = this;
                while (ctrl.lastSearches.indexOf(s) >= 0) {
                    var idx = ctrl.lastSearches.indexOf(s);
                    ctrl.lastSearches.splice(idx, 1);
                }
                ctrl.lastSearches.splice(0, 0, s);
                localStorage.lastSearches = JSON.stringify(ctrl.lastSearches.slice(0, 10));
            }
        }, {
            key: 'runSearchFromInput',
            value: function runSearchFromInput() {
                var ctrl = this;
                ctrl.runSearch(ctrl.searchInput.value);
            }
        }, {
            key: 'runSearch',
            value: function runSearch(searchTerm) {
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
            }
        }, {
            key: 'show',
            value: function show() {
                var ctrl = this;

                ctrl.mainHeader.classList.add('expanded');
                setTimeout(function () {
                    ctrl.recentBlock.style.opacity = '0';
                    ctrl.recentItemsList.element.style.display = '';
                    WinJS.UI.Animation.fadeIn(ctrl.recentBlock);
                }, 300);
            }
        }, {
            key: 'hide',
            value: function hide() {
                var ctrl = this;

                WinJS.UI.Animation.fadeOut(ctrl.recentBlock).then(function () {
                    ctrl.recentItemsList.element.style.display = 'none';
                    ctrl.searchInput.blur();
                    ctrl.mainHeader.classList.remove('expanded');
                });
            }
        }]);

        return SearchBarControl;
    })();

    var SearchBarCtor = WinJS.UI.Pages.define('/controls/searchbar/searchbar.html', SearchBarControl);

    WinJS.Namespace.define('Flickity.UI', { SearchBar: SearchBarCtor });
})();
//# sourceMappingURL=../../../../Flickity/Flickity.Shared/controls/searchbar/searchbar.js.map