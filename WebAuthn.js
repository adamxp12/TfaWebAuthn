var Tfa_count = 1;

function TfaWebAuthn_addkey() {
    var createDataRaw = document.getElementById('TfaWebAuthn_createData').value;
    var regdata = document.getElementById('TfaWebAuthn_regdata');

    var json = JSON.parse(createDataRaw);
    
    recursiveBase64StrToArrayBuffer(json);
    
    navigator.credentials.create(json).then(function(f) {
        console.log(f);

        var data = {
            clientDataJSON: f.response.clientDataJSON  ? arrayBufferToBase64(f.response.clientDataJSON) : null,
            attestationObject: f.response.attestationObject ? arrayBufferToBase64(f.response.attestationObject) : null
        };

        if(regdata.value === "") {
            regdata.value = JSON.stringify(data);
            document.getElementById('TfaWebAuthn_msg').textContent = 'Credential added. You can add more now or save this page to finish setup';
        } else {
            regdata.value = regdata.value+", "+JSON.stringify(data);
            document.getElementById('TfaWebAuthn_msg').textContent = 'Credential '+Tfa_count+' added. You can add even more or save this page to finish setup';
        }    
        Tfa_count++;
        document.getElementById('TfaWebAuthn_button').classList.remove('ui-state-active');  

        console.log(regdata.value);
    });

}

function TfaWebAuthn_authKey() {
    var authreq = JSON.parse(document.getElementById('TfaWebAuthn_authreq').value);
    recursiveBase64StrToArrayBuffer(authreq);
    navigator.credentials.get(authreq).then(function(f){

        var data =  {
            id: f.rawId ? arrayBufferToBase64(f.rawId) : null,
            clientDataJSON: f.response.clientDataJSON  ? arrayBufferToBase64(f.response.clientDataJSON) : null,
            authenticatorData: f.response.authenticatorData ? arrayBufferToBase64(f.response.authenticatorData) : null,
            signature: f.response.signature ? arrayBufferToBase64(f.response.signature) : null,
            userHandle: f.response.userHandle ? arrayBufferToBase64(f.response.userHandle) : null
        };

        console.log(data);
        document.getElementById('TfaWebAuthn_error').style.display = "none";
        document.getElementById('TfaWebAuthn_authresponse').value = JSON.stringify(data);
        document.getElementById('tfaform').submit();
    }).catch(function(err) {
        document.getElementById('TfaWebAuthn_error').textContent = "authentication failed with error: " + err;
        document.getElementById('TfaWebAuthn_error').style.display = "block";
    });
}





function recursiveBase64StrToArrayBuffer(obj) {
    let prefix = '=?BINARY?B?';
    let suffix = '?=';
    if (typeof obj === 'object') {
        console.log("object");
        for (let key in obj) {
            if (typeof obj[key] === 'string') {
                let str = obj[key];
                if (str.substring(0, prefix.length) === prefix && str.substring(str.length - suffix.length) === suffix) {
                    str = str.substring(prefix.length, str.length - suffix.length);

                    let binary_string = window.atob(str);
                    let len = binary_string.length;
                    let bytes = new Uint8Array(len);
                    for (let i = 0; i < len; i++)        {
                        bytes[i] = binary_string.charCodeAt(i);
                    }
                    obj[key] = bytes.buffer;
                }
            } else {
                recursiveBase64StrToArrayBuffer(obj[key]);
            }
        }
    }
}

function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa(binary);
}