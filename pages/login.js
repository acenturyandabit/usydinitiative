navman.addpage('login', function () {
    this.div = document.createElement("div");
    this.div.innerHTML = `
    <h1>Sign up with us to save your preferences on any device!</h1>
        <div class="loginbox">
            <button>sign up with facebook</button>
            <button>sign up with google</button>
            <button>Use an email and password</button>
        </div>
        <button>Not now</button>
    `;
})