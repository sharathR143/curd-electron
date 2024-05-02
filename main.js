const { app, BrowserWindow, ipcMain } = require("electron/main");
const path = require("node:path");
const fs = require("node:fs");
const XLSX = require("xlsx");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ipcMain.on("get-files", (event, title) => {
    let files = [];
    const directoryPath = path.join(__dirname, "xlData");

    fs.readdirSync(directoryPath).forEach((file, index) => {
      if (file) {
        files.push({
          name: file,
          path: directoryPath,
        });
      }
    });

    win.webContents.send("send-files", files);
  });

  ipcMain.on("get-file", (event, fileName) => {
    const directoryPath = path.join(__dirname, "xlData", fileName);

    const workbook = XLSX.readFile(directoryPath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // const headers = jsonData[0];
    // console.log("Headers:", headers);

    // jsonData.shift();
    win.webContents.send("send-file", jsonData);
  });

  win.loadFile("index.html");
  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
