var $           = require('jquery'),
    _           = require('underscore'),
    $document   = $('document');

var Event = function(selector) {
    this.$ = selector ? $(selector) : $document;
    this.callbacks = [];
};

Event.prototype = {
    up: function(events) {
        this.bind('up', events);
        return this;
    },
    down: function(events) {
        this.bind('down', events);
        return this;
    },
    bind: function(type, events) {
        var self = this;

        if(!this.callbacks[type]) {
            this.callbacks[type] = [];

            this.$.bind('key' + type, function(e) {
                var callbacks = self.callbacks[type];

                for(var i=0; i<events.length; i++) {
                    var callback = callbacks[i];

                    if(!callback.conditions || self._validate(callback.conditions, e)) {
                        callback(e);
                    }
                }
            });
        }

        if(_.isObject(config)) {
            _.each(events, function(callback, key) {
                self._add(type, key, callback);
            });
        }
        else {
            this._add(type, false, config);
        }

        return this;
    },
    on: function() {
        this.active = true;
        return this;
    },
    off: function() {
        this.active = false;
        return this;
    },
    destroy: function() {
        this.$.unbind('keydown');
    },

    /*** Internal Functions ***/
    _add: function(type, conditions, callback) {
        if(conditions) {
            callback.conditions = this._parseConditions(conditions);
        }

        this.events[type].push(callback);
    },
    _parseConditions: function(c) {
        return {
            //key:    ,
            shift:   /\bshift\b/i.test(c),
            alt:     /\balt\b/i.test(c),
            ctrl:    /\bctrl\b/i.test(c),
            noMeta:  /\bnoMeta\b/i.test(c)
        };
    },
    _validate: function(c, e) {
        return  c.key ? c.key == e.which : true &&
                c.shift == e.shiftKey &&
                c.alt   == e.altKey &&
                ((c.ctrl == e.metaKey) != (c.ctrl == e.ctrlKey)) &&
                (c.noMeta ? !e.shiftKey && !e.altKey && !e.ctrlKey && !e.metaKey : true);
    }

    
};

module.exports = Event;