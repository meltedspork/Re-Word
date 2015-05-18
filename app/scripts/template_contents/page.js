/*global define*/

define([
    'underscore',
    'backbone',
    'react',
    'jsx!template_components/post',
    'jsx!template_widgets/comments'
], function (_, Backbone, React, PostView, CommentsWidget) {
    'use strict';

    var PageContent = Backbone.View.extend({
        initialize: function (options) {
           // this.post_slug = options.post_slug;
            this.el = options.el;
            this.els = options.els;
            this.model = options.model;
        },

        render: function () {
            var postData = this.model.toJSON()[0];

            Ping.trigger('update_head_title_page', postData);

            new PostView({
                'el': this.el,
                'post_data': postData
            });

            new CommentsWidget({
                'el': this.el,
                'els': this.els,
                'model': this.model
            })

            return this;
        }
    });

    return PageContent;
});