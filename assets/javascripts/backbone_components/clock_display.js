// var Backbone = require('../../bower_components/backbone/backbone');

var ClockDisplay = Backbone.View.extend({
  initialize: function(options) {
    _.bindAll(this, 'updateDisplay');
    this.clock = this.options.clock; // Attach as an object (no model)
    this.$value = this.$el.find('.clock-display__value');
    this.$context = this.$el.find('.clock-display__context');
    this.$day = this.$el.find('.clock-display__day');
    $.subscribe(this.clock.channelId + '.timeChange', this.updateDisplay);
  },
  updateDisplay: function(e, timestamp) {
    var _this = this;
    var time = moment(timestamp);
    this.$value.html(time.format('hh:mm'));
    this.$context.html(time.format('a'));
    this.$day.html('');
    var _cal = time.calendar();
    var _whitelist = ['Yesterday', 'Today'];
    _.each(_whitelist, function(v) {
      if(_cal.substr(0, v.length) === v) {
        _this.$day.html(', ' + v);
      }
    });
  }
});

module.exports = ClockDisplay;