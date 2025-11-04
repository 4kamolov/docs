async function getLangJson() {
  try {
    const res = await fetch("data/lang.json");
    if (!res.ok) throw new Error("lang.json not loaded!");
    return await res.json();
  } catch (err) {
    console.error("Error:", err);
    return {};
  }
}
// JSON fetch langjson>

const toastIcons = {
  success: "m9.55 18l-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175 1.425 1.425z",
  error:
    "M18.364 5.636l-1.414-1.414L12 9.172 7.05 4.222 5.636 5.636 10.586 10.586 5.636 15.536l1.414 1.414L12 12.828l4.95 4.95 1.414-1.414L13.414 10.586l4.95-4.95z",
};
const toastColors = { success: "#00CC00", error: "#FF0000" };
const toastSounds = {
  success: "sounds/StartupiPhone.wav",
  error: "sounds/ShutdowniPhone.wav",
};
function toast(message, type = "success", duration = 3000) {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.style.borderLeftColor = toastColors[type] || "#333";

  const textColor = type === "error" ? "#FF0000" : "#00CC00";

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="${toastColors[type]}" d="${toastIcons[type] || ""}"></path>
    </svg>
    <span style="color:${textColor}">${message || "Undefined!"}</span>
  `;

  document.body.appendChild(toast);

  // Get all toasts>
  const allToasts = document.querySelectorAll(".toast");
  const index = allToasts.length - 1; // new toast index>
  const offset = 10 + index * 50; // spacing between toasts>

  toast.style.top = offset + "px";

  if (toastSounds[type]) {
    new Audio(toastSounds[type]).play().catch(() => {});
  }

  setTimeout(() => toast.classList.add("show"), 50);

  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hide");
    setTimeout(() => {
      toast.remove();
      // Reposition remaining toasts>
      document.querySelectorAll(".toast").forEach((el, i) => {
        el.style.top = 10 + i * 50 + "px";
      });
    }, 500);
  }, duration);
}
// Toast function>

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