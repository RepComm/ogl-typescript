import { Program } from '../core/Program.js';
import { Mesh } from '../core/Mesh.js';
import { RenderTarget } from '../core/RenderTarget.js';
import { Triangle } from './Triangle.js';
import { OGLRenderingContext } from '../core/Renderer.js';
export interface GPGPUpass {
    mesh: Mesh;
    program: Program;
    uniforms: any;
    enabled: any;
    textureUniform: any;
}
export declare class GPGPU {
    gl: OGLRenderingContext;
    passes: GPGPUpass[];
    geometry: Triangle;
    dataLength: number;
    size: number;
    coords: Float32Array;
    uniform: {
        value: any;
    };
    fbo: {
        read: RenderTarget;
        write: RenderTarget;
        swap: () => void;
    };
    constructor(gl: OGLRenderingContext, { data, geometry, type, }: {
        data?: Float32Array;
        geometry?: Triangle;
        type?: any;
    });
    addPass({ vertex, fragment, uniforms, textureUniform, enabled }?: {
        vertex?: string;
        fragment?: string;
        uniforms?: {};
        textureUniform?: string;
        enabled?: boolean;
    }): {
        mesh: Mesh;
        program: Program;
        uniforms: {};
        enabled: boolean;
        textureUniform: string;
    };
    render(): void;
}
