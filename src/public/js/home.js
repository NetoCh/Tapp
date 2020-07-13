fetch('/getDestacados').then((response) => {
    response.json().then((data) => {
       console.log(data);
    })
})