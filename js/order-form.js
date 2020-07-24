function sendOrderData() {
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const address = document.querySelector("#address").value.trim();
    const comment = document.querySelector("#comment").value.trim();
    const extra = parseInt(document.querySelector("[name=extra]:checked").value)
    const sauce = parseInt(document.querySelector("#sauce").value)
    const quantity = parseInt(document.querySelector("#quantity").value)
    
    if (!name) {
        alert("A név megadása kötelező!");
    } else if (!email || !(email.indexOf("@") > 0) || !(email.indexOf(".") > 0)) {
        alert("Érvénytelen e-mail cím!");
    } else if (address.length < 10) {
        alert("Kérjük pontos címet adj meg!");
    } else if ((comment.indexOf("<") >= 0) && (comment.indexOf(">") > 0)) {
        alert("A megjegyzésben nem megengedett a HTML használata!");
    } else if (!quantity || quantity < 1 || quantity > 10) {
        alert("Csak 1 és 10 között rendelhetsz!");
    } else {        
        const message = document.querySelector("#message");
        const price = (1200 + extra + sauce) * quantity;
        message.innerText = price;
    }
}