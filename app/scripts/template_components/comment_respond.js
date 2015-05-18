/*global define*/

define([
    'underscore',
    'backbone',
    'react',
    'template_utilities/dom_generator'
], function (_, Backbone, React, DomUtility) {
    'use strict';

    /** @jsx React.DOM */
    var CommentRespondComponent = React.createClass({
        render: function () {
            return (
                <div className="comment-respond">
                    <h3 id="reply-title" className="comment-reply-title">
                        Leave a Reply
                        <small>
                            <a rel="nofollow" id="cancel-comment-reply-link" href="/post-two/#respond" style={{'display' : 'none'}}>
                                Cancel reply
                            </a>
                        </small>
                    </h3>
                    <form action="http://re-word.site/wp-comments-post.php" method="post" id="commentform" className="comment-form" noValidate>
                        <p className="comment-notes">
                            <span id="email-notes">
                                Your email address will not be published.</span> Required fields are marked <span className="required">*</span>
                            </p>
                        <p className="comment-form-author">
                            <label htmlFor="author">
                                Name <span className="required">*</span> </label>
                            <input id="author" name="author" type="text" value="" size="30" aria-required='true' required='required' />
                        </p>
                        <p className="comment-form-email">
                            <label htmlFor="email">
                                Email <span className="required">*</span> </label>
                            <input id="email" name="email" type="email" value="" size="30" aria-describedby="email-notes" aria-required='true' required='required' />
                        </p>
                        <p className="comment-form-url">
                            <label htmlFor="url">
                                Website </label>
                            <input id="url" name="url" type="url" value="" size="30" />
                        </p>
                        <p className="comment-form-comment">
                            <label htmlFor="comment">
                                Comment </label>
                            <textarea id="comment" name="comment" cols="45" rows="8" aria-describedby="form-allowed-tags" aria-required="true" required="required">
                            </textarea>
                        </p>
                        <p className="form-allowed-tags" id="form-allowed-tags">
                            You may use these <abbr title="HyperText Markup Language">HTML</abbr> tags and attributes:
                            <code>&lt;a href=&quot;&quot; title=&quot;&quot;&gt; &lt;abbr title=&quot;&quot;&gt; &lt;acronym title=&quot;&quot;&gt; &lt;b&gt; &lt;blockquote cite=&quot;&quot;&gt; &lt;cite&gt; &lt;code&gt; &lt;del datetime=&quot;&quot;&gt; &lt;em&gt; &lt;i&gt; &lt;q cite=&quot;&quot;&gt; &lt;s&gt; &lt;strike&gt; &lt;strong&gt; </code>
                        </p>
                        <p className="form-submit">
                            <input name="submit" type="submit" id="submit" className="submit" value="Post Comment" />
                            <input type='hidden' name='comment_post_ID' value='4' id='comment_post_ID' />
                            <input type='hidden' name='comment_parent' id='comment_parent' value='0' />
                        </p>
                    </form>
                </div>
            );
        }
    });

    var CommentRespondView = Backbone.View.extend({
        initialize: function (options) {
            var du = new DomUtility();
            var element = du.createEl(options.els.comments,'div','respond');
            this.render(element);
        },

        render: function (element) {
            React.render(
                <CommentRespondComponent />,
                element
            );
            return this;
        }
    });

    return CommentRespondView;
});