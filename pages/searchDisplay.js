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
    <span style="width:100%; position:sticky;top:0"><input placeholder="Search for an opportunity..." style="width:70%;"><button class="searchStart" style="width:15%;">&#x1f50d;</button><button class="clear" style="width:15%;">Clear</button></span>
        <div class="oppcards" style="display:flex; flex-direction:column; flex: 1 1 100vh;">
            <p>Loading...</p>
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
    this.div.querySelector(".searchStart").addEventListener("click", ()=>{
        this.searchFor(this.div.querySelector("input").value);
    })
    this.div.querySelector(".clear").addEventListener("click", ()=>{
        this.div.querySelector("input").value="";
        this.searchFor();
    })

    this.searchFor=function(term){
        if (term)this.div.querySelector("input").value=term;
        for (let i in oplist){
            let fullText=oplist[i].title+oplist[i].description;
            if (term){
                if (fullText.toLowerCase().includes(term.toLowerCase())){
                    this.div.querySelector("[data-id='"+i+"']").style.display="block";
                }else{
                    this.div.querySelector("[data-id='"+i+"']").style.display="none";
                }
            }else{
                this.div.querySelector("[data-id='"+i+"']").style.display="block";
            }
        }
    }
})