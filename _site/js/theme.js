document.body.style.backgroundColor = sessionStorage.getItem('bg');
document.body.style.color = sessionStorage.getItem('cc');
document.document.getElementsByTagName('p').style.color = sessionStorage.getItem('p');


function theme() {
     if ( sessionStorage.getItem('bg') === 'rgb(255, 255, 255)') {

            sessionStorage.setItem('bg', 'rgb(6, 23, 37)');
            sessionStorage.setItem('cc', 'rgb(255, 255, 255)');
            sessionStorage.setItem('p', 'rgb(255, 255, 255)');


     }
    else if (sessionStorage.getItem('bg') == null || undefined) {
        sessionStorage.setItem('bg', 'rgb(6, 23, 37)');
        sessionStorage.setItem('cc', 'rgb(255, 255, 255)');
        sessionStorage.setItem('p', 'rgb(255, 255, 255)');

    }
    else if( sessionStorage.getItem('bg') === 'rgb(6, 23, 37)') {

        sessionStorage.setItem('bg', 'rgb(255, 255, 255)');
        sessionStorage.setItem('cc', '#333');


    }

document.body.style.backgroundColor = sessionStorage.getItem('bg');
document.body.style.color = sessionStorage.getItem('cc');
document.document.getElementsByTagName('p').style.color = sessionStorage.getItem('p');

}
