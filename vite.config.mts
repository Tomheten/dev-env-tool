import electron from 'vite-plugin-electron/simple';
import { viteStaticCopy } from 'vite-plugin-static-copy';


export default {
    build: {
        minify: false,
    },
    plugins: [
        electron({
            main: {

                entry: 'electron/main.ts',
            },
            preload: {
                input: 'electron/preload.ts',
            },
        }),
        viteStaticCopy({
            targets: [
                //{
                //src: `../${CT_ENV.distDir}/*`,
                //dest: 'app-nms',
                //}
            ],
        }),
    ],
};
