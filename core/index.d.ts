import { Core, EventObject } from 'cytoscape';
export default function extension(this: Core, enabled?: () => boolean, activator?: (event: EventObject) => boolean): Core;
