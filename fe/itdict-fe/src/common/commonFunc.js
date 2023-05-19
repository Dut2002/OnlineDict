import moment from "moment";

export function onChangeValue(data, name, newValue) {
    var updateData = data;
    if (updateData) {
        updateData[name].value = newValue;
        updateData[name].error = '';
        updateData[name].help = '';
    }
    return updateData;
}

export function validateNullOrEmptyString(data, validateList) {
    var validateStatus = data ? true : false;
    var validateData = data;
    if (validateData) {
        for (var it of validateList) {
            if (validateData[it]?.value) {
                if (validateData[it]?.value.trim().length === 0) {
                    validateStatus &= false;
                    validateData[it].error = 'error';
                    validateData[it].help = 'This field is required.'
                }
            }
            else {
                validateStatus &= false;
                validateData[it].error = 'error';
                validateData[it].help = 'This field is required.'
            }
        }
    }
    return {
        isValid: validateStatus,
        data: validateData
    }
}

export function validateNullOrEmpty(data, validateList) {
    var validateStatus = data ? true : false;
    var validateData = data;
    if (validateData) {
        for (var it of validateList) {
            if (!validateData[it]?.value) {
                validateStatus &= false;
                validateData[it].error = 'error';
                validateData[it].help = 'This field is required.'
            }
        }
    }
    return {
        isValid: validateStatus,
        data: validateData
    }
}

export function initdata(orgData, newData, listParams) {
    if (!orgData) {
        orgData = {};
    }
    if (newData) {
        for (var i of listParams) {
            orgData[i] = {
                value: newData[i],
                error: '',
                help: ''
            }
        }
    } else {
        for (var it of listParams) {
            orgData[it] = {
                value: '',
                error: '',
                help: ''
            }
        }
    }
    return orgData;
}

export function mapdata(data, listParams) {
    var rsData = {};
    if (data) {
        for (var i of listParams) {
            rsData[i] = data[i]?.value;
        }
    }
    return rsData;
}

export function formatDate(date) {
    return date ? moment(date.$d).format('YYYY-MM-DD') : null;
}

export function checkPermission(key, screen) {
    var app = JSON.parse(localStorage.getItem('loginInfo'));
    if (app?.menu) {
        var link = app.menu.find(per => { return per.key === key; });
        if (link) {
            if (link?.screenPermission) {
                var pers = link.screenPermission.find(p => { return p.name === screen; });
                if (pers) {
                    return true;
                }
            }
        }
    }
    return false;
}

export function compare(orgData, newValue){
    var res = "";
    for(var i = 0; i <= orgData.length - 2; i++){
        if(orgData[i] !== newValue[i] && orgData[i+1] === newValue[i]){
            res = orgData[i];
        }
    }
    if(res === "" && orgData.length > newValue.length && orgData[orgData.length - 2] === newValue[newValue.length - 1]){
        res = orgData[orgData.length - 1];
    }
    return res;
}

export function validateImport(data, validateList) {
    var validateStatus = data ? true : false;
    var validateData = data;
    var loggedUser = JSON.parse(localStorage.getItem('loginInfo'))?.username;
    if (validateData) {
        for (var it of validateList) {
            if (validateData[it]) {
                if (validateData[it].trim().length === 0) {
                    validateStatus = false;
                }
            }
            else{
                validateStatus = false;
            }
        }
        validateData.createdBy = loggedUser;
        validateData.validate = validateStatus;
    }
    return {
        isValid: validateStatus,
        data: validateData
    }
}