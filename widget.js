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

  function normalize(url) {
    try {
      var u = new URL(url);
      return (u.origin + u.pathname).replace(/\/+$/, "").toLowerCase();
    } catch (e) {
      return String(url || "").replace(/\/+$/, "").toLowerCase();
    }
  }

  function findCurrentIndex(members) {
    var hereOrigin = normalize(location.origin);
    console.log("[ask-webring] hereOrigin:", hereOrigin);
  
    return members.findIndex(function (m) {
      return normalize(m.url) === hereOrigin;
    });
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
    var idx = findCurrentIndex(members);

    if (idx === -1) {
      console.log("[ask-webring] сайт не в кольце");
    } else {
      console.log("[ask-webring] сайт #" + idx + ":", members[idx].name);
    }
  })
  .catch(function (err) {
    console.warn("[ask-webring] ошибка:", err);
  });
})();
