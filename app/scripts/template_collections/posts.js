/*global define*/
define([
    'backbone',
    'template_collections/comments',
    'template_utilities/date_format'
], function (Backbone, CommentsCollection, DateUtility) {
    'use strict';

    var PostsCollection = Backbone.Collection.extend({
        initialize: function (options) {
            this.url = options.url + '/posts';
            this.rawUrl = options.url;

            this.fetch({
                'success': this.fetchSuccess,
                'error': this.fetchError
            });
        },

        fetchSuccess: function (collections, response) {
            collections.comments = [];

            var dfu = new DateUtility();

            for (var i = 0; i < response.length; i++) {
                collections.collection = new CommentsCollection({
                    'url': collections.rawUrl,
                    'post_id': response[i].ID,
                    'slug': response[i].slug
                });
                collections.models[i].set('post_id', 'post-' + response[i].ID);
                collections.models[i].set('comments', collections.collection);
                collections.models[i].set('date_dateformat',dfu.formatMDY(response[i].date));
            }
            //collections.collection.on("fetched_comments", collections.pingFetched, collections);
            Ping.on("comments_fetched", function(){
                Ping.trigger('posts_fetched');
            }.bind(this));

            //console.log('collections fetch success', response);
            //console.log('collections fetch collections', collections);
        },

        fetchError: function (collection, response) {
            throw new Error("Posts fetch error");
        }

    });

    return PostsCollection;
});