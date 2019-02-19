// Ge a list of all current opportunities
//whack on a phat proxy
let selectedID = undefined;
var oplist = new Proxy({}, {

    set: function (obj, prop, value) {
        //value in this case will be an object
        obj[prop] = value;
        //add a div to the sidebar if it does not exist.
        if (document.body.querySelector("[data-id='" + prop + "']")) {
            let p = document.body.querySelector("[data-id='" + prop + "']")
            p.innerHTML = `<h3>` + value.title + `</h3>
            <p>` + prop + `</p>`;
            p.dataset.id = prop;
        } else {
            let p = document.createElement("div");
            p.innerHTML = `<h3>` + value.title + `</h3>
            <p>` + prop + `</p>`;
            p.dataset.id = prop;
            document.getElementById("sidebar").prepend(p);

        }
    }
})

// Create a root reference
var storageRef = firebase.storage().ref();




document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener("keydown",function(e){
        if (e.target.matches("input,textarea"))document.querySelector("#card").style.background="yellow";
    })

    document.body.addEventListener("change",function(e){
        document.querySelector("#card").style.background="yellow";
    })
    document.getElementById("sidebar").addEventListener("click", (e) => {
        let t = e.target;
        while (t != document.body) {
            if (t.dataset.id) {
                loadCard(document.getElementById("card"), t.dataset.id);
                selectedID = t.dataset.id;
                enableAll();
                break;
            }
            t = t.parentElement;
        }
        document.querySelector("#card").style.background="lightgreen";
    })
    document.getElementById("savebtn").addEventListener("click", (e) => {
        let fields = document.querySelectorAll("[data-role]");
        let saveobj = {};
        for (let f = 0; f < fields.length; f++) {
            if (fields[f].value) saveobj[fields[f].dataset.role] = fields[f].value;
        }
        localfirage.dbroot.collection("usyd_initiative_events").doc(selectedID).update(saveobj);
        //Upload the image
        if (document.querySelector("input[type='file']").files.length) {
            // Create a reference to 'mountains.jpg'
            let name = selectedID;
            let bits = document.querySelector("input[type='file']").files[0].name.split(".");
            name += bits[bits.length - 1];
            let cimref = storageRef.child(name);
            cimref.put(document.querySelector("input[type='file']").files[0]).then((ref) => {
                cimref.getDownloadURL().then((url) => {
                    localfirage.dbroot.collection("usyd_initiative_events").doc(selectedID).update({
                        image: url
                    });
                });
            });
        }
        document.querySelector("#card").style.background="lightgreen";
    })

    document.getElementById("deletebutton").addEventListener("click", (e) => {
        if (confirm("Are you sure you want to delete this? It cannot be recovered!")) {
            localfirage.dbroot.collection("usyd_initiative_events").doc(selectedID).delete();
            //Upload the image
            document.querySelector("[data-id='" + selectedID + "']").remove();
            disableAll();
        }
    })

    document.getElementById("newEventButton").addEventListener("click", function () {
        localfirage.dbroot.collection("usyd_initiative_events").add({
            title: "New event"
        }).then(function (docref) {
            selectedID = docref.id;
            loadCard(document.getElementById("card"), docref.id);
        });
    })
    document.body.querySelector("input[type='file']").addEventListener("change", function (e) {
        let input = e.target;
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                document.querySelector("img").src = e.target.result;
            };
            reader.readAsDataURL(input.files[0]);
        }
    })
    disableAll();
})

//fetch them all, all of them
localfirage.tieCollection(localfirage.dbroot.collection("usyd_initiative_events"), oplist);

function disableAll() {
    let els = document.querySelectorAll("input,button");
    for (let i = 0; i < els.length; i++) {
        els[i].disabled = true;
    }
}

function enableAll() {
    let els = document.querySelectorAll("input,button");
    for (let i = 0; i < els.length; i++) {
        els[i].disabled = false;
    }
}

function loadCard(div, id) {
    let card = oplist[id];
    if (!card["image"]) {
        div.querySelector("img").src = "";
    }
    let ins = document.querySelectorAll("input,textarea");
    for (let i = 0; i < ins.length; i++) {
        ins[i].value = "";
    }
    for (let i in card) {
        switch (i) {
            case "image":
                div.querySelector("img").src = card[i];
                break;
            default:
                try {
                    div.querySelector("[data-role='" + i + "']").value = card[i];
                } catch (e) {
                    console.log("no field:" + i);
                }
                break;
        }

    }
}