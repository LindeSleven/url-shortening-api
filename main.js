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

const createLink = async (link) => {
  try {
    const response = await axios.post("https://rel.ink/api/links/", {
      url: link,
    });
    //const hashId = response.data.hashid;
    //const shortLink = `https://rel.ink/${hashId}`;
    //return shortLink;
    return response.data;
  } catch (error) {
    return "Not a valid URL";
  }
};

const linkDiv = [];

btn.addEventListener("click", async () => {
  if (link.value === "") {
    error.classList.add("show");
    link.classList.add("show");
  } else {
    error.classList.remove("show");
    link.classList.remove("show");
    const linkData = await createLink(link.value);
    linkDiv.push(linkData);
    console.log(linkDiv);
    for (let link of linkDiv) {
      results.innerHTML = linkTemplate(link);
    }
  }
});

const linkTemplate = (linkData) => {
  const { hashid, url, created_at } = linkData;
  const shortLink = `https://rel.ink/${hashid}`;
  return `
    <div class="shorten-link">
      <h3 class="title-url">${url}</h3>
      <a href="${shortLink}" class="title-link">${shortLink}</a>
      <button id="btn-copy" class="btn btn-rectangle">Copy</button>
    </div>
  `;
};

// -------------

/*const createLink = async (data) => {
  try {
    const { hashid, url, created_at } = data;
    console.log(hashid);
    const response = await axios.get("https://rel.ink/api/links/");
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const fetchNewLink = async (link) => {
  const newLink = await createHash(link);
  //let newLink = await createLink(hashLink);
  //console.log(newLink);
  return newLink;
};*/
