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