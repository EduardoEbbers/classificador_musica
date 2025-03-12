const {app, BrowserWindow} = require('electron');
const url = require('url');
const path = require('path');

let mainWindow;

function createWindon() {
    mainWindow = new BrowserWindow({
        width: 2000,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, '/dist/classificador_musica/index.html'),
            protocol: 'file', 
            slashes: true
        })
    );

    //Open the DevTools
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function() {
        mainWindow = null
    });
}

app.on('ready', createWindon);

app.on('window-all-closed', function() {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    if(mainWindow === null) {
        createWindon();
    }
});