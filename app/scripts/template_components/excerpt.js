/*global define*/

define([
    'underscore',
    'backbone',
    'react',
    'template_utilities/dom_generator'
], function (_, Backbone, React, DomUtility) {
    'use strict';

    /** @jsx React.DOM */
    var ExcerptComponent = React.createClass({
        render: function () {
            return (
                <div className={this.props.data.postClasses}>
                    <header className="entry-header">
                        <h2 className="entry-title">
                            <a href={this.props.data.link} rel="bookmark" dangerouslySetInnerHTML={{__html: this.props.data.title}}>

                            </a>
                        </h2>
                    </header>
                    <div className="entry-content" dangerouslySetInnerHTML={{__html: this.props.data.excerpt}}>
                    </div>
                    <footer className="entry-footer">
                        <span className="posted-on">
                            <span className="screen-reader-text">
                                Posted on </span>
                            <a href={this.props.data.link} rel="bookmark">
                                <time className="entry-date published updated" dateTime={this.props.data.date}>
                                    {this.props.data.date_dateformat}
                                </time>
                            </a>
                        </span>
                        <span className="comments-link">
                            <a href={this.props.data.comments.link}>{this.props.data.comments.textPosts}</a>
                        </span>
                    </footer>
                </div>
            );
        }
    });

    var ExcerptView = Backbone.View.extend({
        initialize: function (options) {
            var data = options.post_data;
            data.postClasses = data.post_id + ' post type-post status-publish format-standard category-uncategorized';

            var du = new DomUtility();
            var element = du.createEl(options.el,'article',data.post_id, 'hentry');
            this.render(data, element);
        },

        render: function (data, element) {
            React.render(
                <ExcerptComponent data={data} />,
                element
            );
            return this;
        }
    });

    return ExcerptView;
});