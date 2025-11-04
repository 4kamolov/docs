async function setLanguage(lang) {
  const data = await getLangJson();

  document.querySelectorAll("[lang]").forEach((el) => {
    const key = el.getAttribute("lang");
    if (data[lang] && data[lang][key]) {
      el.innerText = data[lang][key];
    }
  });

  localStorage.setItem("lang", lang);
}
document.addEventListener("DOMContentLoaded", async () => {
  const btnUz = document.getElementById("lang-uz");
  const btnRu = document.getElementById("lang-ru");
  const btnEn = document.getElementById("lang-en");
  const btnSystem = document.getElementById("lang-system");

  if (btnUz) btnUz.onclick = () => setLanguage("uz");
  if (btnRu) btnRu.onclick = () => setLanguage("ru");
  if (btnEn) btnEn.onclick = () => setLanguage("en");
  if (btnSystem)
    btnSystem.onclick = () => {
      const sysLang = navigator.language.slice(0, 2);
      const supported = ["uz", "ru", "en"];
      const finalLang = supported.includes(sysLang) ? sysLang : "en";
      setLanguage(finalLang);
    };

  const savedLang = localStorage.getItem("lang") || "uz";
  await setLanguage(savedLang);

  const langData = await getLangJson();

  document.querySelectorAll("[toastS]").forEach((el) => {
    el.addEventListener("click", () => {
      const currentLang = localStorage.getItem("lang") || "uz";
      const key = el.getAttribute("toastS");
      toast(langData[currentLang][key] || key, "success");
    });
  });

  document.querySelectorAll("[toastE]").forEach((el) => {
    el.addEventListener("click", () => {
      const currentLang = localStorage.getItem("lang") || "uz";
      const key = el.getAttribute("toastE");
      toast(langData[currentLang][key] || key, "error");
    });
  });
});
// language>