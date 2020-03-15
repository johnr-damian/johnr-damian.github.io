import typescript from '@rollup/plugin-typescript';

export default [{
    input: 'static/scripts/source/main.ts',
    output: {
        file: 'static/scripts/library/bundle.js',
        format: 'cjs'
    },
    plugins: [typescript()]
}];