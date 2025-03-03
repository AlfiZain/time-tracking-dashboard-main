document.addEventListener("DOMContentLoaded", () => {
  const dailyButton = document.getElementById("daily-button");
  const weeklyButton = document.getElementById("weekly-button");
  const monthlyButton = document.getElementById("monthly-button");
  showCards("weekly");

  dailyButton.addEventListener("click", () => {
    showCards("daily");
  });
  weeklyButton.addEventListener("click", () => {
    showCards("weekly");
  });
  monthlyButton.addEventListener("click", () => {
    showCards("monthly");
  });
});

const showCards = (timeframe) => {
  const dailyButton = document.getElementById("daily-button");
  const weeklyButton = document.getElementById("weekly-button");
  const monthlyButton = document.getElementById("monthly-button");
  const timeList = document.querySelector(".time-list");

  monthlyButton.classList.remove("selected");
  weeklyButton.classList.remove("selected");
  dailyButton.classList.remove("selected");

  timeList.innerHTML = "";
  fetch("/data.json")
    .then((response) => {
      if (!response.ok) return console.log("Something went wrong.");

      return response.json();
    })
    .then((data) => {
      data.forEach((item) => {
        appendItem(item, timeframe);
      });
    });

  const appendItem = (item, timeframe) => {
    let previousLabel = "";
    switch (timeframe) {
      case "daily":
        previousLabel = "Yesterday";
        dailyButton.classList.add("selected");
        break;
      case "weekly":
        previousLabel = "Last Week";
        weeklyButton.classList.add("selected");
        break;
      case "monthly":
        previousLabel = "Last Month";
        monthlyButton.classList.add("selected");
        break;
    }

    timeList.innerHTML += `
      <div class="card ${item.title.toLowerCase()}">
        <div class="card-header">
            <img src="../images/icon-${item.title.toLowerCase()}.svg" />
        </div>
        <div class="card-content">
          <div>
            <p class="title">${item.title}</p>
            <img src="./images/icon-ellipsis.svg" alt="icon-ellipsis" />
          </div>
          <div class="timeframe">
            <p class="current">${item.timeframes[timeframe].current}hrs</p>
            <p>${previousLabel} - ${item.timeframes[timeframe].previous}hrs</p>
          </div>
        </div>
      </div>
    `;
  };
};
