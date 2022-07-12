let csrftoken;
if (document.getElementById("csrf_token")) {
    csrftoken = document.getElementById("csrf_token").value;
}

function postData(url, js_object, givenfunction) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    if (csrftoken != null) {
        xhr.setRequestHeader('X-CSRF-Token',csrftoken);
    } 
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.onload = function(){
        if(this.status >= 200 && this.responseText){
            let data;
            try {
                data = JSON.parse(this.responseText);
            } catch (error) {
                console.error("error from postData catch:",error);
                data = this.responseText
            }   
            if(givenfunction){
                givenfunction(data);
            }else {
                console.log('no callback has been provided')
            }
        } 
    };

    xhr.onerror = (e) => {
        data_error = {"error" : e,
                      "error specification": "TRY TO CHECK URL IF VALID"};
        givenfunction(data_error);
    };

    //change JS object to JSON( here it's already json)
    data_json = JSON.stringify(js_object);
    xhr.send(data_json);
}

function postFormData(url, form_data, givenfunction) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    if (csrftoken != null) {
        xhr.setRequestHeader('X-CSRF-Token',csrftoken);
    } 
    xhr.onload = function(){
        if(this.status >= 200){
            let data;
            try {
                data = JSON.parse(this.responseText);
            } catch (error) {
                console.error("error from postData catch:",error);
                data = this.responseText
            }   
            if(givenfunction){
                givenfunction(data);
            }else {
                console.log('no callback has been provided')
            }
        } 
    }
    xhr.onerror = (e) => {
        data_error = {"error" : e,
                      "error specification": "TRY TO CHECK URL IF VALID"};
        givenfunction(data_error);
    }

    xhr.send(form_data);
}

function getData(url, givenfunction) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function(){
        if(this.status >= 200 && this.status < 300) {
            data = JSON.parse(xhr.responseText);
            if(givenfunction){
                if(typeof givenfunction === 'function'){
                    givenfunction(data);
                }
            }
        }else {
            console.error('Error getting the data !');
            data={"error":"Error getting the data !"};
            givenfunction(data);
        }
    }
    xhr.onerror = (e) => {
        data_error = {"error" : e,
                      "error specification": "TRY TO CHECK URL IF VALID"};
        givenfunction(data_error);
    }
  xhr.send();
}


function bind(fieldID,formObject) {
    let input = document.getElementById(fieldID);
    Object.defineProperty(formObject,fieldID,{
        get() {
            return input.value;
        },
        set(value) {
            input.value=value;
        }
    });
}


function elementFromHtml(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
}