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
      return u.origin.toLowerCase();
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

  function getNeighbors(members, idx) {
    var n = members.length;
  
    var prev = members[(idx - 1 + n) % n];
    var next = members[(idx + 1) % n];
    var rand = members[Math.floor(Math.random() * n)];
  
    console.log("[ask-webring] prev:", prev.name, prev.url);
    console.log("[ask-webring] next:", next.name, next.url);
    console.log("[ask-webring] random:", rand.name, rand.url);
  
    return { prev: prev, next: next, rand: rand };
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
      getNeighbors(members, idx);
    }
  })
  .catch(function (err) {
    console.warn("[ask-webring] ошибка:", err);
  });
})();
