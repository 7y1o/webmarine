/** Render initialization config */
interface IRenderConfig {
    /** Shader quality */
    precision?: 'highp' | 'mediump' | 'lowp';

    /** Whether the canvas contains an alpha (transparency) buffer or not */
    alpha?: boolean;

    /** Whether the renderer will assume that colors have premultiplied alpha */
    premultipliedAlpha?: boolean;

    /** Whether to perform antialiasing */
    antialias?: boolean;

    /** Whether the drawing buffer has a stencil buffer of at least 8 bits */
    stencil?: boolean;

    /** Provides a hint to the user agent indicating what configuration of GPU is suitable for this WebGL context */
    powerPreference?: 'high-performance' | 'low-power' | 'default';

    /**
     * Whether to use a logarithmic depth buffer.
     * It may be necessary to use this if dealing with huge differences in scale in a single scene.
     * Note that this setting uses gl_FragDepth if available which disables the Early Fragment Test
     * optimization and can cause a decrease in performance
     */
    logarithmicDepthBuffer?: boolean;
}

export default IRenderConfig;