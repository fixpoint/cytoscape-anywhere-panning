export default function register(cy?: any): void;
declare global {
    interface Window {
        cytoscape?: any;
    }
}
import 'cytoscape';
declare module 'cytoscape' {
    interface Options {
        activators?: (evt: cytoscape.EventObject) => boolean;
    }
    interface Core {
        anywherePanning(options?: Options): void;
    }
}
