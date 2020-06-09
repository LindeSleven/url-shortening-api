/* MOBILE NAVIGATION */

const header = document.querySelector(".header");
const hamburger = document.querySelector(".hamburger-menu");

hamburger.addEventListener("click", () => {
  header.classList.toggle("menu-open");
});

/* API REQUEST */

const link = document.querySelector("#input-link");
const error = document.querySelector(".error");
const btn = document.querySelector("#btn-link");
const results = document.querySelector(".shorten-links");

let savedLinks = [];
loadLinks();

const createLink = async (link) => {
  try {
    const response = await axios.post("https://rel.ink/api/links/", {
      url: link,
    });
    return response.data;
  } catch (error) {
    return "Not a valid URL";
  }
};

btn.addEventListener("click", async () => {
  if (link.value === "") {
    error.classList.add("show");
    link.classList.add("show");
  } else {
    error.classList.remove("show");
    link.classList.remove("show");

    const linkData = await createLink(link.value);
    results.innerHTML += linkTemplate(linkData);

    savedLinks.push(linkData);
    localStorage.setItem("savedLinks", JSON.stringify(savedLinks));

    link.value = "";
  }
});

function linkTemplate(linkData) {
  const { hashid, url, created_at } = linkData;
  const shortLink = `https://rel.ink/${hashid}`;
  return `
    <div class="shorten-link">
      <h3 class="title-url">${url}</h3>
      <a href="${shortLink}" class="title-link" id="${hashid}">${shortLink}</a>
      <button id="btn-copy" class="btn btn-rectangle clipboard" 
      data-clipboard-target="#${hashid}" data-clipboard-action="copy">Copy</button>
    </div>
  `;
}

function loadLinks() {
  savedLinks = JSON.parse(localStorage.getItem("savedLinks"));
  if (savedLinks !== null) {
    for (let link of savedLinks) {
      results.innerHTML += linkTemplate(link);
    }
  } else {
    savedLinks = [];
  }
}

/* COPY TO CLIPBOARD */

let clipboard = new ClipboardJS(".clipboard");

clipboard.on("success", function (e) {
  e.trigger.innerText = "Copied!";
  e.trigger.style.backgroundColor = "hsl(255, 11%, 22%)";
  e.clearSelection();
});

clipboard.on("error", function (e) {
  console.log(e);
});
