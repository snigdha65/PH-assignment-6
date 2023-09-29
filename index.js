// Define a variable to keep track of the number of displayed features.
let displayFeatures = 6;

// Function to fetch data from the API
const fetchData = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => showTools(data.data.tools.slice(0, displayFeatures)));
};

// Function to display the tools
const showTools = (tools) => {
  const toolsContainer = document.getElementById("features");
  toolsContainer.innerHTML = "";

  tools.forEach((tool, idx) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("col-md-6", "col-lg-4");

    const imageURL = tool.image
      ? tool.image
      : "https://picsum.photos/200/300?grayscale";

    cardElement.innerHTML = `
      <div class="card p-3 rounded-lg card-wrapper">
        <img src="${imageURL}" alt="toolImg" class="card-img-top featuresImg" />
        <div class="card-body">
          <h2 class="">Features</h2>
          <ol class="list-group">
            <li class="">${tool.features[0]}</li>
            <li class="">${tool.features[1]}</li>
            <li class="">${tool.features[2]}</li>
          </ol>
        </div>
        <div class="features_published">
          <div>
            <h5 class="card-title">${tool.name}</h5>
            <div class="d-flex gap-2">
              <i class="fa-regular fa-calendar-days"></i>
              <p>${tool.published_in}</p>
            </div>
          </div>
          <div>
            <i class="fas fa-arrow-right"
               onclick="fetchFeatureDetail(${tool.id})"
               style="color: red;"
               data-bs-toggle="modal"
               data-bs-target="#exampleModal">
            </i>
          </div> 
        </div>
      </div>
    `;

    toolsContainer.appendChild(cardElement);
  });
};

// Fetch initial data
fetchData();

// Function to fetch feature details
const fetchFeatureDetail = (id) => {
  let url = `https://openapi.programming-hero.com/api/ai/tool/0${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showFeatureDetails(data.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

// Function to display feature details
const showFeatureDetails = (data) => {
  document.getElementById("modal-body").innerHTML = `
    <div class="d-flex gap-4">
      <div class="card" style="background-color: rgb(230, 227, 227);">
        <div class="card-body">
          <h5 class="card-title">${data.description}</h5>
          <div class="pricing-wrapper">
            <div class="pricing" style="color: green;">${data.pricing[0].plan} </br> ${data.pricing[0].price} </div>
            <div class="pricing" style="color: orange;">${data.pricing[1].plan} </br> ${data.pricing[1].price} </div>
            <div class="pricing" style="color: red;">${data.pricing[2].plan} </br> ${data.pricing[2].price} </div>
          </div>
          <div class="d-flex gap-6">
            <div>
              <h3>Features</h3>
              <ul class="list-group li">
                <li class="">${data.features[1].feature_name}</li>
                <li class="">${data.features[2].feature_name}</li>
                <li class="">${data.features[3].feature_name}</li>
              </ul>
            </div>
            <div>
              <h3>Integrations</h3>
              <ul class="list-group li-2">
                <li class="">${data.integrations[0]}</li>
                <li class="">${data.integrations[1]}</li>
                <li class="">${data.integrations[2]}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <img class="img-field" src="${data.image_link[0]}" class="card-img-top" alt="...">
        <p class="accuracy">${data.accuracy.score} accuracy</p>
        <div class="card-body">
          <h5 class="card-title">${data.input_output_examples[0].input}</h5>
          <p class="card-text">${data.input_output_examples[0].output}</p>
        </div>
      </div>
    </div> 
  `;
};

// Event listener for "View All" button
document.getElementById("Show-all").addEventListener("click", () => {
  displayFeatures += 6;
  fetchData();
});
