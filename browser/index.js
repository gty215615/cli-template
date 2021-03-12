

const xhr = new XMLHttpRequest()

function log(num) {
    console.log('JSONP is running!');
    console.log(num);
}

xhr.open('get','/jsonp')

xhr.send()

xhr.onreadystatechange = function (res) {
  if(xhr.readyState === 4){
     if(xhr.status === 200){
         console.log(xhr);
         console.log(xhr.responseText);
        eval(xhr.responseText)
     }
  }
}