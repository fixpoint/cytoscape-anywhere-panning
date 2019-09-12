(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('cytoscape')) :
  typeof define === 'function' && define.amd ? define(['cytoscape'], factory) :
  (global = global || self, global.cytoscapeAnywherePanning = factory());
}(this, function () { 'use strict';

  var defaultThreshold = 5;
  var defaultActivators = [
      function (evt) {
          if (evt.originalEvent instanceof MouseEvent) {
              return evt.originalEvent.button === 0;
          }
          else if (evt.originalEvent instanceof TouchEvent) {
              return evt.originalEvent.touches.length === 1;
          }
          return false;
      },
  ];
  function extension(options) {
      var _this = this;
      if (options === void 0) { options = {}; }
      var threshold = options.threshold || defaultThreshold;
      var activators = options.activators || defaultActivators;
      var hasPanStarted = false;
      var startEvent;
      this.on('vmousedown', function (evt) {
          if (activators.some(function (activator) { return activator(evt); })) {
              startEvent = evt;
          }
      });
      this.on('vmouseup', function (evt) {
          if (hasPanStarted) {
              _this.emit('awpanend', [evt]);
          }
          startEvent = null;
          hasPanStarted = false;
      });
      this.on('vmousemove', function (evt) {
          if (!startEvent) {
              return;
          }
          var startPosition = startEvent.position;
          var deltaX = evt.position.x - startPosition.x;
          var deltaY = evt.position.y - startPosition.y;
          if (!hasPanStarted) {
              if (Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)) < threshold) {
                  return;
              }
              _this.emit('awpanstart', [startEvent]);
              hasPanStarted = true;
          }
          var zoom = _this.zoom();
          _this.panBy({
              x: deltaX * zoom,
              y: deltaY * zoom,
          });
          _this.emit('awpanmove', [evt]);
      });
      return this;
  }

  function register(cy) {
      if (!cy) {
          return;
      }
      // Initialize extension
      // Register extension
      var extensionName = 'anywherePanning';
      cy('core', extensionName, extension);
      // cy('collection', extensionName, extension);
      // cy('layout', extensionName, extension);
      // cy('renderer', extensionName, extension);
  }
  if (typeof window.cytoscape !== 'undefined') {
      register(window.cytoscape);
  }

  return register;

}));
//# sourceMappingURL=index.js.map
