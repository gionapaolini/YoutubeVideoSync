window.onload = initialise;

function initialise() {
  document.querySelector("form").addEventListener("submit", submitFunction);
}

function submitFunction(event) {
  event.preventDefault();
  let idVideo = validateYouTubeUrl(event);
}



function validateYouTubeUrl(event){

  let input = document.querySelector("input");
  let url = input.value;
  if (url != undefined || url != '') {
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      var match = url.match(regExp);
      if (match && match[2].length == 11) {
          // Do anything for being valid
          // if need to change the url to embed url then use below line
          input.value = match[2];
          event.target.submit();

      }
      else {
          input.value = "";
      }
  }
}
