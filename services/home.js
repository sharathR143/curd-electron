/*
let ExcelData = null;
document.addEventListener("DOMContentLoaded", (event) => {
  //   const files = [];
  window.versions.getFiles("get excel files");
  window.versions.getFileList((event, files) => {
    return generateFilesRows(files);
  });
});

function generateFilesRows(files) {
  const tbody = document.getElementById("filelist-body");

  let html = "";
  files.forEach((file, index) => {
    html += `<tr>
        <td>${index + 1}</td>
        <td onclick="readFile('${file.name}')">${file.name}</td>
      </tr>`;
  });
  tbody.insertAdjacentHTML("beforeend", html);
}

function readFile(fileName) {
  window.versions.sendFile(fileName);

  window.versions.getFile((event, jsonFile) => {
    ExcelData = jsonFile;
    // const headers = jsonFile[0];
    // jsonFile.shift();

    const container = document.getElementById("file-view-container");
    const ListContainer = document.getElementById("file-list-container");

    container.innerHTML = "";
    let html = `<div id='message'></div><div onclick="back()">Back</div><table class="table">
            <thead><tr>`;
    jsonFile[0].forEach((header) => {
      html += `<th>${header}</th>`;
    });

    html += `</tr></thead><tbody>`;

    jsonFile.forEach((row, rowIndex) => {
      if (rowIndex !== 0) {
        html += `<tr>`;
        row.forEach((column, columnIndex) => {
          html += `<td > <input onchange="readColumn(event,'${rowIndex}','${columnIndex}','${fileName}')" type="text" value="${
            column ? column : ""
          }" /></td>`;
        });
        html += "</tr>";
      }
    });

    html += `</tbody></table>`;
    ListContainer.classList.toggle("d-none");
    container.insertAdjacentHTML("beforeend", html);
    container.classList.toggle("d-none");
  });
}

function back() {
  const container = document.getElementById("file-view-container");
  const ListContainer = document.getElementById("file-list-container");

  ListContainer.classList.toggle("d-none");
  container.classList.toggle("d-none");
}
function readColumn(event, rowIndex, columnIndex, fileName) {
  //   console.log(event);
  //   console.log(rowIndex);
  //   console.log(columnIndex);
  let columnValue = event.target.value;
  if (columnValue !== "") {
    // console.log(ExcelData);
    // console.log(ExcelData[Number(rowIndex)]);
    // console.log(ExcelData[Number(rowIndex) + 1]);
    ExcelData[Number(rowIndex)][Number(columnIndex)] = columnValue;
    // console.log(ExcelData);
    window.versions.sendUpdatedData(ExcelData, fileName);
    window.versions.getUpdatedData((event, msg) => {
      document.getElementById("message").innerText = msg;
      //   alert(msg);
      console.log(msg);
    });
  }
}
*/

let ExcelData = null;
document.addEventListener("DOMContentLoaded", (event) => {
  //   const files = [];
  window.versions.getFiles("get excel files");
  window.versions.getFileList((event, files) => {
    return generateFilesRows(files);
  });
});

function generateFilesRows(files) {
  const tbody = document.getElementById("filelist-body");

  let html = "";
  files.forEach((file, index) => {
    html += `<tr>
        <td class="padding">${index + 1}</td>
        <td class="padding  hover"  onclick="readFile('${file.name}')">${file.name}</td>
      </tr>`;
  });
  tbody.insertAdjacentHTML("beforeend", html);
}

function readFile(fileName) {
  window.versions.sendFile(fileName);

  window.versions.getFile((event, jsonFile) => {
    ExcelData = jsonFile;
    // const headers = jsonFile[0];
    // jsonFile.shift();

    const container = document.getElementById("file-view-container");
    const ListContainer = document.getElementById("file-list-container");

    container.innerHTML = "";
    let html = ` <h1 class="data">EXCEL DATA</h1>
                 <div id='message'></div>
                 <div class="btn" onclick="back()">Back</div>
                 <table class="table">
                 <thead><tr>`;
    jsonFile[0].forEach((header) => {
      html += `<th class="padding  backgroundColor">${header}</th>`;
    });

    html += `</tr></thead><tbody>`;

    jsonFile.forEach((row, rowIndex) => {
      if (rowIndex !== 0) {
        html += `<tr>`;
        row.forEach((column, columnIndex) => {
          html += `<td class="border">
                   <input class="inputValue" onchange="readColumn(event,'${rowIndex}','${columnIndex}','${fileName}')" type="text" value="${
            column ? column : ""
          }" /></td>`;
        });
        html += "</tr>";
      }
    });

    html += `</tbody></table>`;
    ListContainer.classList.toggle("d-none");
    container.insertAdjacentHTML("beforeend", html);
    container.classList.toggle("d-none");
  });
}

function back() {
  const container = document.getElementById("file-view-container");
  const ListContainer = document.getElementById("file-list-container");

  ListContainer.classList.toggle("d-none");
  container.classList.toggle("d-none");
}
function readColumn(event, rowIndex, columnIndex, fileName) {
    console.log(event);
    console.log(rowIndex);
    console.log(columnIndex);
  let columnValue = event.target.value;
  if (columnValue !== "") {
    // console.log(ExcelData);
    // console.log(ExcelData[Number(rowIndex)]);
    // console.log(ExcelData[Number(rowIndex) + 1]);
    ExcelData[Number(rowIndex)][Number(columnIndex)] = columnValue;
    // console.log(ExcelData);
    window.versions.sendUpdatedData(ExcelData, fileName);
    window.versions.getUpdatedData((event, msg) => {
       document.getElementById("message").innerText = msg;
        // window.alert(msg);
      console.log(msg);
    });
  }
}

