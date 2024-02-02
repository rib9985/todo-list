import Todo from "./modules/Todo";

import './style.css';

function returnFlex(){const mainDivSelect = document.getElementById('div-main')
mainDivSelect.classList.add('divMain')
}

function addLogo(){
    const logoDiv = document.getElementById('div-logo')
    logoDiv.classList.add('logo')
    return logoDiv
}

addLogo()