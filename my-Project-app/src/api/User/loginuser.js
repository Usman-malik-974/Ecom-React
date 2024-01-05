export default function CreateUser(userdata) {
    return new Promise(function (resolve, reject) {
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(userdata),
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            localStorage.setItem("token", data.token);
            if (data.status == 201) {
                resolve("user");
            }
            else if (data.status == 202) {
                resolve("seller");
            }
            else if (data.status == 500) {
                resolve();
            }
        }).catch(function (err) {
            reject(false);
        })
    })
}