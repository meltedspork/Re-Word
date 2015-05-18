/*global define*/

define([
    'backbone'
], function (Backbone) {
    'use strict';

    var DomGeneratorUtility = Backbone.View.extend({
        createEl: function (el, element, elementID, elementClass) {
            var dom = document.createElement(element);
            dom.id = elementID;
            dom.className = elementClass != null ? elementClass : elementClass;
            return document.getElementById(el).appendChild(dom);
        }
    });
    return DomGeneratorUtility;
});