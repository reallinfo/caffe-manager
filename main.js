const electron = require("electron");
const {app, BrowserWindow, Menu, ipcMain} = electron;

// SET ENV
// process.env.NODE_ENV = 'production';

let mainWindow;
let addUserWindow;
let addStorageWindow;

app.on("ready", function(){
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
    app.quit();
  });
  // Build menu from mainMenuTemplate
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
});

app.on("activate", function() {
  if (mainWindow === null) {
    createMainWindow();
  }
});

// Create menu template
const mainMenuTemplate = [
  {
    label: 'Admin',
    submenu: [
      {
        label: 'Add new user',
        click(){
          createAddUserWindow();
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
      }
    ]
  }
];

// Handle Add Window
function createAddUserWindow() {
  // Create new window
  addUserWindow = new BrowserWindow({
    title: 'Add new user',
    width: 400,
    height: 300,
    // frame: false,
    show: false,
    alwaysOnTop: true
  });
  // Show window after it is fully loaded
  addUserWindow.once('ready-to-show', () => {
    addUserWindow.show();
  });
  // Load html into addUserWindow
  addUserWindow.loadURL(`file://${__dirname}/windows/addUserWindow.html`);
  // Garbage collection handle
  addUserWindow.on('close', function(){
    addUserWindow = null;
  });
  addUserWindow.setMenu(null);
}

// Handle Storage Window
function createStorageWindow(){
  // Create new window
  addStorageWindow = new BrowserWindow({
    title: 'Create storage',
    width: 400,
    height: 300,
    maximizable: false,
    alwaysOnTop: true,
    // frame: false,
    show: false,
    alwaysOnTop: true
  });
  // Show window after it is fully loaded
  addStorageWindow.once('ready-to-show', () => {
    addStorageWindow.show();
  });
  // Load html into addStorageWindow
  addStorageWindow.loadURL(`file://${__dirname}/windows/addStorageWindow.html`);
  // Garbage collection handle
  addStorageWindow.on('close', function(){
    addWindow = null;
  });
  addStorageWindow.setMenu(null);
}

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
