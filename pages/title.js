navman.addpage('title', function () {
    this.style = document.createElement("style");
    let styletext = `
    .marquee{
        overflow:hidden;
        display:flex;
        width: 100vw;
        flex: 0 1 18em;
    }
    .marquee>div{
        width: 100em;
        animation:scroll 30s linear infinite;
        position:relative;
    }
    
    .marquee>div>*{
        float:left;
        display:flex;
    }

    /* Make it move */
    @keyframes scroll{
    0% {left:100vw;}
    100% {left:-100vw;}
    }

    .marquee>div>div{
        border-radius: 1em;
        background: var(--box-back);
        margin: 40px;
        width: 15em;
        height: 15em;
    }
    `;

    if (isPhone()) {
        styletext += `
        .titlesearch{
            width:100%
        }
    `;
    }else{
        styletext += `
        .titlesearch{
            width:40%
        }
    `;  
    }
    this.style.innerHTML = styletext;
    this.div = document.createElement("div");
    this.div.style.cssText = ``;
    this.div.innerHTML = `
    <div style="display:flex; justify-content: center; flex-direction: column; height:100%; text-align:center; align-items: center">
        <h1>Welcome to the USYD Engineering Initiative Search!</h1>
        <div class="marquee">
            <div>
                <div style="background-image:someurl">
                    <h2>RobotX</h2>
                </div>
                <div style="background-image:someurl">
                    <h2>VIVID</h2>
                </div>
                <div style="background-image:someurl">
                    <h2>Angry Birds AI challenge</h2>
                </div>
            </div>
        </div>
        <span class="titleSearch"><input placeholder="Search for an opportunity..." style="width:70%;"><button class="searchStart" style="width:30%;">&#x1f50d;</button></span>
        <button class="browse">Browse all opportunities</button>
        <h3>Have we met?</h3>
        <button>Login</button>
    </div>
    `;
    let me = this;
    this.div.querySelector(".searchStart").addEventListener("click", () => {
        navman.pages["searchDisplay"].searchFor(me.div.querySelector("input").value);
        navman.navigateTo("searchDisplay");
    })

    this.div.querySelector(".browse").addEventListener("click", function (e) {
        navman.pages["searchDisplay"].searchFor();
        navman.navigateTo('searchDisplay');
    })
})

navman.navigateTo("title");