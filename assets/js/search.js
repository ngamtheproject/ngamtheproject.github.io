// Site search over /index.json (built by layouts/home.json). Matching ignores
// Vietnamese diacritics, so "toa" finds "Toả" and "dak lak" finds "Đắk Lắk".
(function () {
  "use strict";

  var dialog = document.getElementById("search");
  var openers = document.querySelectorAll("[data-search-open]");
  if (!dialog || !openers.length) return;

  var input = dialog.querySelector("input[type=search]");
  var list = dialog.querySelector(".search-results");
  var status = dialog.querySelector(".search-status");
  var indexUrl = dialog.dataset.index;
  var pages = null;
  var loading = null;

  function fold(text) {
    return (text || "")
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
  }

  function load() {
    if (!loading) {
      loading = fetch(indexUrl)
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          return res.json();
        })
        .then(function (data) {
          pages = data.map(function (p) {
            p.t = fold(p.title);
            p.b = fold(p.content);
            return p;
          });
        })
        .catch(function (err) {
          loading = null;
          status.textContent = "Không tải được dữ liệu tìm kiếm (" + err.message + ").";
          throw err;
        });
    }
    return loading;
  }

  function snippet(page, words) {
    var text = page.content || "";
    var at = words.length ? page.b.indexOf(words[0]) : -1;
    var start = Math.max(0, at - 60);
    var out = text.slice(start, start + 180);
    return (start > 0 ? "…" : "") + out + (start + 180 < text.length ? "…" : "");
  }

  function render() {
    if (!pages) return;
    var words = fold(input.value).split(/\s+/).filter(Boolean);
    list.textContent = "";
    if (!words.length) {
      status.textContent = "Nhập từ khoá để tìm bài viết, sự kiện, albums.";
      return;
    }
    var hits = [];
    pages.forEach(function (p) {
      var score = 0;
      for (var i = 0; i < words.length; i++) {
        var inTitle = p.t.indexOf(words[i]) !== -1;
        var inBody = p.b.indexOf(words[i]) !== -1;
        if (!inTitle && !inBody) return;
        score += inTitle ? 10 : 1;
      }
      hits.push({ page: p, score: score });
    });
    hits.sort(function (a, b) {
      return b.score - a.score || (b.page.date || "").localeCompare(a.page.date || "");
    });
    status.textContent = hits.length ? hits.length + " kết quả" : "Không có kết quả cho “" + input.value + "”.";
    hits.slice(0, 30).forEach(function (h) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = h.page.url;
      var title = document.createElement("strong");
      title.textContent = h.page.title;
      var meta = document.createElement("span");
      meta.className = "search-meta";
      meta.textContent = [h.page.section, h.page.dateText].filter(Boolean).join(" · ");
      var text = document.createElement("span");
      text.className = "search-snippet";
      text.textContent = snippet(h.page, words);
      a.append(title, meta, text);
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  function open(query) {
    if (typeof query === "string") input.value = query;
    dialog.showModal();
    input.focus();
    status.textContent = "Đang tải…";
    load().then(render, function () {});
  }

  openers.forEach(function (el) {
    el.addEventListener("click", function () { open(); });
  });
  input.addEventListener("input", render);
  dialog.querySelector(".search-close").addEventListener("click", function () { dialog.close(); });
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });
  document.addEventListener("keydown", function (event) {
    var tag = (event.target.tagName || "").toLowerCase();
    if (event.key === "/" && !dialog.open && tag !== "input" && tag !== "textarea" && !event.target.isContentEditable) {
      event.preventDefault();
      open();
    }
  });

  // The 404 page's form hands its query to the dialog.
  var form = document.getElementById("search-404");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      open(form.elements.q.value);
    });
  }
  var q = new URLSearchParams(location.search).get("q");
  if (q) open(q);
})();
