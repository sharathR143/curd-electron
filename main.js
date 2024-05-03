/*
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

    win.webContents.send("send-file", jsonData);
  });

  ipcMain.on("get-updatedData", (event, jsondata, fileName) => {
    const directoryPath = path.join(__dirname, "xlData", fileName);

    const workbook = XLSX.readFile(directoryPath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    // const headers = jsonData[0];
    // console.log("Headers:", headers);
    // jsonData.shift();

    // Specify the row number you want to modify
    // const specificRowIndex = 2;
    // let specificRowData = jsonData[specificRowIndex - 1];
    // specificRowData[1] = "Akash";
    // console.log("ROW", specificRowData);
    try {
      XLSX.utils.sheet_add_aoa(sheet, jsondata);
      XLSX.writeFile(workbook, directoryPath);
      win.webContents.send("send-updatedData", "successfully updated..");
    } catch (error) {
      win.webContents.send("send-updatedData", "failed..");
    }
    // console.log(jsondata);
  });

  win.loadFile("index.html");
  //win.webContents.openDevTools();
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

*/


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

    win.webContents.send("send-file", jsonData);
  });

  ipcMain.on("get-updatedData", (event, jsondata, fileName) => {
    const directoryPath = path.join(__dirname, "xlData", fileName);

    const workbook = XLSX.readFile(directoryPath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    // const headers = jsonData[0];
    // console.log("Headers:", headers);
    // jsonData.shift();
    try {
      XLSX.utils.sheet_add_aoa(sheet, jsondata);
      XLSX.writeFile(workbook, directoryPath);
      win.webContents.send("send-updatedData", "successfully updated..");
    } catch (error) {
      win.webContents.send("send-updatedData", "failed..");
    }
    // console.log(jsondata);
  });

  win.loadFile("index.html");
  //win.webContents.openDevTools();
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
