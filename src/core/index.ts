import { Core, EventObject } from 'cytoscape';

const MOUSE_BUTTON1 = 0;

export default function extension(this: Core, enabled: () => boolean): Core {
  let startPosition: null | {
    readonly x: number;
    readonly y: number;
  };
  this.on('mousedown', 'node, edge', (evt: EventObject) => {
    const e = (evt.originalEvent as any) as MouseEvent;
    if (enabled() && e.button === MOUSE_BUTTON1) {
      startPosition = evt.position;
    }
  });
  this.on('mouseup', (evt: EventObject) => {
    const e = (evt.originalEvent as any) as MouseEvent;
    if (e.button === MOUSE_BUTTON1) {
      startPosition = null;
    }
  });
  this.on('mousemove', (evt: EventObject) => {
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

declare module 'cytoscape' {
  interface Core {
    anywherePanning(enabled: () => boolean): void;
  }
}
