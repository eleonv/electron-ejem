const { app, BrowserWindow, ipcMain } = require('electron');
const { log } = require('node:console');
const path = require('node:path')

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: true,
        },
    });

    console.log("preload.js: ", path.join(__dirname, 'preload.js'));

    // Carga el index.html generado por Angular
    //win.loadFile(path.join(__dirname, '/dist/eapp/browser/index.html'));
    //win.loadFile('dist/eapp/browser/index.html');

    //win.loadURL('http://localhost:4200');
    //win.loadFile('dist/eapp/browser/index.html');
    //win.loadFile('index.html');

    //------
    const args = process.argv.slice(2);
    //const firtsArg = args[0] || 'dist/eapp/browser/index.html';
    const firtsArg = args[0];
    const secondArg = args[1];

    console.log('Firts Argument:', firtsArg);
    console.log('Second Argument:', secondArg);

    const ruta = path.join(__dirname, 'dist/eapp/browser/index.html');

    win.loadFile(ruta)
        .catch(error => {
            console.error("Error al cargar el archivo:", error);
        });

    //Enviar parámetros al cargarse el contenido 
    win.webContents.on('did-finish-load', () => {
        win.webContents.send('params', { user: firtsArg, theme: secondArg });

        //ipcMain.on('refresh-page', () => { win.reload(); });        
    });

    /*
    //------
    //ejecucion basica
    const ruta = path.join(__dirname, 'dist/eapp/browser/index.html');
    console.log("ruta", ruta);
 
    win.loadFile(ruta)
        .catch(error => {
            console.error("Error al cargar el archivo:", error);
        });*/
}

/*app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

console.log('Hello from Electron');*/


app.on('ready', () => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

console.log('Hello from Electron');