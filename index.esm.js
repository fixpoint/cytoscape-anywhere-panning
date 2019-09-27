import 'cytoscape';

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
    var userPanningEnabled = this.userPanningEnabled();
    var boxSelectionEnabled = this.boxSelectionEnabled();
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
            _this.userPanningEnabled(userPanningEnabled);
            _this.boxSelectionEnabled(boxSelectionEnabled);
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
            // Disable user panning and box selection only on non touch device
            if (startEvent.originalEvent instanceof MouseEvent) {
                _this.userPanningEnabled(false);
                _this.boxSelectionEnabled(false);
            }
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

export default register;
//# sourceMappingURL=index.esm.js.map
