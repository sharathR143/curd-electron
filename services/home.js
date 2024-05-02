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
    const headers = jsonFile[0];

    jsonFile.shift();

    const container = document.getElementById("file-view-container");
    const ListContainer = document.getElementById("file-list-container");

    container.innerHTML = "";
    let html = `<div onclick="back()">Back</div><table class="table">
            <thead><tr>`;
    headers.forEach((header) => {
      html += `<th>${header}</th>`;
    });

    html += `</tr></thead><tbody>`;

    jsonFile.forEach((rows) => {
      html += "<tr>";
      rows.forEach((row) => {
        html += `<td>${row ? row : "-"}</td>`;
      });
      html += "</tr>";
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

// const fs = require("fs");
// import fs from "fs";
// import path from "path";
// const path = require("path");
// console.log(path.join(__dirname, "..", "xlData"));

// const directoryPath = path.join(__dirname, "..", "xlData");
// const tbody = document.getElementById("filelist-body");
// console.log(directoryPath);
// fs.readdirSync(directoryPath).forEach((file, index) => {
//   console.log(file);
//   if (file) {
//     tbody.appendChild(`<tr>
//           <th>${index + 1}</th>
//           <td><a href="./component/file.html?filepath=${path.join(
//             directoryPath,
//             file
//           )}">${file}</a></td>
//         </tr>`);
//   }
// });
// export const text = "hello-world";
