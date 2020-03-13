function navbar() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

var loc = 11;
var temp;
var cnt = 0;
var load = [
  [
    [0, 6, 0, 3, 0, 0, 8, 0, 4],
    [5, 3, 7, 0, 9, 0, 0, 0, 0],
    [0, 4, 0, 0, 0, 6, 3, 0, 7],
    [0, 9, 0, 0, 5, 1, 2, 3, 8],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [7, 1, 3, 6, 2, 0, 0, 4, 0],
    [3, 0, 6, 4, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 6, 0, 5, 2, 3],
    [1, 0, 2, 0, 0, 9, 0, 8, 0]
  ],
  [
    [0, 2, 0, 4, 5, 6, 7, 8, 9],
    [4, 5, 7, 0, 8, 0, 2, 3, 6],
    [6, 8, 9, 2, 3, 7, 0, 4, 0],
    [0, 0, 5, 3, 6, 2, 9, 7, 4],
    [2, 7, 4, 0, 9, 0, 6, 5, 3],
    [3, 9, 6, 5, 7, 4, 8, 0, 0],
    [3, 9, 6, 5, 7, 4, 8, 0, 0],
    [0, 4, 0, 6, 1, 8, 3, 9, 7],
    [7, 6, 1, 0, 4, 0, 5, 2, 8],
    [9, 3, 8, 7, 2, 5, 0, 6, 0]
  ]
];

// var cmp = "";
// cmp = parseInt(cmp);

// Loop to create 2D array using 1D array
var arr = new Array(9);
for (var i = 0; i < 9; i++) {
  arr[i] = new Array(9);
}

console.log(arr);

function getele() {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      arr[i][j] = document.getElementById(loc++).value;
      // console.log(arr[i][j]);
      if (loc % 10 == 0) {
        loc++;
      }
      if (arr[i][j] == "") {
        arr[i][j] = 0;
      }
    }
  }
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      arr[i][j] = parseInt(arr[i][j]);
    }
  }
  if (validate(arr)) solver(arr);
  else {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }
  console.log(arr);
}

function getelepp() {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      arr[i][j] = document.getElementById(loc++).value;
      // console.log(arr[i][j]);
      if (loc % 10 == 0) {
        loc++;
      }
      if (arr[i][j] == "") {
        arr[i][j] = 0;
      }
    }
  }
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      arr[i][j] = parseInt(arr[i][j]);
    }
  }

  if (validate(arr)) {
    // e1.addEventListener("click", paper(arr));
    paper(arr);
  } else {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }

  console.log(arr);
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      arr[i][j] = 0;
    }
  }
}

function isValid(arr, row, col, k) {
  for (let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const n = 3 * Math.floor(col / 3) + (i % 3);
    if (arr[row][i] == k || arr[i][col] == k || arr[m][n] == k) {
      return false;
    }
    // console.log(m, n);
  }
  return true;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function solver(arr) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (arr[i][j] == "0") {
        for (let k = 1; k <= 9; k++) {
          if (isValid(arr, i, j, k)) {
            arr[i][j] = k;
            var set = (i + 1) * 10 + j + 1;
            var x = document.getElementById(set);
            x.value = arr[i][j];
            // x.setAttribute("type", "number");
            // x.setAttribute("value", arr[i][j]);
            console.log(arr[i][j], set);
            await sleep(25);

            cnt++;

            if (await solver(arr)) {
              return true;
            } else {
              arr[i][j] = "0";
            }
            // console.log(cnt);
          }
        }
        return false;
      }
    }
  }
  return true;
}

var poss = new Array(9);
for (var i = 0; i < 9; i++) {
  poss[i] = new Array(9);
}

function paper(arr) {
  // getele(arr);
  // console.log(arr);
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      var temp = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ];
      if (arr[i][j] == "0") {
        for (let l = 0; l < 9; l++) {
          const m = 3 * Math.floor(i / 3) + Math.floor(l / 3);
          const n = 3 * Math.floor(j / 3) + (l % 3);

          for (let k = 1; k <= 9; k++) {
            if (arr[i][l] == k || arr[l][j] == k || arr[m][n] == k) {
              temp[k] = true;
              // console.log(k);
            }
          }
        }
      }
      poss[i][j] = temp;
    }
  }
  // console.log(load);
  papersolve();
}

async function papersolve() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (arr[i][j] == 0) {
        for (let l = 1; l < 10; l++) {
          if (poss[i][j][l] == false) {
            cnt = cnt + 1;
            temp = l;

            // console.log(cnt);
          }
        }
        if (cnt == 1) {
          arr[i][j] = temp;
          console.log("DENNNIIIS");
          console.log(temp);
          arr[i][j] = temp;
          var set = (i + 1) * 10 + j + 1;
          var x = document.getElementById(set);
          x.value = arr[i][j];
          await sleep(100);
        }
        cnt = 0;
      }
    }
  }
  await paper(arr);
}

// console.log(poss);
async function loadval() {
  r = Math.floor(Math.random() * load.length);
  console.log(r);
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      var set = (i + 1) * 10 + j + 1;
      var x = document.getElementById(set);
      x.value = load[r][i][j];
      await sleep(10);
      console.log(load[r][i][j]);
    }
  }
}

function aclear() {
  location.reload();
}

function validate(arr) {
  let count;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (arr[i][j] != 0) {
        for (let l = 0; l < 9; l++) {
          const m = 3 * Math.floor(i / 3) + Math.floor(l / 3);
          const n = 3 * Math.floor(j / 3) + (l % 3);
          if (
            arr[i][l] == arr[i][j] ||
            arr[l][j] == arr[i][j] ||
            arr[m][n] == arr[i][j]
          ) {
            if (count == 1) {
              console.log("Invalid");
              console.log(i, j, l, arr[i][j], arr[i][l], arr[l][j], arr[m][n]);
              return false;
            } else count++;
          }
        }
        // count = 0;
      }
    }
  }
  return true;
}