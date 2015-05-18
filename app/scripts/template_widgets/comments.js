/*global define*/

define([
    'underscore',
    'backbone',
    'react',
    'jsx!template_components/post',
    'jsx!template_components/comment_header',
    'jsx!template_components/comment_respond'
], function (_, Backbone, React, PostView, CommentHeaderView, CommentRespondView) {
    'use strict';

    var PageContent = Backbone.View.extend({
        initialize: function (options) {
           // this.post_slug = options.post_slug;
            this.el = options.el;
            this.els = options.els;
            this.model = options.model;

            var divPost = document.createElement('div');
            divPost.id = options.els.comments;
            divPost.className = 'comments-area';
            document.getElementById(options.el).appendChild(divPost);

            this.render();
        },

        render: function () {
            var postData = this.model.toJSON()[0];

            new CommentHeaderView({
                'els': this.els
            });

            new CommentRespondView({
                'els': this.els
            });

            return this;
        }
    });

    return PageContent;
});