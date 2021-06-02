/** Render engine configuration */
export interface RenderConfig {
    /** Shader quality */
    precision: 'highp' | 'mediump' | 'lowp'

    /** Transparent render background. If enabled, background or environment map will not be rendered */
    alpha: boolean

    /** Smoothing object boundaries. Removes jaggedness on model edges */
    antialias: boolean

    /** Power and render performance management */
    powerPreference: 'high-performance' | 'low-power'

    /** Render brightness */
    gamma: number

    /** On-screen render statistics */
    debugMode: boolean

    /** Use default or logarithmic depth buffer. Useful for large space */
    logarithmicDepthBuffer: boolean
}

/** Make WebGLRenderer config object from RenderConfig interface data */
export function BuildRenderConfig(config: RenderConfig) {
    return {
        precision: config.precision,
        alpha: config.alpha,
        antialias: config.antialias,
        powerPreference: config.powerPreference
    };
}