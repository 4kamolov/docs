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