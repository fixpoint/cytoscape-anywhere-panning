import { Core } from 'cytoscape';
export default function extension(this: Core, enabled: () => boolean): Core;
declare module 'cytoscape' {
    interface Core {
        anywherePanning(enabled: () => boolean): void;
    }
}
