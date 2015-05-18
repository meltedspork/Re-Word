/*global define */

define([
	'backbone',
	'template_index',
	'template_models/post',
    'template_collections/posts',
	'jsx!template_contents/home',
	'jsx!template_contents/page'
], function (Backbone, IndexView, PostModel, PostsCollection, HomeContent, PageContent) {
	'use strict';

	var Router = Backbone.Router.extend({
		initialize: function () {
			this.url = IndexView.url;
			this.root = IndexView.root;
			this.els = IndexView.els;
		},

		routes: {
			'': 'home',
			':route(/)': 'page'
		},

		home: function () {
			this.collection = new PostsCollection({
                'url': this.url
            });

            Ping.on('posts_fetched', function(){
                this.showHome();
            }.bind(this));
		},

		page: function (postSlug) {
			this.postSlug = postSlug;
			this.model = new PostModel({
                'url': this.url,
                'post_slug': postSlug,
            });

			Ping.on('post_fetched', function(){
                this.showPage();
            }.bind(this));
		},

		showHome: function () {
			//console.log('home col: ', this.collection);
			var view = new HomeContent({
				'el': this.els.content,
				'collection': this.collection
			});
			this.render(view);
		},

		showPage: function () {
			var view = new PageContent({
				'el': this.els.content,
				'model': this.model,
				'page_slug': this.postSlug,
				'els': this.els
			});
			this.render(view);
		},

		render: function (view) {
	        if (this.currentView) {
	            $(this.els.content).empty();
	        }
	        view.render();
	        this.currentView = view;
	        return this;
	    }
	});

	return Router;
});
