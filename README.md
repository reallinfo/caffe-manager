<p align="left"><img src="logo/horizontal.png" alt="caffe-manager" height="130px"></p>

# caffè-manager

Application which will help managing the coffe shop or a store.
- NodeJS, Electron, Express, MongoDB
- Server logs in the app

Press 'F1' to show the server log:

![Server-Log](screenshots/server-log.png)

## Dependencies

#### Before start: Please note that this approach is intended for use in Windows platform, any other OS approach would need some changes, contributions are very welcome :)

## First

Download `Node.exe` and `Node.lib`: [https://nodejs.org/dist/v7.2.1/win-x64/](https://nodejs.org/dist/v7.2.1/win-x64/)

After downloading a copy of this repository place those files in the root of the code folder. When the Electron app starts it will spawn the Express app using an external copy of Node. This allows the Express app to run outside the Electron process.

Here is a screenshot of the file layout:

![File-Layout](screenshots/file-layout.png)

## How to run

1. Clone or download the code repo
2. Open terminal to code repository
3. Make sure a copy of `Node.exe` and `Node.lib` are copied to the root of the code repo
4. Download and install MongoDB locally
5. Run `npm install` in the root "caffe-manager" and in the "express-app" folder to install all the dependencies
6. Run `npm start` in the root to start the application

:tada: :fireworks:

## Package with Electron-Packager

If you want to package this using `electron-packager` you'll need to
make the following changes:

In index.html (line ~65):

```javascript
app = require("electron").remote.app),
node = spawn(".\\node.exe", ["./express-app/bin/www"], {
  cwd: app.getAppPath()
});
```

This makes sure that the path to our local copy of `node.exe` is correct when we run electron to start the app.

That said, I'm assuming the platform is Windows. If other platforms are desirable additional changes are required.

**Electron-Packager Tutorial**
[https://www.christianengvall.se/electron-packager-tutorial/](https://www.christianengvall.se/electron-packager-tutorial/)

## Package with Electron-Packager (ASAR)

In this scenario you will not need to have Node.exe and Node.lib like the README states. Using `child_process.fork` instead of `child_process.spawn` allows our code to work in exactly the same way but Electron will be used to spawn a new process for the Express server instead of our copy of Node.

In `index.html` around line 64 change the code to:

```javascript
app = require('electron').remote.app,
node = require("child_process")
  .fork(`${app.getAppPath()}/express-app/bin/www`,
    [], {
      stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
    })
```

You can then package the code up using the command line:

```
electron-packager . --overwrite --platform=win32 --arch=x64 --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName=\"Electron-With-Express\" --asar
```

## Running on Linux

Download standalone distribution of Node:
[https://nodejs.org/dist/v9.4.0/node-v9.4.0-linux-x64.tar.gz](https://nodejs.org/dist/v9.4.0/node-v9.4.0-linux-x64.tar.gz)

Unpack it into the root of the cloned repository. Then create a symbolic link called 'node' at the same location.

```
ln -sf node-v9.4.0-linux-x64/bin/node node
```

Change line 65 in index.html to the following:

```javascript
node = spawn("./node", ["./express-app/bin/www"], { cwd: process.cwd() });
```

Then you can run it like this:

```
./node start-electron.js &
```

Or edit the scripts section in 'package.json' and change it to:

```json
  "scripts": {
    "start": "./node start-electron.js"
  },
```

Then run

```
npm start
```

## Running on OSX

- Download node binaries for OSX and extract the files.
- Copy the file called "node" into the root folder. There is no need of any other file (node.lib)

In **index.html** change the line
```
node = spawn(".\\node", ["./express-app/bin/www"], {
```
to
```
node = spawn("./node", ["./express-app/bin/www"], {
```

In **package.json** change the line
```
"start": ".\\node start-electron.js"
```
to
```
"start": "./node start-electron.js"
```

Then run

```
npm start
```

## License

GNU GPL v3 - see [LICENSE](LICENSE)
