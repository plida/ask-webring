(function () {
  console.log("[ask-webring] скрипт загружен");
  var DATA_URL = "https://plida.github.io/ask-webring/members.json";

  function getMembers(ring) {
    var all = ring.members || [];
    var usable = all.filter(function (m) {
      return m && m.url && m.active !== false;
    });

    console.log("[ask-webring] активные участники:", usable);

    return usable;
  }
  
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
    var members = getMembers(ring);
    console.log("[ask-webring] получено", members.length, "участников");
  })
  .catch(function (err) {
    console.warn("[ask-webring] ошибка:", err);
  });
})();
