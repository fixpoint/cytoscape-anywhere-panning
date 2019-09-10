(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('cytoscape')) :
  typeof define === 'function' && define.amd ? define(['cytoscape'], factory) :
  (global = global || self, global.cytoscapeAnywherePanning = factory());
}(this, function () { 'use strict';

  var MOUSE_BUTTON1 = 0;
  function isActive(event) {
      if (event instanceof MouseEvent) {
          return event.button === MOUSE_BUTTON1;
      }
      return false;
  }
  function extension(enabled, activator) {
      var _this = this;
      if (enabled === void 0) { enabled = function () { return true; }; }
      if (activator === void 0) { activator = isActive; }
      var startPosition;
      this.on('vmousedown', 'node, edge', function (evt) {
          if (enabled() && activator(evt.originalEvent)) {
              startPosition = evt.position;
          }
      });
      this.on('vmouseup', function (evt) {
          if (activator(evt.originalEvent)) {
              startPosition = null;
          }
      });
      this.on('vmousemove', function (evt) {
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
