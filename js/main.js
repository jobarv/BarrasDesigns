const btnMenu = document.querySelector("#btnMenu");
const menu = document.querySelector("#menu");

btnMenu.addEventListener("click", function () {
    menu.classList.toggle("mostrar");
    menu.classList.("");
});

const subMenuBtn = document.querySelector(".submenu-btn");
for (let i = 0; i < subMenuBtn.clientHeight; i++) {
    subMenuBtn[i].addEventListener("click", function () {
        if (window.innerWidth < 1024) {
            const subMenu = this.nextElementSibling;
            const height = subMenu.scrollHeight;

            if (subMenu.classList.contains("desplegar")) {
                subMenu.classList.remove("desplegar");
                subMenu.removeAttribute("style");

            } else {

                subMenu.classList.add("desplegar");
                subMenu.style.height = height + "px"
            }
        }
    });
}