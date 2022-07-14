import { Transform } from './Transform.js';
import { Mat3 } from '../math/Mat3.js';
import { Mat4 } from '../math/Mat4.js';
import { Geometry } from './Geometry.js';
import { Program } from './Program.js';
import { OGLRenderingContext } from './Renderer.js';
import { Camera } from './Camera.js';
import { Vec3 } from '../math/Vec3.js';
import { Vec2 } from '../math/Vec2.js';
export interface MeshOptions {
    geometry: Geometry;
    program: Program;
    mode: GLenum;
    frustumCulled: boolean;
    renderOrder: number;
}
export interface DrawOptions {
    camera: Camera;
}
export declare class Mesh extends Transform {
    name: string;
    numInstances: any;
    gl: OGLRenderingContext;
    id: number;
    geometry: Geometry;
    program: Program;
    mode: GLenum;
    frustumCulled: boolean;
    renderOrder: number;
    modelViewMatrix: Mat4;
    normalMatrix: Mat3;
    beforeRenderCallbacks: Array<any>;
    afterRenderCallbacks: Array<any>;
    hit: Partial<{
        localPoint: Vec3;
        distance: number;
        point: Vec3;
        faceNormal: Vec3;
        localFaceNormal: Vec3;
        uv: Vec2;
        localNormal: Vec3;
        normal: Vec3;
    }>;
    constructor(gl: OGLRenderingContext, { geometry, program, mode, frustumCulled, renderOrder }?: Partial<MeshOptions>);
    onBeforeRender(f: any): this;
    onAfterRender(f: any): this;
    draw({ camera }?: Partial<DrawOptions>): void;
}
