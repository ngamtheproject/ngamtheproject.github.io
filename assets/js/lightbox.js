// Lightbox for gallery, album and figure images: keyboard (arrows, Escape),
// swipe, captions. Images open at the largest derivative the link points to.
(function () {
  "use strict";

  var LINKS = ".gallery a.picture-link, .figure a.picture-link";
  var dialog, img, caption, counter, prevBtn, nextBtn;
  var group = [];
  var index = 0;

  function build() {
    dialog = document.createElement("dialog");
    dialog.className = "lightbox";
    dialog.setAttribute("aria-label", "Xem ảnh");
    dialog.innerHTML =
      '<div class="lightbox-stage"><img class="lightbox-image" alt=""></div>' +
      '<div class="lightbox-bar"><p class="lightbox-caption"></p><span class="lightbox-counter"></span></div>' +
      '<button type="button" class="lightbox-btn lightbox-close" aria-label="Đóng">×</button>' +
      '<button type="button" class="lightbox-btn lightbox-prev" aria-label="Ảnh trước">‹</button>' +
      '<button type="button" class="lightbox-btn lightbox-next" aria-label="Ảnh sau">›</button>';
    document.body.appendChild(dialog);
    img = dialog.querySelector(".lightbox-image");
    caption = dialog.querySelector(".lightbox-caption");
    counter = dialog.querySelector(".lightbox-counter");
    prevBtn = dialog.querySelector(".lightbox-prev");
    nextBtn = dialog.querySelector(".lightbox-next");

    dialog.querySelector(".lightbox-close").addEventListener("click", close);
    prevBtn.addEventListener("click", function () { show(index - 1); });
    nextBtn.addEventListener("click", function () { show(index + 1); });
    dialog.addEventListener("click", function (event) {
      // A click on the backdrop or the empty stage closes the viewer.
      if (event.target === dialog || event.target.classList.contains("lightbox-stage")) close();
    });
    dialog.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") { event.preventDefault(); show(index - 1); }
      else if (event.key === "ArrowRight") { event.preventDefault(); show(index + 1); }
    });
    dialog.addEventListener("close", function () {
      document.body.classList.remove("lightbox-open");
      img.removeAttribute("src");
    });

    var startX = null;
    var startY = 0;
    dialog.addEventListener("pointerdown", function (event) {
      if (event.pointerType === "mouse") return;
      startX = event.clientX;
      startY = event.clientY;
    });
    dialog.addEventListener("pointerup", function (event) {
      if (startX === null) return;
      var dx = event.clientX - startX;
      var dy = event.clientY - startY;
      startX = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(dx < 0 ? index + 1 : index - 1);
    });
    dialog.addEventListener("pointercancel", function () { startX = null; });
  }

  function captionOf(link) {
    var figure = link.closest("figure");
    if (!figure) return "";
    if (figure.dataset.caption) return figure.dataset.caption;
    var fc = figure.querySelector("figcaption");
    return fc ? fc.innerHTML : "";
  }

  function show(i) {
    if (!group.length) return;
    index = (i + group.length) % group.length;
    var link = group[index];
    var thumb = link.querySelector("img");
    img.src = link.href;
    img.alt = thumb ? thumb.alt : "";
    // Captions are the site's own markdown, rendered by Hugo at build time.
    caption.innerHTML = captionOf(link);
    var many = group.length > 1;
    counter.textContent = many ? index + 1 + " / " + group.length : "";
    prevBtn.hidden = nextBtn.hidden = !many;
    [index + 1, index - 1].forEach(function (n) {
      var next = group[(n + group.length) % group.length];
      if (next) new Image().src = next.href;
    });
  }

  function open(link) {
    if (!dialog) build();
    var scope = link.closest(".gallery") || link.closest("figure");
    group = Array.prototype.slice.call(scope.querySelectorAll("a.picture-link"));
    document.body.classList.add("lightbox-open");
    show(group.indexOf(link));
    dialog.showModal();
  }

  function close() {
    if (dialog && dialog.open) dialog.close();
  }

  document.addEventListener("click", function (event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
    var link = event.target.closest(LINKS);
    if (!link || typeof HTMLDialogElement !== "function") return;
    event.preventDefault();
    open(link);
  });
})();
