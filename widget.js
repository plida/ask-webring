(function () {
  console.log("[ask-webring] скрипт загружен");
  var DATA_URL = "https://plida.github.io/ask-webring/members.json";

  function el(tag, attrs, text) {
    var node = document.createElement(tag);
    if (attrs) {
      for (var key in attrs) {
        node.setAttribute(key, attrs[key]);
      }
    }
    if (text != null) {
      node.textContent = text;
    }
    return node;
  }
  
  function getMembers(ring) {
    var all = ring.members || [];
    var usable = all.filter(function (m) {
      return m && m.url && m.active !== false;
    });
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
  
    return members.findIndex(function (m) {
      return normalize(m.url) === hereOrigin;
    });
  }

  function getNeighbors(members, idx) {
    var n = members.length;
  
    var prev = members[(idx - 1 + n) % n];
    var next = members[(idx + 1) % n];
    var rand = members[Math.floor(Math.random() * n)];
  
    return { prev: prev, next: next, rand: rand };
  }

  function render(mount, ring, members, idx) {
    mount.innerHTML = "";
    mount.classList.add("webring");
  
    if (idx === -1) {
      mount.appendChild(el("a", { href: ring.listUrl || "#" }, ring.name || "web ring"));
      return;
    }
  
    var neighbors = getNeighbors(members, idx);
  
    mount.appendChild(el("a", { href: neighbors.prev.url, rel: "prev" }, "← " + prev));
    mount.appendChild(el("span", { class: "webring-sep", "aria-hidden": "true" }, " · "));
    mount.appendChild(el("a", { href: ring.listUrl || "#" }, ring.name || "list"));
    mount.appendChild(el("span", { class: "webring-sep", "aria-hidden": "true" }, " · "));
    mount.appendChild(el("a", { href: neighbors.next.url, rel: "next" }, next + " →"));
    mount.appendChild(el("span", { class: "webring-sep", "aria-hidden": "true" }, " · "));
    mount.appendChild(el("a", { href: neighbors.rand.url }, "случайно"));
  }
    
  let mount = document.getElementById("webring");
  if (!mount) {
    console.warn("[ask-webring] нет элемента #webring на странице");
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
      console.warn("[ask-webring] сайт не в кольце");
    } else {
      getNeighbors(members, idx);
      render(mount, ring, members, idx);
    }
  })
  .catch(function (err) {
    console.warn("[ask-webring] ошибка:", err);
  });
})();
