/*global define*/

define([
    'underscore',
    'backbone',
    'react',
    'jsx!template_components/excerpt'
], function (_, Backbone, React, ExcerptView) {
    'use strict';

    var HomeContent = Backbone.View.extend({
        initialize: function (options) {
            this.el = options.el;
            this.collection = options.collection;
        },

        render: function () {
            var postsData = this.collection.toJSON();

            Ping.trigger('update_head_title_excerpt');

            _.each(postsData, function(n, key) {
                this.renderExcerpt(postsData[key]);
            }, this);

            return this;
        },

        renderExcerpt: function (postData) {
            new ExcerptView({
                'el': this.el,
                'post_data': postData
            });
        }
    });

    return HomeContent;
});