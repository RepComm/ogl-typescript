import { Geometry } from '../core/Geometry.js';
import { Program } from '../core/Program.js';
import { Mesh } from '../core/Mesh.js';
import { Vec2 } from '../math/Vec2.js';
import { Vec3 } from '../math/Vec3.js';
import { Color } from '../math/Color.js';
import { OGLRenderingContext } from '../core/Renderer.js';
export interface PolylineOptions {
    points: Vec3[];
    vertex: string;
    fragment: string;
    uniforms: {
        [key: string]: {
            value: any;
        };
    };
    attributes: {
        [key: string]: any;
    };
}
export declare class Polyline {
    gl: OGLRenderingContext;
    points: Vec3[];
    count: number;
    position: Float32Array;
    prev: Float32Array;
    next: Float32Array;
    geometry: Geometry;
    resolution: {
        value: Vec2;
    };
    dpr: {
        value: number;
    };
    thickness: {
        value: number;
    };
    color: {
        value: Color;
    };
    miter: {
        value: number;
    };
    program: Program;
    mesh: Mesh;
    constructor(gl: OGLRenderingContext, { points, // Array of Vec3s
    vertex, fragment, uniforms, attributes, }: Partial<PolylineOptions>);
    updateGeometry(): void;
    resize(): void;
}
