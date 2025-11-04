const bar = document.getElementById("progress-bar");
bar.style.transition = "width 1.2s ease-out";
bar.style.width = "10%";
setTimeout(() => {
  bar.style.transition = "width 0.8s ease";
  bar.style.width = "40%";
}, 500);
window.onload = () => {
  setTimeout(() => {
    bar.style.transition = "width 0.8s ease";
    bar.style.width = "70%";
  }, 800);
  setTimeout(() => {
    bar.style.transition = "width 0.4s ease-in";
    bar.style.width = "100%";
  }, 1200);
  setTimeout(() => {
    bar.style.transition = "opacity 0.3s ease-out";
    bar.style.opacity = "0";
    setTimeout(() => {
      bar.remove();
      document.getElementById("progress-bg").remove();
    }, 300);
  }, 1800);
};
// loading>
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", function (e) {
    const target = e.target.closest(".ripple");
    if (!target) return;

    const circle = document.createElement("span");
    const rect = target.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);
    circle.style.width = circle.style.height = size + "px";

    circle.style.left = e.clientX - rect.left - size / 2 + "px";
    circle.style.top = e.clientY - rect.top - size / 2 + "px";

    target.appendChild(circle);

    setTimeout(() => circle.remove(), 600);
  });
});
// ripple>
document.addEventListener("DOMContentLoaded", async () => {
  const langData = await getLangJson();

  document.querySelectorAll("[copytext]").forEach((el) => {
    el.addEventListener("click", async () => {
      const currentLang = localStorage.getItem("lang") || "uz"; // til har bosishda olinadi
      const copyKey = el.getAttribute("lang"); // nusxalash uchun kalit
      const successKey = "textcopy"; // har doim lang.json dagi textcopy
      const errorKey = "textcopyfail"; // xato bo‘lsa textcopyfail
      const errorNotFoundKey = "textcopynotfound"; // kalit topilmasa textcopynotfound

      if (langData[currentLang] && langData[currentLang][copyKey]) {
        const textToCopy = langData[currentLang][copyKey];

        try {
          await navigator.clipboard.writeText(textToCopy);

          // ✅ nusxa muvaffaqiyatli bo‘lsa lang.json dagi xabar
          toast(langData[currentLang][successKey] || "Copied!", "success");
        } catch (err) {
          toast(langData[currentLang][errorKey] || "Copy failed!", "error");
        }
      } else {
        toast(
          langData[currentLang][errorNotFoundKey] || "Text not found!",
          "error"
        );
      }
    });
  });
});
// copytext>