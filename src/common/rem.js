
function setRem() {
  let htmlDom = document.getElementsByTagName("html")[0];
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  htmlDom.style.fontSize = htmlWidth / 100 + "px";
}
