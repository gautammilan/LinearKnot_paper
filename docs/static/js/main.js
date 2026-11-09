document.addEventListener("DOMContentLoaded", function () {
  if (window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [
        { left: "\\[", right: "\\]", display: true },
        { left: "\\(", right: "\\)", display: false }
      ],
      ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"],
      throwOnError: false
    });
  }

  document.querySelectorAll(".button.is-disabled").forEach(function (el) {
    el.addEventListener("click", function (e) { e.preventDefault(); });
  });

  document.querySelectorAll(".copy[data-copy-target]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = document.getElementById(btn.dataset.copyTarget).textContent;
      var done = function (ok) {
        btn.textContent = ok ? "Copied" : "Copy failed";
        setTimeout(function () { btn.textContent = "Copy"; }, 1500);
      };
      if (fallbackCopy(text)) {
        done(true);
      } else if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
      } else {
        done(false);
      }
    });
  });

  var box = document.getElementById("lightbox");
  var boxImg = box.querySelector("img");
  var close = function () {
    box.hidden = true;
    boxImg.removeAttribute("src");
    document.body.style.overflow = "";
  };
  document.querySelectorAll("a.zoom").forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      var img = link.querySelector("img");
      boxImg.src = link.href;
      boxImg.alt = img ? img.alt : "";
      box.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });
  box.addEventListener("click", close);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !box.hidden) close();
  });
});

function fallbackCopy(text) {
  var ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  var ok = false;
  try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
  document.body.removeChild(ta);
  return ok;
}
