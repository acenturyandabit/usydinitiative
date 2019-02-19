navman.addpage('filters', function () {
    this.div = document.createElement("div");
    this.div.innerHTML = `
    <div class="topbar">
            <button class="back">Back</button>
            <h1>Set your filters!</h1>
            <span></span>
        </div>
        <div>
            <p>1/5 What's your major?</p>
            <select>
                <option>Mechanical</option>
                <option>Electrical</option>
                <option>Chemical</option>
                <option>Mechatronic</option>
                <option>Civil</option>
                <!--etc-->
            </select>

            <p>2/5 How much spare time do you have to commit?</p>
            <input type="range">

            <p>3/5 Enter some keywords you might be interested in...</p>
            <input> <button>Add</button>
            <div class="tagbubbles">
                <span>Potato<button>X</button></span>
                <span>Tomato<button>X</button></span>
            </div>
        </div>
    `;

    this.div.querySelector(".back").addEventListener("click", function (e) {
        navman.navigateTo('cardBrowser');
    })
})