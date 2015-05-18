/*global define*/

define([
    'backbone'
], function (Backbone) {
    'use strict';

    var DateFormatUtility = Backbone.View.extend({
        month: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],

        formatMDY: function (datetime) {
            var dt = new Date(datetime),
                m = dt.getMonth(),
                d = dt.getDate(),
                y = dt.getFullYear();
            return this.month[m] + ' ' + d + ', ' + y;
        }
    });
    return DateFormatUtility;
});