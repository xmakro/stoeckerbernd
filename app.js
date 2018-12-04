function load() {
    let path = location.hash.substr(1);
    if (!path) path = 'start';
    let args = path.split('/');

    // Stamp content.
    let content = document.querySelector('#content');
    if (args[0] == 'gallerie') {
      let name = args[args.length-1];
      if (name == 'werke') name = 'Skulpturen';
      content.innerHTML = gallery(data[name]);
      baguetteBox.run('.gallery', {
          noScrollbars: true,
          animation: false,
      });
    } else {
      let template = document.querySelector('#' + path);
      let clone = document.importNode(template.content, true);
      content.innerHTML = '';
      content.appendChild(clone);
    }

    // Update links and sub menus.
    for (let e of document.querySelectorAll('.active')) {
      e.classList.remove('active');
    }
    for (let e of document.querySelectorAll('a')) {
      if (e.getAttribute('href') == '#' + path) {
        e.classList.add('active');
      }
    }
    for (let e of document.querySelectorAll('[data-path]')) {
      if (path.startsWith(e.getAttribute('data-path'))) {
        e.classList.add('active');
      }
    }
}

function gallery(doc) {
  var linkex = new RegExp("\.link$");
  var imapex = new RegExp("\.imap$");
  let images = doc.images.map(item => {
    let height = item.height / item.width * 180;
    if (linkex.test(item.file)) {
      return `<a href="${item.link}" title="${item.title}: ${item.description}" target = "_blank">
        <div>
          <img src="images/gallery-thumb/${item.file}.png" width="188" height="${height}">
          <span>${item.title}</span>
        </div>
      </a>`;
  } else if (imapex.test(item.title)) {
    return `<div>
      <iframe width="188" height="${height}" src="https://www.youtube.com/embed/p-BagCiKIBg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <span>${item.title}</span>
    </div>`
} else {
    return `<a href="images/gallery-full/${item.file}" title="${item.title}: ${item.description}">
      <div>
        <img src="images/gallery-thumb/${item.file}.png" width="188" height="${height}">
        <span>${item.title}</span>
      </div>
    </a>`;
  }
  }).join('');
  return `<h1>${doc.title}</h1><div class="gallery">${images}</div>`;
}

window.onhashchange = load;
window.onload = load;
