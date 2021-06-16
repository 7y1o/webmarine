export interface WMRenderEngineConfigRef {
    /** Shaders quality */
    precision?: 'highp' | 'mediump' | 'lowp';

    /** Transparent background */
    alpha?: boolean;

    /** Antialiasing */
    antialias?: boolean;
}