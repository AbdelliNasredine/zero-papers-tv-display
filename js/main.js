const API_BASE_URL = "https://zero-papers-tv-api.herokuapp.com";
const week_calender_api_url = API_BASE_URL + "/api/week-calendar";
const news_api_url = API_BASE_URL + "/api/news";
const planning_api_url = API_BASE_URL + "/api/planning";

function HomePage() {
  const dateTimeElement = document.querySelector(".time-date");
  const dateTimeTimer = () => {
    const date = new Date();
    dateTimeElement.innerHTML = `<i class="bi bi-clock-fill"></i> ${date.toUTCString()}`;
  };
  setInterval(dateTimeTimer, 1000);
  const eventsContainerElement = document.querySelector(".events__inner");
  eventsContainerElement.innerHTML = "";
  fetch(week_calender_api_url)
    .then((res) => res.json())
    .then((res) => {
      if (res.status && res.status === 200) {
        const data = res.data;
        for (const { day, events } of data) {
          if (events.length) {
            eventsContainerElement.innerHTML += `
                  <div class="events__event">
                    <div class="events__inner">
                      <h5>${day}</h5>
                      <ul>
                        ${events.map(
                          ({ start_time, end_time, content }) =>
                            `<li>${start_time} - ${end_time} ${content}</li>`
                        )}
                      </ul>
                    </div>
                  </div>
              `;
          }
        }
      }
    });
}

function PlaningPage() {
  const planningContainer = document.querySelector(".planning__table");
  planningContainer.innerHTML = "";
  let currentIndx = 0;
  fetch(planning_api_url)
    .then((res) => res.json())
    .then(({ data }) => {
      console.log(data);
      data.forEach(({ name, file }) => {
        planningContainer.innerHTML += `<img src="${
          API_BASE_URL + "/" + file
        }"/>`;
      });
      const imgs = document.querySelectorAll(".planning__table img");
      console.log(imgs);
      imgs[currentIndx].classList.add("show");

      setInterval(() => {
        imgs.forEach((img, idx) => {
          img.classList.remove("show");
        });
        imgs[currentIndx].classList.add("show");
        currentIndx = (currentIndx + 1) % imgs.length;
        console.log(currentIndx);
      }, 8000);
    });
}
function MapPage() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibmFzLWVtYmFkIiwiYSI6ImNrNHZ3NWNsZzBhcGUza3JwYzgwMnI2bjcifQ.3-qlI_rVEJG7RyF7GF52Eg";
  let map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/nas-embad/ck462buq40ojb1dpp27g0xau0",
    center: [-2.234, 31.603],
    zoom: 15.76,
  });
}

const newsContainer = document.querySelector(".scroll__inner");
newsContainer.innerHTML = "";
fetch(news_api_url)
  .then((res) => res.json())
  .then(({ data }) => {
    const news = [...data]
      .map((d) => d.content)
      .join("<div class='dot'></div>");
    console.log(news);
    newsContainer.innerHTML = news;
  });
