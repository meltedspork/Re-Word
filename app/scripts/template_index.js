/*global define*/

define([
    'backbone',
    'react',
    'template_models/blog',
    'jsx!template_components/header',
    'jsx!template_components/footer'
], function (Backbone, React, BlogModel, HeaderView, FooterView) {
    'use strict';

    var IndexView = new (Backbone.View.extend({
        root: "/",

        url: 'http://re-word.site/wp-json',

        els: {
            header: 'masthead',
            footer: 'colophon',
            content: 'main',
            comments: 'comments',
        },

        events: {
            'click a': function (e) {
                e.preventDefault();
                //console.log(e.target.pathname);
                Backbone.history.navigate(e.target.pathname, {trigger: true});
            }
        },

        initialize: function (options) {
            this.model = new BlogModel({
                'url': this.url
            });
            this.model.on('change', this.render, this);
        },

        render: function () {
            var blogData = this.model.toJSON();

            this.setHeadTitleExcerpt(blogData);

            Ping.on("update_head_title_excerpt", function(){
                this.setHeadTitleExcerpt(blogData);
            }.bind(this));

            Ping.on("update_head_title_page", function(postData){
                this.setHeadTitlePage(postData, blogData);
            }.bind(this));

            new HeaderView({
                'el': this.els.header,
                'blog_data': blogData
            });

            new FooterView({
                'el': this.els.footer,
                'blog_data': blogData
            });

            return this;
        },

        setHeadTitleExcerpt: function (blogData) {
            document.title = blogData.name + ' | ' + blogData.description;
        },

        setHeadTitlePage: function (postData, blogData) {
            document.title = postData.title + ' | ' + blogData.name;
        }
    }))({el: document.body});

    return IndexView;
});