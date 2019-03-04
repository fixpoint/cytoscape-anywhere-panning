'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var MOUSE_BUTTON1 = 0;
function extension(enabled) {
    var _this = this;
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
    var extensionName = 'anywherePanning';
    cy('core', extensionName, extension);
}
if (typeof cytoscape !== 'undefined') {
    register(cytoscape);
}

exports.register = register;
