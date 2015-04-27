// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
    var app = WinJS.Application;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
        app.addEventListener("activated", function (args) {

            nav.history = app.sessionState.history || {};
            nav.history.current.initialPlaceholder = true;

            // Optimize the load of the application and while the splash screen is shown, execute high priority scheduled work.
            ui.disableAnimations();
            var p = ui.processAll().then(function () {
                WinJSContrib.UI.WebComponents.inspect(document.body);
                //return nav.navigate(nav.location || Application.navigator.home, nav.state);
            }).then(function () {
                ui.enableAnimations();
            });

            args.setPromise(p);
        });

        app.oncheckpoint = function (args) {
            // TODO: This application is about to be suspended. Save any state
            // that needs to persist across suspensions here. If you need to 
            // complete an asynchronous operation before your application is 
            // suspended, call args.setPromise().
            app.sessionState.history = nav.history;
        };

        app.start();
        //document.addEventListener("backbutton", function (arg) {
        //    if (!WinJS.Navigation.isFlyout) {
        //        if (WinJS.Navigation.canGoBack)
        //            WinJS.Navigation.back();
        //        else if (WinJSContrib.UI.FlyoutPage && WinJSContrib.UI.FlyoutPage.openPages && WinJSContrib.UI.FlyoutPage.openPages.length > 0) {
        //            //do nothing
        //        } else {
        //            // close app
        //            navigator.app.exitApp();
        //        }
        //    }
        //}, false);

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();

var AppListLayout = {
    "default": { layout: WinJS.UI.GridLayout, query: '(orientation: landscape)' },
    "vert": { layout: WinJS.UI.GridLayout, query: '(orientation: portrait)', options: { orientation: 'vertical' } }
}

window.toStaticHTML = function (a) {
    return a;
}