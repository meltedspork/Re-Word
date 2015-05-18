/*global define*/

define([
    'backbone',
], function (Backbone) {
    'use strict';

    var CommentNumberView = Backbone.View.extend({
        getCommentsPostsText: function (commentsLength) {
            var commentStr = commentsLength + ' Comment';
            if (commentsLength === 1) {
                return commentStr;
            } if (commentsLength > 1) {
                return commentStr + 's';
            }
            return 'Leave a comment';
        },
        getCommentsPostText: function (commentsLength, postTitle) {
            var commentStrStart = commentsLength + ' thought',
                commendStrEnd = ' on ' + postTitle;
            if (commentsLength === 1) {
                return commentStrStart + commendStrEnd;
            } if (commentsLength > 1) {
                return commentStrStart + 's' + commendStrEnd;
            }
            return 'null';
        }
    });

    return CommentNumberView;
});