let form = document.getElementById("myform");
let model_name = form.dataset.model;
let model_id = form.dataset.id;
let inputs = document.querySelectorAll(".input");
let editor;

// initialise editor if exist on page
if (document.body.contains(document.getElementById("editor"))) {
    editor = Jodit.make('#editor');
    editor.value = document.getElementById("editor").dataset.val;
}



var data = new FormData();

// update form handler
let callbackPost = (d) => {
    if(d.success) {
        notification.show(d.success,"success");
    }else if (d.error) {
        notification.show(d.error,"error");
    }
    data = new FormData();
}


inputs.forEach((input) => {
    input.addEventListener("change",(e) => {
        e.preventDefault();
        if (input.type == "file") {
            if (input.files) {
                data.append(input.getAttribute("name"),input.files[0]);
            }
        } else if (input.type == "checkbox") {
            if (input.checked) {
                data.append(input.getAttribute("name"),1)
            } else {
                data.append(input.getAttribute("name"),0)
            }
        } else {
            data.append(input.getAttribute("name"),input.value)
        }
    })
})

form.addEventListener("submit",(e) => {
    e.preventDefault();
    if (editor != null) {
        let name = document.getElementById("editor").dataset.key;
        data.append(name,editor.value)
    } 
    data.append("table",model_name);
    data.append("row_id",model_id);
    postFormData(`/admin/update/row`,data,callbackPost);
})



