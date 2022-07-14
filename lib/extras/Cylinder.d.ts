import { Geometry, AttributeMap } from '../core/Geometry.js';
import { OGLRenderingContext } from '../core/Renderer.js';
export declare type CylinderOptions = {
    radiusTop: number;
    radiusBottom: number;
    height: number;
    radialSegments: number;
    heightSegments: number;
    openEnded: boolean;
    thetaStart: number;
    thetaLength: number;
    attributes: AttributeMap;
};
export declare class Cylinder extends Geometry {
    constructor(gl: OGLRenderingContext, { radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength, attributes, }?: Partial<CylinderOptions>);
}
