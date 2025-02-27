import { app, BrowserWindow } from 'electron';
import * as path from 'node:path';

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

async function run() {
    //const distPort = CT_ENV.port;
    let win: BrowserWindow | null = null;

    await app.whenReady();
    app.on('window-all-closed', () => {
        app.quit();
        win = null;
    });

    win = new BrowserWindow({
        webPreferences: {
            devTools: true,
            webSecurity: false,
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'), // add "preload"
        },
    });
    //win.webContents.openDevTools();

    // run server
    //const serverInfo = runServer(path.join(__dirname, '..', 'dist', 'app-nms'));
    //console.log('----- opened dist server on: ', serverInfo.address());
    await win.loadURL(`https://google.com`);
}

run();
