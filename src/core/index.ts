import { Core, EventObject } from 'cytoscape';

type Activator = (evt: EventObject) => boolean;

interface Options {
  threshold?: number;
  activators?: Activator[];
}

const defaultThreshold = 5;

const defaultActivators: Activator[] = [
  evt => {
    if (evt.originalEvent instanceof MouseEvent) {
      return evt.originalEvent.button === 0;
    } else if (evt.originalEvent instanceof TouchEvent) {
      return evt.originalEvent.touches.length === 1;
    }
    return false;
  },
];

export default function extension(this: Core, options: Options = {}): Core {
  const threshold = options.threshold || defaultThreshold;
  const activators = options.activators || defaultActivators;
  const userPanningEnabled = this.userPanningEnabled();
  const boxSelectionEnabled = this.boxSelectionEnabled();
  let hasPanStarted = false;
  let startEvent: null | EventObject;
  this.on('vmousedown', (evt: EventObject) => {
    if (activators.some(activator => activator(evt))) {
      startEvent = evt;
    }
  });
  this.on('vmouseup', (evt: EventObject) => {
    if (hasPanStarted) {
      this.emit('awpanend', [evt]);
      this.userPanningEnabled(userPanningEnabled);
      this.boxSelectionEnabled(boxSelectionEnabled);
    }
    startEvent = null;
    hasPanStarted = false;
  });
  this.on('vmousemove', (evt: EventObject) => {
    if (!startEvent) {
      return;
    }
    const startPosition = startEvent.position;
    const deltaX = evt.position.x - startPosition.x;
    const deltaY = evt.position.y - startPosition.y;
    if (!hasPanStarted) {
      if (Math.sqrt(deltaX ** 2 + deltaY ** 2) < threshold) {
        return;
      }
      this.emit('awpanstart', [startEvent]);
      hasPanStarted = true;
      // Disable user panning and box selection only on non touch device
      if (startEvent.originalEvent instanceof MouseEvent) {
        this.userPanningEnabled(false);
        this.boxSelectionEnabled(false);
      }
    }
    const zoom = this.zoom();
    this.panBy({
      x: deltaX * zoom,
      y: deltaY * zoom,
    });
    this.emit('awpanmove', [evt]);
  });

  return this;
}
