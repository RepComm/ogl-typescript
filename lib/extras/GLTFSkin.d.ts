import { Mesh } from '../core/Mesh.js';
import { Texture } from '../core/Texture.js';
import { Camera } from '../core/Camera.js';
export interface GLTFSkinOptions {
    skeleton: any;
    geometry: any;
    program: any;
    mode: any;
}
export declare class GLTFSkin extends Mesh {
    skeleton: any;
    animations: any;
    boneMatrices: Float32Array;
    boneTextureSize: number;
    boneTexture: Texture;
    constructor(gl: any, { skeleton, geometry, program, mode }?: Partial<GLTFSkinOptions>);
    createBoneTexture(): void;
    updateUniforms(): void;
    draw({ camera }?: {
        camera?: Camera;
    }): void;
}
