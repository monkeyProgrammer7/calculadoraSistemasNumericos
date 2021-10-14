


function cambiarApariencia(button, className){
    
    var buttons=document.getElementsByClassName(className);
    
    console.log(buttons);
    Array.prototype.forEach.call(buttons, element => {
        element.classList.replace('btn-light','btn-outline-light')
    });
 button.classList.replace('btn-outline-light','btn-light');
};