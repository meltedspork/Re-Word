/*global define*/

define([
    'backbone',
    'react'
], function (Backbone, React) {
    'use strict';

    /** @jsx React.DOM */
    var FooterComponent = React.createClass({
        render: function () {
            return (
                <footer id="colophon" className="site-footer" role="contentinfo">
                    <div className="site-info">
                        <a href="http://www.wordpress.org">
                            Proudly powered by Wordpress
                        </a> | <a href={this.props.data.URL}>
                            {this.props.data.name} Theme by MeltedSpork
                        </a>
                    </div>
                </footer>
            );
        }
    });

    var FooterView = Backbone.View.extend({
        initialize: function (options) {
            this.render(options);
        },

        render: function (data) {
            React.render(
                <FooterComponent data={data.blog_data} />,
                document.getElementById(data.el)
            );
            return this;
        }
    });

    return FooterView;
});