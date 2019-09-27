export default function register(cy?: any): void;
declare global {
    interface Window {
        cytoscape?: any;
    }
}
import 'cytoscape';
declare module 'cytoscape' {
    interface Activator {
        (evt: cytoscape.EventObject): boolean;
    }
    interface Options {
        activators?: Activator[];
    }
    interface Core {
        anywherePanning(options?: Options): void;
    }
}