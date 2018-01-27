const electron = require("electron");
const {app, BrowserWindow, Menu, ipcMain} = electron;

// SET ENV
// process.env.NODE_ENV = 'production';

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    show: false
  });
  // Show window after it is fully loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  //mainWindow.webContents.openDevTools();
  mainWindow.on("closed", function() {
    mainWindow = null;
  });
  // Build menu from mainMenuTemplate
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
};

app.on("ready", createMainWindow);

app.on("window-all-closed", function() {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  if (mainWindow === null) {
    createMainWindow();
  }
});

// Create menu template
const mainMenuTemplate = [
  {
    label: 'Items',
    submenu: [
      {
        label: 'Add Item',
        click(){
          createAddWindow();
        }
      },
      {
        label: 'Clear Items',
        click(){
          mainWindow.webContents.send('item:clear');
        }
      },
      {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' :
        'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  },
  {
    label: 'Storages',
    submenu: [
      {
        label: 'Create new storage',
        click(){
          createStorageWindow();
        }
      },
      {
        label: 'Delete all storages',
        click(){
          mainWindow.webContents.send('storage:delete');
        }
      }
    ]
  }
];

// If Mac, add empty object to menu to remove the empty space
if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({});
}

// Add developer tools item if not in production
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle DevTools',
        accelerator: process.platform == 'darwin' ? 'Command+I' :
        'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  });
}
