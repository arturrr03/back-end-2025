fetch("http://127.0.0.1:3000/about",{method: "PUT"})
.then(res => res.json())
.then((json)=> console.log(json));
