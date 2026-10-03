(function () {
  console.log("[ask-webring] скрипт загружен");
  var DATA_URL = "https://plida.github.io/ask-webring/members.json";
  let mount = document.getElementById("webring");
  if (mount) {
    console.log("[ask-webring] найден элемент:", mount);
  } else {
    console.log("[ask-webring] нет элемента #webring на странице");
    return;
  }
  fetch(DATA_URL)
  .then(function (res) {
    if (!res.ok) throw new Error("HTTP " + res.status);
    return res.json();
  })
  .then(function (ring) {
    console.log("[ask-webring] кольцо:", ring);
    console.log("[ask-webring] участники:", ring.members);
  })
  .catch(function (err) {
    console.warn("[ask-webring] ошибка:", err);
  });
})();
