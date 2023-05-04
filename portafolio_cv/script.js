
/**********Menu***********/

((d)=>{
    const $btnMenu = d.querySelector(".menu-btn"),
        $menu= d.querySelector(".menu");

    $btnMenu.addEventListener("click",(e) => {
        $btnMenu.firstElementChild.classList.toggle("none");
        $btnMenu.lastElementChild.classList.toggle("none");
        $menu.classList.toggle("is-active");
    })

    //delegacion de event para el elemento superiror q es el document para ver si lo originan en los link del menu
    d.addEventListener("click",(e)=> {
        if(!e.target.matches(".menu a")) return false;

        $btnMenu.firstElementChild.classList.remove("none");
        $btnMenu.lastElementChild.classList.add("none");
        $menu.classList.remove("is-active");
        
    })
}

)(document);


/**************Contact Form************************* */

((d)=> {
    const $form = d.querySelector(".contact-form"),
        $loader = d.querySelector(".contact-form-loader"),
        $response = d.querySelector(".contact-form-response");

    $form.addEventListener("submit",(e)=> {
        e.preventDefault();

        $loader.classList.remove("none");
        fetch("https://formsubmit.com/ajax/michel.bignose@gmail.com",
        {method: "POST",
        body: FormData(e.target)
        }).then((res)=>(res.ok ? res.json() : Promise.reject(res)))
        .then(json => {
            console.log(json);
           
            /*activando ventana modal de gracias */
            location.hash = "#gracias";
            $form.reset();
        }).catch(err =>{
            console.log(err);
            let message =  err.statusText || 'Ocurrio un error intentalo nuevamente';
            $response.querySelector("h3").innerHTML = `Error ${err.status}: ${message} `;
           
        }).finally( ()=> {
            $loader.classList.add("none");

            /**crrando ventana modal */
            setTimeout(() => {
                location.hash = "#close"
            }, 3000);
            }
        );
    })    
}
)(document)