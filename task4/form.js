let validStreetName = false;
let validSuburbName = false;
let validPostcode = false;
let validDOB = false;


const validateStreetName = (name) => {
    const streetName = document.getElementById('streetName').value;

    if (!streetName || streetName.length < 3 || streetName.length > 50) {
        validStreetName = false;
    } else {
        validStreetName = true;
    }
}

const validateSuburbName = (name) => {
    const suburbName = document.getElementById('suburb').value;

    if (!suburbName || suburbName.length < 3 || suburbName.length > 50) {
        validSuburbName = false;
    } else {
        validSuburbName = true;
    }
}

const validatePostcode = () => {
    const postcode = document.getElementById('postcode').value;

    if (postcode.length == 4) {
        validPostcode = true;
    } else {
        validPostcode = false;
    }
}

const validateDOB = () => {
    const dob = document.getElementById('dob').value;
    var stringsplit = dob.split("/");
    let americandob = stringsplit[1]+"/"+stringsplit[0]+"/"+stringsplit[2];
    const regex_template = new RegExp("[0-9]{2}/[0-9]{2}/[0-9]{4}");
    if (Date.parse(americandob) != NaN && regex_template.test(dob) == true) {
        validDOB = true;
    } else {
        validDOB = false;
    }
}

const validatePage = () => {
    const form = document.getElementById('homes');
    const textarea = document.getElementById('textArea');

    const streetName = form.elements['streetName'].value;
    const suburbName = form.elements['suburb'].value;
    const postcode = form.elements['postcode'].value;
    const buildingtype = form.elements['buildings'].value;
    const dob = form.elements['dob'].value;

    validateStreetName();
    validateSuburbName();
    validatePostcode();
    validateDOB();

    // getting list of features
    var featurelist = []
    var features = ""
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked == true) {
            featurelist.push(checkboxes[i].name);
        } 
    }
    if (featurelist.length == 0) {
        features = "no features";
    }
    else if (featurelist.length == 1) {
        features = featurelist[0];
    } 
    else {
        for (let i = 0; i < featurelist.length; i++) {
            if (i == (featurelist.length-1)) {
                features = features + "and " + featurelist[i];
            } else {
                features = features + featurelist[i] + ", "
            }
        }
    }
    if (featurelist.length == 4) {
        document.querySelector('#selectallbutton').innerText = "Deselect All";
    } else {
        document.querySelector('#selectallbutton').innerText = "Select All";
    }
    
    if (validStreetName == false) {
        textarea.value = "Please enter a valid street name"
    } 
    else if (validSuburbName == false) {
        textarea.value = "Please enter a valid suburb"
    }
    else if (validPostcode == false) {
        textarea.value = "Please enter a valid postcode"
    }
    else if (validDOB == false) {
        textarea.value = "Please enter a valid date of birth"
    }
    else {
        // calculating current age
        var stringsplit = dob.split("/");
        var americandob = stringsplit[1]+"/"+stringsplit[0]+"/"+stringsplit[2];
        var birthdate = new Date(americandob);
        var currdate = new Date();
        const curragesecs = currdate.getTime() - birthdate.getTime();
        const currageyears = Math.floor(curragesecs / (1000 * 60 * 60 * 24 * 365.25))

        if (buildingtype == 'house') {
            textarea.value = "You are " + currageyears + " years old, and your address is " + streetName + " St, " + suburbName + ", " + postcode + ", Australia. Your building is a " + buildingtype + ", and it has " + features;
        } else {
            textarea.value = "You are " + currageyears + " years old, and your address is " + streetName + " St, " + suburbName + ", " + postcode + ", Australia. Your building is an " + buildingtype + ", and it has " + features;
        }
    }
}


const reset = () => {
    location.reload();
}

const selectall = () => {
    checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let flag = false;
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked == false) {
            flag = true;
        } 
    }
    if (flag == false) {
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;            
        }
    } else {
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true;            
        }
    }
    validatePage();
    return false;
}