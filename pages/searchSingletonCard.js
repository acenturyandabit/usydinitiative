navman.addpage('searchSingletonCard', function () {
    this.div = document.createElement("div");
    this.div.innerHTML = `
<div class="topbar" style="background: orange; position:sticky;top:0">
    <button style="width:unset" class="back">Back</button>
    <h1>USYD INITIATIVE</h1>
<span></span>
</div>
    `+cardText;
    if (isPhone()){
        this.style=document.createElement("style");
        this.style.innerHTML=`img{
            height:unset;
            width: 100%;
        }`
    }else{
        this.style=document.createElement("style");
        this.style.innerHTML=`img{
            height:40vh;
        }`
    }
    navman.on("transition", (args) => {
        if (args.dest == 'searchSingletonCard') {
            loadCard(this.div,args.data.id);
        }
    });

    this.div.querySelector("button.back").addEventListener("click", function () {
        navman.back();
    })
})