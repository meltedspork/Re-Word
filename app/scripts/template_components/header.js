/*global define*/

define([
    'backbone',
    'react',
], function (Backbone, React) {
    'use strict';

    /** @jsx React.DOM */
    var HeaderComponent = React.createClass({
        render: function () {
            return (
                <header id="masthead" className="site-header" role="banner">
                    <div className="site-branding">
                        <h1 className='site-title'>
                            <a href={this.props.data.URL} rel='home'>
                                {this.props.data.name}
                            </a>
                        </h1>
                        <p className='site-description'>
                            {this.props.data.description}
                        </p>
                        <button className="secondary-toggle">Menu and widgets</button>
                    </div>
                </header>
            );
        }
    });

    var HeaderView = Backbone.View.extend({
        initialize: function (options) {
            this.render(options);
        },

        render: function (data) {
            React.render(
                <HeaderComponent data={data.blog_data} />,
                document.getElementById(data.el)
            );
            return this;
        }
    });

    return HeaderView;
});