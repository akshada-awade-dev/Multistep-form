
function savedData1() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userData = {
        email: email,
        password: password
    };
    localStorage.setItem('user', JSON.stringify(userData));
    console.log(email + " " + password + " ");
}

function savedData2() {
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const zipcode = document.getElementById('zipcode').value;

    const addressData = {
        address: address,
        city: city,
        zipcode: zipcode
    };
    localStorage.setItem('address', JSON.stringify(addressData));
    console.log(address + " " + city + " " + zipcode);
}

function savedData3() {
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const phone = document.getElementById('phone').value;

    const personalData = {
        fname: fname,
        lname: lname,
        phone: phone
    };
    localStorage.setItem('personal', JSON.stringify(personalData));
    console.log(fname + " " + lname + " " + phone);


}   
