function commande(lien,obj) {
    console.log("il sagit d'un",obj)
    if (lien != '') {
        console.log('commande affilier à',lien)
        console.log('donc il y a ',25,'% de réduc')
    } else {
        console.log("pas d'affiliation")
    } 
    commande = 'obj='+obj+'&lien='+lien
    HttpRequest("http://127.0.0.1/requette/", method="post", data=commande);
}



document.querySelector('.scroll').onscroll = (event) => {
    scroll();
};
function scroll(s) {
    w = document.querySelector('body').scrollWidth;
    t = document.querySelector('.scroll').scrollTop;
    if ( w > 1400) {
        if ( t > (0.4*screen.height )) {
            document.getElementsByClassName('présentation')[0].style.transform = 'translate(0px)';
            document.getElementsByClassName('présentation')[1].style.transform = 'translate(0px)';
        }
        if (t < (0.4*screen.height )) {
            document.getElementsByClassName('présentation')[0].style.transform = 'translate(var(--taile2))';
            document.getElementsByClassName('présentation')[1].style.transform = 'translate(var(--taile))';
        }
    } else if (w < 1400) {
        if (t > (0.4*screen.height )) {
            document.getElementsByClassName('présentation')[0].style.transform = 'translate(0px)';
        }
        if (t > (1.2*screen.height )) {
            document.getElementsByClassName('présentation')[1].style.transform = 'translate(0px)';
        }
        if (t < (1.2*screen.height )) {
            if (t < (0.4*screen.height )) {
            document.getElementsByClassName('présentation')[0].style.transform = 'translate(var(--taile2))';
            document.getElementsByClassName('présentation')[1].style.transform = 'translate(var(--taile))';
            } else {
                document.getElementsByClassName('présentation')[1].style.transform = 'translate(var(--taile))';
            }
        }
    }
}


document.querySelector('body').addEventListener('mousemove', paralax);
function paralax (event){
        //mouse and mouse with lerp
        document.getElementById('mouse').style.left = event.pageX + 'px';
        document.getElementById('mouselerp').style.left = event.pageX + 'px';
        document.getElementById('mouse').style.top = (event.pageY) + 'px';
        document.getElementById('mouselerp').style.top = (event.pageY) + 'px';
        document.getElementById('mouselerp').style.pointerEvents = 'none';
        document.getElementById('mouse').style.pointerEvents = 'none';

        document.querySelectorAll('.h').forEach( eye => {
            eye.addEventListener('mouseover', hover); 
            eye.addEventListener('mouseout', nohover);
        });
        document.querySelectorAll('.illustration').forEach( eye => {
            eye.addEventListener('mouseover', voirlavidéo); 
            eye.addEventListener('mouseout', neplusvoirlavidéo);
        });

}
function nohover () {
    document.getElementById('mouselerp').style.height = 30 + 'px';
    document.getElementById('mouselerp').style.width = 30 + 'px';
    document.getElementById('mouselerp').style.padding = 0 + 'px';
    document.getElementById('mouselerp').style.border = 2 + 'px solid var(--color)';
}
function hover () {
    document.getElementById('mouselerp').style.height = 7 + 'px';
    document.getElementById('mouselerp').style.width = 7 + 'px';
    document.getElementById('mouselerp').style.padding = 50 + 'px';
    document.getElementById('mouselerp').style.border = 1 + 'px solid var(--color)';
}
function voirlavidéo() {
    document.getElementById('mouse').innerHTML = '<h1>voir en grand<h1>';
    document.getElementById('mouse').style.height = 'unset';
    document.getElementById('mouse').style.width = 'unset';
    document.getElementById('mouse').style.background = 'transparent';
    document.getElementById('mouselerp').style.height = 200 + 'px';
    document.getElementById('mouselerp').style.width = 200 + 'px';
    document.getElementById('mouselerp').style.border = 1 + 'px solid var(--color)';
}
function neplusvoirlavidéo(){
    document.getElementById('mouse').innerHTML = '';
    document.getElementById('mouse').style.height = 7 +'px';
    document.getElementById('mouse').style.width = 7 +'px';
    document.getElementById('mouse').style.background = 'var(--color)';
    document.getElementById('mouselerp').style.height = 30 + 'px';
    document.getElementById('mouselerp').style.width = 30 + 'px';
    document.getElementById('mouselerp').style.border = 2 + 'px solid var(--color)';
}


function fullscrenn(nombre) {
    document.getElementsByClassName('vidéo')[0].style.display = 'block';
}
function unfullscrenn() {
    document.getElementsByClassName('vidéo')[0].style.display = 'none';
}


















//                      HttpRequest for post request
function HttpRequest(url, method="get", data="") {  
    url=url.toString();
    method=method.toString();
    data=data.toString();
//CHECK CSRF-Token
    function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
//Check if there is a hidden csrf-input-field, if so, get the value
try {
    var csrffield = document.getElementsByTagName("input");
    var l = csrffield.length;
    var i=0;
while (true) {
    if (i > l) {
        break;
    }
    if (csrffield[i].name.toLowerCase().includes("csrf") == true) {
        csrftoken=csrffield[i].value;
        break;
    }
    i++;
}}
catch (err) {
    var csrftoken = getCookie('csrftoken');
}
    var req = new XMLHttpRequest();
    if (method == "get" || method == "GET" || method == "Get") {
        req.open("GET", url, false);
        req.send();
    if (req.status == 200) {
        return req.responseText;
}}
if (method == "post" || method == "POST" || method == "Post") {
    req.open("POST", url, false);
    if (data != "") {
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");   
    }
    if (csrftoken != "" || csrftoken != null) {
        //Set it twice with a different header-name so that different apps can deal with it
        req.setRequestHeader("X-CSRF-Token", csrftoken);
        req.setRequestHeader("X-CSRFToken", csrftoken);
    }
    req.send(data);
if (req.status == 200) {
    return req.responseText;
}}}