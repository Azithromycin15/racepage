(function () {
  "use strict";

  var links = Array.prototype.slice.call(
    document.querySelectorAll('nav.toc a[href^="#"]')
  );
  var targets = links.map(function (link) {
    var el = document.querySelector(link.getAttribute("href"));
    return el ? { link: link, el: el } : null;
  }).filter(Boolean);

  var button = document.getElementById("to-top");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var ticking = false;

  function setActive(activeEl) {
    targets.forEach(function (item) {
      var on = item.el === activeEl;
      item.link.classList.toggle("on", on);
      if (on) {
        item.link.setAttribute("aria-current", "location");
      } else {
        item.link.removeAttribute("aria-current");
      }
    });
  }

  function update() {
    var probe = window.scrollY + Math.min(window.innerHeight * 0.3, 240);
    var current = targets.length ? targets[0].el : null;

    targets.forEach(function (item) {
      var top = item.el.getBoundingClientRect().top + window.scrollY;
      if (top <= probe) current = item.el;
    });

    if (current) setActive(current);
    if (button) button.classList.toggle("show", window.scrollY > 700);
    ticking = false;
  }

  function requestUpdate() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);

  if (button) {
    button.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: reduceMotion.matches ? "auto" : "smooth"
      });
    });
  }

  update();
})();
