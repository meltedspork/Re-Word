/*global define*/

define([
    'backbone',
    'template_utilities/comment_number'
], function (Backbone, CommentUtility) {
    'use strict';

    var CommentsCollection = Backbone.Collection.extend({
        initialize: function(options){
            this.url = options.url + '/posts/' + options.post_id + '/comments/';
            this.slug = options.slug;
            this.post_id = options.post_id;

            this.fetch({
                'success': this.fetchSuccess,
                'error': this.fetchError
            });
        },

        fetchSuccess: function (collection, response) {
            collection.comment_id = 'comment-' + collection.post_id;
            collection.comment_div_id = 'div-' + collection.comment_id;

            var cnv = new CommentUtility();
            collection.textPosts = cnv.getCommentsPostsText(response.length);
            collection.textPost = cnv.getCommentsPostsText(response.length);

            var collectionLink = collection.url.split('wp-json')[0];
            collection.link = collectionLink + collection.post_id + '/' + '#comments';

            Ping.trigger('comments_fetched');

            //console.log('CommentsCollection fetch success', response);
            //console.log('CommentsCollection models: ', collection);
        },

        fetchError: function (collection, response) {
            throw new Error('Posts fetch error');
        }

    });

    return CommentsCollection;
});