export default function CreateUser(userdata){
    return new Promise(function(resolve,reject){
        fetch("http://localhost:3000/signup",{
            method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(userdata),
    }).then(function(response){
        // console.log(response.status);
        if(response.status!==200){
            throw new Error("something went wrong");
         }
        return response.json();
     }).then(function(data){
        resolve(data);
    }).catch(function(err){
        reject(false);
    })
})
}