import { Core, EventObject } from 'cytoscape';

const MOUSE_BUTTON1 = 0;

function isActive(event: EventObject): boolean {
  if (event instanceof MouseEvent) {
    return event.button === MOUSE_BUTTON1;
  } else if (event instanceof TouchEvent) {
    return event.touches.length === 1;
  }
  return false;
}

export default function extension(
  this: Core,
  enabled: () => boolean = () => true,
): Core {
  let startPosition: null | {
    readonly x: number;
    readonly y: number;
  };
  this.on('vmousedown', 'node, edge', (evt: EventObject) => {
    if (enabled() && isActive(evt.originalEvent)) {
      startPosition = evt.position;
    }
  });
  this.on('vmouseup', (evt: EventObject) => {
    if (isActive(evt.originalEvent)) {
      startPosition = null;
    }
  });
  this.on('vmousemove', (evt: EventObject) => {
    if (startPosition) {
      const zoom = this.zoom();
      const relativePosition = {
        x: (evt.position.x - startPosition.x) * zoom,
        y: (evt.position.y - startPosition.y) * zoom,
      };
      this.panBy(relativePosition);
    }
  });

  return this;
}
