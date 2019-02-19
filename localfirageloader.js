// Ge a list of all current opportunities
var oplist = new Proxy({}, {
    set: function (obj, prop, value) {
        if (document.body.querySelector(".oppcards>p"))document.body.querySelector(".oppcards>p").remove();
        //Add the browse entry
        let div = navman.pages["searchDisplay"].div.querySelector("[data-id='" + prop + "']");
        if (!div) {
            div = document.createElement("div");
            div.dataset.id = prop;
            navman.pages["searchDisplay"].div.querySelector(".oppCards").appendChild(div);
        }
        obj[prop] = value;
        div.innerHTML = `
        <h2>` + value.title + `</h2>
        <p>` + value.brief + `</p>
        `;
    },
    deleteProperty: function (target, prop) {
        navman.pages["searchDisplay"].div.querySelector("[data-id='" + prop + "']").remove();
        delete target[prop];
    }
});
//fetch them all, all of them
localfirage.tieCollection(localfirage.dbroot.collection("usyd_initiative_events"), oplist);



function loadCard(div, id) {
    let card = oplist[id];
    if (!card["image"]) {
        div.querySelector("[data-role='image']").src = "resources/noimg.png";
    }
    //Hide unset properties
    let dr = div.querySelectorAll("[data-role]")
    for (let i = 0; i < dr.length; i++) {
        dr[i].parentElement.style.display = "none";
    }

    for (let i in card) {
        switch (i) {
            case "image":
                div.querySelector("img").src = card[i];
            default:
                try {
                    div.querySelector("[data-role='" + i + "']").innerText = card[i];
                    div.querySelector("[data-role='" + i + "']").parentElement.style.display = "block";
                } catch (e) {
                    console.log("no field:" + i);
                }
                break;
        }
    }
}

var cardText = `
<div class="card">
<h1 data-role="title">Title of opportunity</h1>
<img data-role="image" src="resources/noimg.png">
<div class="filterInfo">
    <p>Commitment:  <span data-role="commitment"></span></p>
    <p>Competition based:  <span data-role="competition">YES/NO</span></p>
    <p>University Endorsed:  <span data-role="uni_endorsed">YES/NO</span></p>
    <p>Industry sponsored / endorsed:  <span data-role="industry_endorsed">YES/NO</span></p>
    <!--Could potentially lead to a job opportunity or good networking contacts-->
    <p>Claimable as PEP Engineering Hours:  <span data-role="PEP_claimable">YES/MAYBE/NO</span></p>
    <!--<p>Tags:</p>
    <div class="tagbubbles">
        <span>Potato</span>
        <span>Tomato</span>
    </div>-->
</div>
<div>
<h2>Brief</h2>
<p data-role="description" >Description of the opportunityyy Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
    sodales
    nunc vitae ante ullamcorper malesuada. Nulla ultricies auctor aliquam.
    Sed a tristique lacus. Nunc sed faucibus eros. Praesent eu elit tortor.
    Integer dignissim magna vel nulla tempor, non egestas dui imperdiet.
    Cras lacinia tincidunt enim, et laoreet magna rutrum vitae. Nam eros
    nisi, gravida ut mi id, ullamcorper porta nunc. Praesent ornare mi lacus,
    sollicitudin fringilla neque pulvinar nec. Ut nec dapibus ipsum. Aliquam
    cursus vehicula est, id vulputate sem tincidunt eget. Nulla et eros
    ornare, condimentum ante eget, feugiat ante.</p>
    </div>
    <div>
<h2>Contact details</h2>
<p data-role="contacts">
    Email boatymcboatperson@gmail.com
    Message us on facebook
    Attend our weekly meetings at Wed 12:00 in civil eng!
</p>
</div>
</div>`;