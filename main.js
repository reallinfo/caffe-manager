const electron = require('electron');
const {app, BrowserWindow, Menu} = electron;

// SET ENV
// process.env.NODE_ENV = 'production';

let mainWindow;

app.on('ready', function(){
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    resizable: false,
    show: false
  });
  // Show window after it is fully loaded
  mainWindow.once('ready-to-show', function() {
    mainWindow.show();
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  //mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function() {
    mainWindow = null;
    app.quit();
  });
  // Build menu from mainMenuTemplate
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
});

// Create menu template
const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        role: 'reload'
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
      }
    ]
  });
}
