/*global define*/

define([
    'underscore',
    'backbone',
    'react'
], function (_, Backbone, React) {
    'use strict';

    /** @jsx React.DOM */
    var CommentHeaderComponent = React.createClass({
        render: function () {
            return (
                <h2 className='comments-title'>
                    2 thoughts on &ldquo;3rd post&rdquo;
                </h2>
            );
        }
    });

    var CommentRespondView = Backbone.View.extend({
        initialize: function (options) {
            this.render(options.els.comments);
        },

        render: function (data) {
            React.render(
                <CommentHeaderComponent />,
                document.getElementById(data)
            );
            return this;
        }
    });

    return CommentRespondView;
});