// Ge a list of all current opportunities
//whack on a phat proxy
let selectedID=undefined;
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

document.addEventListener("DOMContentLoaded",function(){
    document.getElementById("sidebar").addEventListener("click",(e)=>{
        let t=e.target;
        while (t!=document.body){
            if (t.dataset.id){
                loadCard(document.getElementById("card"),t.dataset.id);
                selectedID=t.dataset.id;
                break;
            }
            t=t.parentElement;
        }
    })
    document.getElementById("savebtn").addEventListener("click",(e)=>{
        let fields=document.querySelectorAll("[data-role]");
        let saveobj={};
        for (let f=0;f<fields.length;f++){
            if (fields[f].value)saveobj[fields[f].dataset.role]=fields[f].value;
        }
        localfirage.dbroot.collection("usyd_initiative_events").doc(selectedID).update(saveobj);
    })
    document.getElementById("newEventButton").addEventListener("click", function(){
        localfirage.dbroot.collection("usyd_initiative_events").add({title:"New event"}).then(function(docref){
            selectedID=docref.id;
            loadCard(document.getElementById("card"),docref.id);
        });

    })
})

//fetch them all, all of them
localfirage.tieCollection(localfirage.dbroot.collection("usyd_initiative_events"), oplist);


function loadCard(div, id) {
    let card = oplist[id];
    for (let i in card) {
        switch (i) {
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