(function () {
  console.log("[ask-webring] скрипт загружен");
  let mount = document.getElementById("webring");

  if (mount) {
    console.log("[ask-webring] найден элемент:", mount);
  } else {
    console.log("[ask-webring] нет элемента #webring на странице");
  }
})();
