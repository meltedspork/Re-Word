/*global define*/

define([
    'underscore',
    'backbone',
    'react',
    'template_utilities/dom_generator'
], function (_, Backbone, React, DomUtility) {
    'use strict';

    /** @jsx React.DOM */
    var CommentComponent = React.createClass({
        render: function () {
            return (
                <article id={this.props.data.comment_div_id} className="comment-body">
                    <footer className="comment-meta">
                        <div className="comment-author vcard">
                        <img alt=''
                            src='http://1.gravatar.com/avatar/4d26be62330ce3113fb1a07c45acd108?s=56&#038;d=mm&#038;r=g'
                            srcset='http://1.gravatar.com/avatar/4d26be62330ce3113fb1a07c45acd108?s=112&amp;d=mm&amp;r=g 2x'
                            className='avatar avatar-56 photo' height='56' width='56' />
                            <b className="fn">reword</b>
                            <span className="says">says:</span>
                        </div>
                        <div className="comment-metadata">
                            <a href="http://re-word.site/3rd-post/#comment-2">
                                <time datetime="2015-05-18T13:19:56+00:00">
                                    May 18, 2015 at 1:19 pm</time>
                            </a>
                        </div>
                    </footer>
                    <div className="comment-content">
                        <p>this should say post 3! yes!</p>
                    </div>
                    <div className="reply">
                        <a className='comment-reply-link' href='/3rd-post/?replytocom=2#respond' onclick='return addComment.moveForm( "div-comment-2", "2", "respond", "7" )' aria-label='Reply to reword'>Reply</a>
                    </div>
                </article>
            );
        }
    });

    var CommentView = Backbone.View.extend({
        initialize: function (options) {
            var data = options.post_data;

            //var liComment = document.createElement('li');
            //liComment.className = 'comment byuser comment-author-reword bypostauthor even thread-even depth-1';
            //liComment.id = data.post_id;
            //document.getElementById(options.el).appendChild(liComment);
            //document.getElementById('comment-list').appendChild(liComment);

            //this.render(data);

            var du = new DomUtility();
            var className = 'comment byuser comment-author-reword bypostauthor even thread-even depth-1';
            var element = du.createEl('comment-list','li',data.post_id,className);
            this.render(data, element);
        },

        render: function (data, element) {
            React.render(
                <CommentComponent data={data} />,
                element
            );
            return this;
        }
    });

    return CommentView;
});