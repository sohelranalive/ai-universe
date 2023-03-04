let allFetchedData = [];


// fetched all data from API
const fetchData = async (contentCount) => {
  // Loader spinner start
  toggleLoader(true)

  const url = 'https://openapi.programming-hero.com/api/ai/tools';
  const res = await fetch(url);
  const data = await res.json();
  showContent(data.data.tools, contentCount);
}

// show data faced from API
const showContent = (data, contentCount) => {
  const dataContainer = document.getElementById('data-container');
  dataContainer.innerText = '';
  const showAll = document.getElementById('show-all');

  if (data.length >= 6 && contentCount) {
    data = data.slice(0, 6);
    showAll.classList.remove('d-none')
  }
  else {
    showAll.classList.add('d-none')
  }

  data.forEach(singleData => {
    const { id, image, name, features, published_in } = singleData;
    const singleDataContainer = document.createElement('div');
    singleDataContainer.classList.add('col');
    singleDataContainer.innerHTML =
      `<div class="card h-100 p-4">
        <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Features</h5>
              <p class="card-text">
              <ol>${features.map(feature => `<li>${feature}</li>`).join('')}</ol>
              </p>
            </div>
            <div class="card-footer bg-white">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="fw-bold">${name}</h5>
                    <small class="text-muted"><i class="fa-solid fa-calendar-days"></i> ${published_in}</small>
                </div>
                <div>
                <button onclick="contentDetails('${id}')" type="button" class="btn btn-light details-btn-style" data-bs-toggle="modal" data-bs-target="#contentDetailsModal">
                    <i class="fa-solid fa-arrow-right details-arrow"></i>
                  </button>
                </div>
            </div>
          </div>`;
    dataContainer.appendChild(singleDataContainer);
  });
  // Loader spinner start
  toggleLoader(false)
  allFetchedData = data;
}

// show all data
const showAllContent = () => {
  fetchData();
}

// fetched single data details as per content id
const contentDetails = (detailsId) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${detailsId}`
  fetch(url)
    .then(res => res.json())
    .then(data => showContentDetails(data.data))
}

// Show single data details as per content id
const showContentDetails = (data) => {
  const { description, pricing, features, integrations, image_link, input_output_examples, accuracy } = data
  const modeContentArea = document.getElementById('modal-content')
  modeContentArea.innerHTML =
    `<div class="row row-cols-1 row-cols-md-2 g-4 modal-main-div">
    <!-- Inside Modal Pricing Area -->
    <div class="col">
        <div class="card h-100 p-2 price-area overflow-auto">
            <div class="card-body d-md-flex flex-column justify-content-between">
                <div class="pb-4">
                    <h5 class="card-title fw-bold">${description ? description : 'no data found'}</h5>
                </div>
                
                <div class="d-md-flex justify-content-between align-items-center pb-2 price-box-area">
                <div class="price-box color1">${pricing? `${pricing[0].price != 0 ? pricing[0].price:'No Cost'}<br>${pricing[0].plan === 'Basic'? pricing[0].plan:'Basic'}` :'No Data'}</div>

                <div class="price-box color2">${pricing? `${pricing[1].price != 0 ? pricing[1].price:'No Cost'}<br>${pricing[1].plan}` :'No Data'}</div>

                <div class="price-box color3">${pricing? `${pricing[2].price != 0 ? pricing[2].price:'No Cost'}<br>${pricing[2].plan}` :'No Data'}</div>
                </div>
                
                <div class="d-md-flex">
                    <div class="w-100">Features:
                        <ul>${showDetailsFeatures(features)}</ul>
                    </div>
                    <div class="w-100 ps-2">Integrations:
                        <ul>${integrations ? integrations.map(element => `<li>${element}</li>`).join('') : 'No Data Found'}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Inside Modal Image & demo answers Area -->
    <div class="col">
    <div class="card h-100 p-3 details-area overflow-auto">
    <div class="d-md-flex flex-column justify-content-between align-items-center h-100">
      <div class="details-modal-img-div">
      <div class="accuracy-banner">${accuracy.score ? `<small>${accuracy.score*100} % accuracy</small>` : ''}</div>
        <img src="${image_link[0] ? image_link[0] : image_link[1]}" class="card-img-top img-size" alt="...">
      </div>
      <div class="details-modal-text-div">
        <div class="pt-4">${input_output_examples ?
      `<h5 class="card-title text-center">${input_output_examples[0].input}</h5>
          <p class="card-text text-center">${input_output_examples[0].output}</p>` : 'No Data found'}
        </div>
      </div>
    </div>
  </div>
    </div>
</div>`
}

// iterate features array and return data
const showDetailsFeatures = (features) => {
  let detailFeaturesList = [];
  for (const key in features) {
    detailFeaturesList.push(`<li>${features[key].feature_name}</li>`);
  }
  return detailFeaturesList.join('');
}

// Sort all data ascending order
function sortDataByDate() {
  allFetchedData.sort((obj1, obj2) => new Date(obj1.published_in) - new Date(obj2.published_in));
  if (allFetchedData.length === 6) {
    showContent(allFetchedData, allFetchedData.length);
  }
  else {
    showContent(allFetchedData);
  }
}

// Loader/Spinner function
const toggleLoader = isLoading => {
  const loaderSpinner = document.getElementById('loader')
  if (isLoading) {
    loaderSpinner.classList.remove('d-none')
  }
  else {
    loaderSpinner.classList.add('d-none')
  }
}

// fetched data on page load
fetchData(6);