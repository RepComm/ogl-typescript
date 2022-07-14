import { Mesh } from '../core/Mesh.js';
import { Vec2 } from '../math/Vec2.js';
import { OGLRenderingContext } from '../core/Renderer.js';
export interface FlowmapOptions {
    size: number;
    falloff: number;
    alpha: number;
    dissipation: number;
    type: number;
}
export declare class Flowmap {
    gl: OGLRenderingContext;
    uniform: {
        value: any;
    };
    mask: {
        read: any;
        write: any;
        swap: () => void;
    };
    aspect: number;
    mouse: Vec2;
    velocity: Vec2;
    mesh: Mesh;
    constructor(gl: OGLRenderingContext, { size, // default size of the render targets
    falloff, // size of the stamp, percentage of the size
    alpha, // opacity of the stamp
    dissipation, // affects the speed that the stamp fades. Closer to 1 is slower
    type, }?: Partial<FlowmapOptions>);
    update(): void;
}
