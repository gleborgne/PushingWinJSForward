/// <reference path="../../js/_reference.js" />

"use strict";

(function () {
    "use strict";

    var CommentsCtor = WinJS.UI.Pages.define("/controls/comments/comments.html", {
        picture: {
            get: function get() {
                return this._picture;
            },
            set: function set(val) {
                this._picture = val;
                this.loadComments();
            }
        },

        loadComments: function loadComments() {
            var ctrl = this;
            ctrl.loadCommentsPromise = Flickity.Api.comments(this.picture.id).then(function (comments) {
                ctrl.pictureComments = comments;
                ctrl.renderComplete.then(function () {
                    ctrl.commentsList = ctrl.element.querySelector("#commentsList");
                    ctrl.commentsList.itemDataSource = new WinJS.Binding.List(comments).dataSource;
                });
                return comments;
            }, ctrl.detailLoadError.bind(ctrl));
        },

        detailLoadError: function detailLoadError(err) {
            console.error(err);
        },

        updateLayout: function updateLayout(element) {}
    });

    WinJS.Namespace.define("Flickity.UI", { Comments: CommentsCtor });
})();
//# sourceMappingURL=../../../../Flickity/Flickity.Shared/controls/comments/comments.js.map