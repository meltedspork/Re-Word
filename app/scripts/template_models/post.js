/*global define*/

define([
    'backbone',
    'template_collections/comments',
    'template_utilities/date_format'
], function (Backbone, CommentsCollection, DateUtility) {
    'use strict';

    var PostModel = Backbone.Model.extend({
        initialize: function (options) {
            this.url = options.url + '/posts?filter[name]=' + options.post_slug;
            this.rawUrl = options.url;

            this.fetch({
                'success': this.fetchSuccess,
                'error': this.fetchError
            });
        },

        fetchSuccess: function (model, response) {
            response[0].post_id = 'post-' + response[0].ID;

            var author = response[0].author;
            var authorLink = author.meta.links.self.split('wp-json')[0];
            author.link = authorLink + 'author/' + author.username + '/';

            var dfu = new DateUtility();
            response[0].date_dateformat = dfu.formatMDY(response[0].date);

            response[0].comments = new CommentsCollection({
                'url': model.rawUrl,
                'post_id': response[0].ID,
                'slug': response[0].slug
            });
            //collections.models[i].set('comments', collections.collection);

            Ping.on("comments_fetched", function(){
                Ping.trigger('post_fetched');
            }.bind(this));

            //console.log('Post page fetch:', response);
            //console.log('Post page model:', model);
        },

        fetchError: function (collection, response) {
            throw new Error("Blog fetch error");
        }
    });
    return PostModel;
});