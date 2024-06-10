document.addEventListener("DOMContentLoaded",()=>{
    const home = document.getElementById("home");



    function select_tab(id){
        document.querySelectorAll(".route").forEach(item => item.classList.remove("selected"));

        document.querySelectorAll("#"+id).forEach(item => item.classList.add("selected"));

    }

    function load_content(id){
        console.log("loading content for {"+id+"}");

        fetch(`${window.location.origin}/${id}.html`)
            .then(res =>{
                if(res.ok){
                    res.text().then(data => document.getElementById("content").innerHTML = data)
                }
                else{
                    document.getElementById("content").innerHTML = "error loading";
                }
            })
            .catch(e => document.getElementById("content").innerHTML = "error" + e);

    }

    function push(event){
        let id = event.target.id;
        select_tab(id);
        document.title = id;
        load_content(id);

        window.history.pushState({id},`${id}`,`/page/${id}`);
    }


    window.onload = (event) => {
        window["home"].addEventListener("click",event => push(event));
        window["about"].addEventListener("click",event =>push(event));
        window["gallery"].addEventListener("click",event =>push(event));
        window["contact"].addEventListener("click",event => push(event));
        window["help"].addEventListener("click",event => push(event));
        console.log(event)
    };

    window.addEventListener("popstate", (event)=>{
        let stateId = event.state.id;
        console.log("stateId = ", stateId);
        select_tab(stateId);
        load_content(stateId);
    })



});