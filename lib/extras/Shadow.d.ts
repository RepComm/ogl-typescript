import { Camera } from '../core/Camera.js';
import { Program } from '../core/Program.js';
import { RenderTarget } from '../core/RenderTarget.js';
import { OGLRenderingContext } from '../core/Renderer.js';
import { Mesh } from '../core/Mesh.js';
export declare class Shadow {
    gl: OGLRenderingContext;
    light: Camera;
    target: RenderTarget;
    depthProgram: Program;
    castMeshes: Mesh[];
    constructor(gl: OGLRenderingContext, { light, width, height }: {
        light?: Camera;
        width?: number;
        height?: any;
    });
    add({ mesh, receive, cast, vertex, fragment, uniformProjection, uniformView, uniformTexture, }: {
        mesh: any;
        receive?: boolean;
        cast?: boolean;
        vertex?: string;
        fragment?: string;
        uniformProjection?: string;
        uniformView?: string;
        uniformTexture?: string;
    }): void;
    render({ scene }: {
        scene: any;
    }): void;
}
