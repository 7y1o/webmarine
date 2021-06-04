import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import {wasm} from '@rollup/plugin-wasm';
import glsl from "rollup-plugin-glsl";
import filesize from "rollup-plugin-filesize";
import {terser} from "rollup-plugin-terser";

export default {
    input: 'src/main.ts',
    output: {
        file: 'build/index.js',
        format: 'es'
    },
    plugins: [
        babel({
            babelHelpers: 'bundled'
        }),
        typescript(),
        wasm(),
        glsl({
            sourceMap: false
        }),
        filesize(),
        terser({
            ecma: 2020,
            compress: true,
            keep_classnames: true,
            keep_fnames: true,
            safari10: true
        })
    ]
}