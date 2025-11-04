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
