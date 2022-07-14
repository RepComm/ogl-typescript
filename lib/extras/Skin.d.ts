import { Mesh } from '../core/Mesh.js';
import { Transform } from '../core/Transform.js';
import { Mat4 } from '../math/Mat4.js';
import { Texture } from '../core/Texture.js';
import { Animation } from './Animation.js';
import { OGLRenderingContext } from '../core/Renderer.js';
import { Geometry } from '../core/Geometry.js';
import { Program } from '../core/Program.js';
import { Camera } from '../core/Camera.js';
export interface SkinOptions {
    rig: any;
    geometry: Geometry;
    program: Program;
    mode: GLenum;
}
export interface BoneTransform extends Transform {
    name: string;
    bindInverse: Mat4;
}
export declare class Skin extends Mesh {
    animations: Animation[];
    boneTexture: Texture;
    boneTextureSize: number;
    boneMatrices: Float32Array;
    root: Transform;
    bones: BoneTransform[];
    constructor(gl: OGLRenderingContext, { rig, geometry, program, mode }?: Partial<SkinOptions>);
    createBones(rig: any): void;
    createBoneTexture(): void;
    addAnimation(data: any): Animation;
    update(): void;
    draw({ camera }?: {
        camera?: Camera;
    }): void;
}
