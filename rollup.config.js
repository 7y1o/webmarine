import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import {wasm} from '@rollup/plugin-wasm';
import filesize from "rollup-plugin-filesize";
import {terser} from "rollup-plugin-terser";
import sizes from 'rollup-plugin-sizes';
import nodeResolve from "rollup-plugin-node-resolve";
import progress from "rollup-plugin-progress";

export default {
    input: 'src/index.ts',
    output: {
        file: 'build/webmarine.js',
        format: 'esm'
    },
    plugins: [
        typescript({
            target: 'esnext',
            module: 'esnext'
        }),
        babel({
            babelHelpers: 'inline'
        }),
        wasm(),
        nodeResolve({
            browser: true
        }),
        terser({
            compress: {
                arrows: true,
                arguments: false,
                booleans: true,
                booleans_as_integers: true,
                collapse_vars: true,
                dead_code: true,
                keep_classnames: true,
                keep_fnames: true,
                keep_fargs: true
            },
            keep_classnames: true,
            keep_fnames: true,
            safari10: false,
            toplevel: true,
        }),
        progress(),
        sizes(),
        filesize()
    ]
}