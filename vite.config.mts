import electron from 'vite-plugin-electron/simple';
import path from 'node:path';
import multiple from 'vite-plugin-multiple';

export default {
    plugins: [
        electron({
            main: {
                entry: 'electron/main.ts',
            },
            preload: {
                input: path.join(__dirname, 'electron/preload.ts'),
            },
        }),
        multiple([
            {
                name: 'node-true',
                config: 'vite.node-true.config.mts',
            },
            {
                name: 'node-false',
                config: 'vite.node-false.config.mts',
            },
        ]),
    ],
    build: {
        rollupOptions: {
            input: path.join(__dirname, 'html/index.html'),
        },
    },
};
