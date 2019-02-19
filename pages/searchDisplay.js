navman.addpage('searchDisplay', function () {
    this.style = document.createElement("style");
    this.style.innerHTML = `
    .oppcards>div{
        margin: 0.5em;
        border-radius: 1em;
        padding: 1em;
        background:var(--box-back);
    }
    `;
    this.div = document.createElement("div");
    this.div.innerHTML = `
    <div style="display:flex; flex-direction:column; height:100%">
    <span style="width:100%"><input placeholder="Search for an opportunity..." style="width:70%;"><button class="searchStart" style="width:30%;">&#x1f50d;</button></span>
        <div class="oppcards" style="display:flex; flex-direction:column; flex: 1 1 100vh;">

        </div>
    </div>
    `;
    this.div.querySelector(".oppcards").addEventListener("click", function (e) {
            let t=e.target;
        while (t!=this.div){
            if (t.dataset.id){
                navman.navigateTo('searchSingletonCard',{id:t.dataset.id});
                break;
            }
            t=t.parentElement;
        }
        
    })
    this.addItem=function(itm){
        let d=document.createElement("div");
        d.innerHTML=`
        <h2>`+oplist[itm].title+`</h2>
        <p>`+oplist[itm].description+`</p>
        `;
        d.dataset.id=itm;
        this.div.querySelector(".oppcards").appendChild(d);
    }
    this.div.querySelector(".searchStart").addEventListener("click", ()=>{
        this.searchFor(this.div.querySelector("input").value);
    })

    this.searchFor=function(term){
        this.div.querySelector(".oppcards").innerHTML="";
        if (term)this.div.querySelector("input").value=term;
        for (let i in oplist){
            let fullText=oplist[i].title+oplist[i].description;
            if (term){
                if (fullText.toLowerCase().includes(term.toLowerCase())){
                    this.addItem(i);
                }
            }else{
                this.addItem(i);
            }
        }
    }
})