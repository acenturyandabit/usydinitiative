navman.addpage('searchSingletonCard', function () {
    this.div = document.createElement("div");
    this.div.innerHTML = `
<div class="topbar">
    <button class="back">Back</button>
    <h1>USYD INITIATIVE</h1>
<span></span>
</div>
    `+cardText;

    navman.on("transition", (args) => {
        if (args.dest == 'searchSingletonCard') {
            loadCard(this.div,args.data.id);
        }
    });

    this.div.querySelector("button.back").addEventListener("click", function () {
        navman.back();
    })
})