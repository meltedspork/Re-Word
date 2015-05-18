/*global define*/

define([
    'underscore',
    'backbone',
    'react',
    'template_utilities/dom_generator'
], function (_, Backbone, React, DomUtility) {
    'use strict';

    /** @jsx React.DOM */
    var PostComponent = React.createClass({
        render: function () {
            return (
                <div className={this.props.data.postClasses}>
                    <header className="entry-header">
                        <h2 className="entry-title" dangerouslySetInnerHTML={{__html: this.props.data.title}}>
                        </h2>
                    </header>
                    <div className="entry-content" dangerouslySetInnerHTML={{__html: this.props.data.content}}>
                    </div>
                    <footer className="entry-footer">
                        <span className="posted-on">
                            <span className="screen-reader-text">
                                Posted on </span>
                            <a href={this.props.data.link}>
                                <time className="entry-date published updated" dateTime={this.props.data.date}>{this.props.data.date_dateformat}</time>
                            </a>
                        </span>
                        <span className="byline">
                            <span className="author vcard">
                                <span className="screen-reader-text">Author </span>
                                <a className="url fn n" href={this.props.data.author.link}>{this.props.data.author.name}</a>
                            </span>
                        </span>
                    </footer>
                </div>
            );
        }
    });

    var PostView = Backbone.View.extend({
        initialize: function (options) {
            var data = options.post_data;

            data.postDlasses = data.post_id + ' post type-post status-publish format-standard category-uncategorized';

            var du = new DomUtility();
            var element = du.createEl(options.el,'article',data.post_id, 'hentry');
            this.render(data, element);
        },

        render: function (data, element) {
            React.render(
                <PostComponent data={data} />,
                element
            );
            return this;
        }
    });

    return PostView;
});