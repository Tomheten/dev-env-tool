import path from 'path';
import { app, BrowserWindow } from 'electron';
import * as child_process from 'node:child_process';
import * as fs from 'node:fs';

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

const windows: BrowserWindow[] = [];

function createWindow() {
    // Renderer 1
    const win = new BrowserWindow();


    if (process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(path.posix.join(process.env.VITE_DEV_SERVER_URL, 'html/index.html'));
    } else {
        win.loadFile(path.join(__dirname, '../dist/html/index.html'));
    }
    windows.push(win);

    // Renderer 2
    const nodeTrue = new BrowserWindow({
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
        },
        width: 700,
        height: 500,
    });
    if (process.env.VITE_DEV_SERVER_URL) {
        nodeTrue.loadURL('http://localhost:5174/html/node-true.html');
    } else {
        nodeTrue.loadFile(path.join(__dirname, '../dist/html/node-true.html'));
    }
    windows.push(nodeTrue);

    // Renderer 3
    const nodeFalse = new BrowserWindow({
        width: 600,
        height: 400,
    });
    if (process.env.VITE_DEV_SERVER_URL) {
        nodeFalse.loadURL('http://localhost:5175/html/node-false.html');
    } else {
        nodeFalse.loadFile(path.join(__dirname, '../dist/html/node-false.html'));
    }
    windows.push(nodeFalse);
}

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
    await win.loadURL(`https://google.com`);
}


app.whenReady().then(() => {
    if (process.env.VITE_DEV_SERVER_URL) {
        const f = fs.readFileSync(path.join(__dirname, '..', 'public/playwright-test.js')).toString();
        console.log(f)
        child_process.fork(path.join(__dirname, '..', 'public/playwright-test.js'))
    } else {
        //win.loadFile(path.join(__dirname, '../dist/html/index.html'));
        console.log(
            fs.readFileSync(path.join(__dirname, '../dist/playwright-test.js')).toString(),

        );

        child_process.fork(path.join(__dirname, '../dist/playwright-test.js'))
    }

    //createWindow()


    run();
});

app.on('window-all-closed', () => {
    windows.length = 0;
    app.quit();
});
