window.ReWord = {};

/*global require*/
'use strict';

require.config({
    'shim': {
        'backbone': {
            'deps': ['underscore','jquery'],
            'exports': 'Backbone'
        },
        'react': {
            'exports': 'React'
        //},
        //JSXTransformer: {
        //    exports: 'JSXTransformer'
        }
    },
    'paths': {
        'jquery': '../bower_components/jquery/dist/jquery',
        'backbone': '../bower_components/backbone/backbone',
        'text': '../bower_components/requirejs-text/text',
        'underscore': '../bower_components/lodash/dist/lodash',
        'react': '../bower_components/react/react-with-addons',
        //'JSXTransformer': '../bower_components/jsx-requirejs-plugin/js/JSXTransformer',
        'JSXTransformer': '../bower_components/react/JSXTransformer',
        'jsx': '../bower_components/jsx-requirejs-plugin/js/jsx'
    }
});

require(['underscore','backbone','template_router'], function(_, backbone, Router) {
    window.Ping = _.extend({}, backbone.Events);
    var router = new Router();
    Backbone.history.start({
        'pushState': true,
        'root': router.root
    });
});


