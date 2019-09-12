import { Core, EventObject } from 'cytoscape';
declare type Activator = (evt: EventObject) => boolean;
interface Options {
    threshold?: number;
    activators?: Activator[];
}
export default function extension(this: Core, options?: Options): Core;
export {};
