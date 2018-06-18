// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const menuTemplate = [{
  label: 'Plex',
  submenu: [{
    label: 'About Plex',
    role: 'about',
  }, {
    type: 'separator',
  }, {
    label: 'Hide Plex',
    accelerator: 'Command+H',
    role: 'hide',
  }, {
    label: 'Quit Plex',
    accelerator: 'Command+Q',
    role: 'quit',
  }],
}, {
  label: 'View',
  submenu: [{
    label: 'Reload',
    accelerator: 'Command+R',
    click: (menuItem, mainWindow) => {
      if (mainWindow) {
        mainWindow.reload();
      }
    },
  }],
}, {
  label: 'Window',
  submenu: [{
    label: 'Zoom',
    role: 'zoom',
  }, {
    label: 'Minimize',
    accelerator: 'Command+M',
    role: 'minimize',
  }, {
    type: 'separator',
  }, {
    label: 'Float on Top',
    accelerator: 'Command+T',
    type: 'checkbox',
    checked: true,
    click: (menuItem, mainWindow) => {
      const isChecked = !menuItem.checked;

      mainWindow.setAlwaysOnTop(!isChecked);
    },
  }, {
    type: 'separator',
  }, {
    label: '720 x 400 (16:9)',
    click: (menuItem, mainWindow) => {
      const isChecked = !menuItem.checked;

      mainWindow.setSize(720, 400, true);
    },
  }, {
    label: '1280 x 720 (16:9)',
    click: (menuItem, mainWindow) => {
      const isChecked = !menuItem.checked;

      mainWindow.setSize(1280, 720, true);
    },
  }, {
    label: '1920 x 1080 (16:9)',
    click: (menuItem, mainWindow) => {
      const isChecked = !menuItem.checked;

      mainWindow.setSize(1920, 1080, true);
    },
  }, {
    label: '800 x 600 (4:3)',
    click: (menuItem, mainWindow) => {
      const isChecked = !menuItem.checked;

      mainWindow.setSize(800, 600, true);
    },
  }, {
    label: '1024 x 768 (4:3)',
    click: (menuItem, mainWindow) => {
      const isChecked = !menuItem.checked;

      mainWindow.setSize(1024, 768, true);
    },
  }, {
    type: 'separator',
  }, {
    label: 'Show Inspector',
    accelerator: 'Command+Alt+I',
    click: (menuItem, mainWindow) => {
      mainWindow.webContents.openDevTools();
    },
  }],
}];

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    alwaysOnTop: true,
    frame: false,
    width: 720,
    height: 400
  })
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));

  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')
  mainWindow.loadURL('https://plex.tv/web');
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.insertCSS(`
      .nav-bar {
        -webkit-user-select: none;
        -webkit-app-region: drag;
      }
      .nav-bar a {
        -webkit-app-region: no-drag;
      }
    `);
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
