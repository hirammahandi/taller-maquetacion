/* *********** Menu **************** */
((d) => {
  const $btnMenu = d.querySelector(".menu-btn");
  const $menu = d.querySelector(".menu");

  $btnMenu.addEventListener("click", () => {
    $btnMenu.firstElementChild.classList.toggle("none");
    $btnMenu.lastElementChild.classList.toggle("none");
    $menu.classList.toggle("is-active");
  });

  d.addEventListener("click", (e) => {
    if (!e.target.matches(".menu a")) return false;
    $btnMenu.firstElementChild.classList.remove("none");
    $btnMenu.lastElementChild.classList.add("none");
    $menu.classList.remove("is-active");
  });
})(document);

/* ********************* ContactForm ****************************** */
((d) => {
  const $form = d.querySelector(".contact-form"),
    $loader = d.querySelector(".contact-form-loader"),
    $modalResponse = d.querySelector(".contact-form-response");

  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    $loader.classList.remove("none");
    fetch("https://formsubmit.co/ajax/hiramhernandezpena@gmail.com", {
      method: "POST",
      body: new FormData(e.target),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        console.log(json);
        $loader.classList.add("none");
        location.hash = "#gracias";
        $form.reset();
      })
      .catch((err) => {
        console.error(err);
        let message =
          err.statusText || "Ocurrio un error al enviar, intenta nuevamente";
        $modalResponse.querySelector(
          "h3"
        ).textContent = `Error ${err.status}: ${message}`;
      })
      .finally(() => {
        $loader.classList.add("none");
        setTimeout(() => {
          location.hash = "#cerrar";
        }, 3000);
      });
  });
})(document);
