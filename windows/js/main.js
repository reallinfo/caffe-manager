const electron = require('electron');
const {ipcRenderer} = electron;

// Add Storage Windows

var btnCreateStorage = document.getElementById('btnCreateStorage');

btnCreateStorage.addEventListener('click', function(){
  alert('Click event is working!');
  // works
});
