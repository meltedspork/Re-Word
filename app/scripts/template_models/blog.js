/*global define*/

define([
    'backbone'
], function (Backbone) {
    'use strict';

    var PostModel = Backbone.Model.extend({
        initialize: function (options) {
            this.url = options.url;
            this.fetch({
                'success': this.fetchSuccess,
                'error': this.fetchError
            });
        },

        fetchSuccess: function (model, response) {
            // console.log('Blog fetch success', response);
            // console.log('Blog blog: ', model);
        },

        fetchError: function (collection, response) {
            throw new Error("Post fetch error");
        }
    });
    return PostModel;
});