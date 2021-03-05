let validStreetName = false;
let validSuburbName = false;
let validPostcode = false;
let validDOB = false;


const validateStreetName = () => {
    const streetName = document.getElementById('streetName').value;

    if (!streetName || streetName.length < 3 || streetName.length > 50) {
        validStreetName = false;
    } else {
        validStreetName = true;
    }
}

const validateSuburbName = () => {
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
    var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

    var stringsplit = dob.split("/");
    let americanDOB = stringsplit[1]+"/"+stringsplit[0]+"/"+stringsplit[2];
    const regex_template = new RegExp("[0-9]{2}/[0-9]{2}/[0-9]{4}");

    // checking that the inputted date is valid
    if (Date.parse(americanDOB) != NaN && regex_template.test(dob) == true) {
        validDOB = true;
    } else {
        validDOB = false;
    }
    
    if (!(dob.match(dateformat))) {
        validDOB = false;
    }
}

const validatePage = () => {
    const form = document.getElementById('homes');
    const textarea = document.getElementById('textArea');

    const streetName = form.elements['streetName'].value;
    const suburbName = form.elements['suburb'].value;
    const postcode = form.elements['postcode'].value;
    const buildingType = form.elements['buildings'].value;
    const dob = form.elements['dob'].value;

    validateStreetName();
    validateSuburbName();
    validatePostcode();
    validateDOB();

    // getting list of selected features
    var featureList = []
    var features = ""
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked == true) {
            featureList.push(checkboxes[i].name);
        } 
    }
    if (featureList.length == 0) {
        features = "no features";
    }
    else if (featureList.length == 1) {
        features = featureList[0];
    } 
    else {
        for (let i = 0; i < featureList.length; i++) {
            if (i == (featureList.length-1)) {
                features = features + "and " + featureList[i];
            } else {
                features = features + featureList[i] + ", ";
            }
        }
    }

    // changing select button text
    if (featureList.length == 4) {
        document.querySelector('#selectallbutton').innerText = "Deselect All";
    } else {
        document.querySelector('#selectallbutton').innerText = "Select All";
    }
    
    // inputting text based on entered values
    if (validStreetName == false) {
        textarea.value = "Please enter a valid street name";
    } 
    else if (validSuburbName == false) {
        textarea.value = "Please enter a valid suburb";
    }
    else if (validPostcode == false) {
        textarea.value = "Please enter a valid postcode";
    }
    else if (validDOB == false) {
        textarea.value = "Please enter a valid date of birth";
    }
    else {
        // calculating current age
        var stringsplit = dob.split("/");
        var americanDOB = stringsplit[1]+"/"+stringsplit[0]+"/"+stringsplit[2];
        var birthdate = new Date(americanDOB);
        var currdate = new Date();
        const currAgeSecs = currdate.getTime() - birthdate.getTime();
        const currAgeYears = Math.floor(currAgeSecs / (1000 * 60 * 60 * 24 * 365.25))

        if (buildingType == 'house') {
            textarea.value = "You are " + currAgeYears + " years old, and your address is " + streetName + " St, " + suburbName + ", " + postcode + ", Australia. Your building is a " + buildingType + ", and it has " + features;
        } else {
            textarea.value = "You are " + currAgeYears + " years old, and your address is " + streetName + " St, " + suburbName + ", " + postcode + ", Australia. Your building is an " + buildingType + ", and it has " + features;
        }
    }
}

const reset = () => {
    location.reload();
}

const selectAll = () => {
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