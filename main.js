window.onload = createToastParent();
function createToastParent() {
  let toastParent = document.createElement("DIV");
  toastParent.id = "toastParent";
  toastParent.className = "toastParent";
  // body.style.position = "relative";
  document.body.appendChild(toastParent);
}
var Timer = function (callback, delay) {
  var timerId,
    start,
    remaining = delay;

  this.pause = function () {
    window.clearTimeout(timerId);
    remaining -= Date.now() - start;
  };

  this.resume = function () {
    start = Date.now();
    window.clearTimeout(timerId);
    timerId = window.setTimeout(callback, remaining);
  };

  this.resume();
};
function closeToast(ID) {
  document.getElementById(ID).removeEventListener("mouseenter", () => {});
  document.getElementById(ID).removeEventListener("mouseleave", () => {});
  document.getElementById(ID).style.opacity = "0";
  setTimeout(() => {
    var element = document.getElementById(ID);
    element.parentNode.removeChild(element);
  }, 300);
}
function showToast(status, message, timeout) {
  var ID = "toast" + parseInt(Math.random() * 10 * 10 * 10 * 10 * 10),
    customToast = document.createElement("DIV"),
    row = document.createElement("DIV"),
    colAuto = document.createElement("DIV"),
    toastStat = document.createElement("SPAN"),
    i = document.createElement("I"),
    col9 = document.createElement("DIV"),
    col1 = document.createElement("DIV"),
    span = document.createElement("SPAN"),
    strong = document.createElement("STRONG"),
    p = document.createElement("P"),
    button = document.createElement("BUTTON");
  const timer = new Timer(
    function () {
      closeToast(ID);
    },
    timeout ? timeout : 3000
  );
  customToast.addEventListener("mouseenter", () => timer.pause());
  customToast.addEventListener("mouseleave", () => timer.resume());
  customToast.className = "customToast" + " " + status;
  row.className = "row no-gutters body";
  colAuto.className = "col-2 justCenter pr-2";
  toastStat.className = "toastStat justCenter";
  if (status === "warning") {
    i.className = "fas fa-exclamation";
    strong.innerHTML = "Warning";
  } else if (status === "error") {
    i.className = "fas fa-times";
    strong.innerHTML = "Error";
  } else if (status === "success") {
    i.className = "fas fa-check";
    strong.innerHTML = "Success";
  }
  col9.className = "col-9 p-2";
  p.className = "message";
  p.innerHTML = message;
  col1.className = "col-1 justCenter";
  button.className = "btn times";
  span.innerHTML = "&times;";
  customToast.id = ID;
  button.appendChild(span);
  button.onclick = function (event) {
    closeToast(ID);
  };
  col1.appendChild(button);
  col9.appendChild(strong);
  col9.appendChild(p);
  toastStat.appendChild(i);
  colAuto.appendChild(toastStat);
  row.appendChild(colAuto);
  row.appendChild(col9);
  row.appendChild(col1);
  customToast.appendChild(row);
  document.getElementById("toastParent").appendChild(customToast);
}