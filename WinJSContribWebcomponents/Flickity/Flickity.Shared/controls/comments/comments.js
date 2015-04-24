/// <reference path="../../js/_reference.js" />

(function () {
    "use strict";

    var CommentsCtor = WinJS.UI.Pages.define("/controls/comments/comments.html", {
    	picture: {
    		get: function () {
    			return this._picture;
    		},
    		set: function (val) {
    			this._picture = val;
    			this.loadComments();
    		}
		},

    	loadComments: function () {
    		var ctrl = this;
    		ctrl.loadCommentsPromise = Flickity.Api.comments(this.picture.id).then(function (comments) {
    			ctrl.pictureComments = comments;
    			ctrl.renderComplete.then(function () {
    				ctrl.commentsList = ctrl.element.querySelector('#commentsList');
    				ctrl.commentsList.itemDataSource = new WinJS.Binding.List(comments).dataSource;
    			});
    			return comments;
    		}, ctrl.detailLoadError.bind(ctrl));
    	},

    	detailLoadError: function (err) {
    		console.error(err);
    	},

        updateLayout: function (element) {
        }
    });

    WinJS.Namespace.define('Flickity.UI', { Comments: CommentsCtor });
})();
