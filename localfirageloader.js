// Ge a list of all current opportunities
var oplist = {};
//fetch them all, all of them
localfirage.tieCollection(localfirage.dbroot.collection("usyd_initiative_events"), oplist);


function loadCard(div, id) {
    let card = oplist[id];
    for (let i in card) {
        switch (i) {
            default:
                try {
                    div.querySelector("[data-role='" + i + "']").innerText = card[i];
                } catch (e) {
                    console.log("no field:" + i);
                }
                break;
        }

    }
}

var cardText=`
<div class="card">
<h1 data-role="title">Title of opportunity</h1>
<img data-role="image" src="image of opportunity">
<div class="filterInfo">
    <p>Commitment:<span data-role="commitment"></span></p>
    <p>Competition based:<span data-role="competition">YES/NO</span></p>
    <p>University Endorsed:<span data-role="uni_endorsed">YES/NO</span></p>
    <p>Industry sponsored / endorsed:<span>YES/NO</span></p>
    <!--Could potentially lead to a job opportunity or good networking contacts-->
    <p>Claimable as PEP Engineering Hours:<span>YES/MAYBE/NO</span></p>
    <p>Tags:</p>
    <div class="tagbubbles">
        <span>Potato</span>
        <span>Tomato</span>
    </div>
</div>
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
<h2>Contact details</h2>
<p data-role="contacts">
    Email boatymcboatperson@gmail.com
    Message us on facebook
    Attend our weekly meetings at Wed 12:00 in civil eng!
</p>
</div>`;
