window.onload = initialise;

function initialise() {
  document.querySelector("form").addEventListener("submit", submitFunction);
}

function submitFunction(event) {
  event.preventDefault();
  let input = document.querySelector("input");
  let idVideo = getIDvideoFromUrl(input.value);
  input.value = idVideo;
  event.target.submit();
}


function getIDvideoFromUrl(url) {
  let strings = url.split("=");
  return strings[strings.length-1];
}
