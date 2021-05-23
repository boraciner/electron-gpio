const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path')
var Gpio = require('onoff').Gpio;
var led4 = new Gpio(4, 'out');


function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
    },
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
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


ipcMain.on('GPIO', (event, arg) => {
  
    console.log("GPIO",arg)
    if(arg==='ON'){
        led4.write(1)
    }
    else{
        led4.write(0)
    }
  });