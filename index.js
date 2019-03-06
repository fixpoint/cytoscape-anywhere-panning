(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('cytoscape')) :
  typeof define === 'function' && define.amd ? define(['cytoscape'], factory) :
  (global = global || self, global.cytoscapeAnywherePanning = factory());
}(this, function () { 'use strict';

  var MOUSE_BUTTON1 = 0;
  function extension(enabled) {
      var _this = this;
      if (enabled === void 0) { enabled = function () { return true; }; }
      var startPosition;
      this.on('mousedown', 'node, edge', function (evt) {
          var e = evt.originalEvent;
          if (enabled() && e.button === MOUSE_BUTTON1) {
              startPosition = evt.position;
          }
      });
      this.on('mouseup', function (evt) {
          var e = evt.originalEvent;
          if (e.button === MOUSE_BUTTON1) {
              startPosition = null;
          }
      });
      this.on('mousemove', function (evt) {
          if (startPosition) {
              var zoom = _this.zoom();
              var relativePosition = {
                  x: (evt.position.x - startPosition.x) * zoom,
                  y: (evt.position.y - startPosition.y) * zoom,
              };
              _this.panBy(relativePosition);
          }
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
