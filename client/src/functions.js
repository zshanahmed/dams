
// Message alert code
{/*
<h1 id="msgGroup" hidden>
    <Button onClick={closeMsg} close />
    <Badge id="messageBadge" color="primary">Message Area</Badge>
</h1>
*/}

// Set a message alert
export const setMessage = (msg, color) => {
    document.getElementById("msgGroup").removeAttribute("hidden");
    var badge = document.getElementById("messageBadge");
    badge.innerHTML = msg;
    badge.setAttribute("class", `badge ${color}`);
    //badge.removeAttribute("hidden");
}

// Remove a message alert
export const closeMsg = () => {
    document.getElementById("msgGroup").setAttribute("hidden", "");
}