let allFetchedData = [];

const fetchData = async (contentCount) => {

  // Loader spinner start
  toggleLoader(true)

  const url = 'https://openapi.programming-hero.com/api/ai/tools';
  const res = await fetch(url);
  const data = await res.json();
  showContent(data.data.tools, contentCount);
}

const showContent = (data, contentCount) => {
  const dataContainer = document.getElementById('data-container');
  dataContainer.innerText = '';
  const showAll = document.getElementById('show-all');

  allFetchedData = data;

  if (contentCount && data.length > 6) {
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
                    <small class="text-muted">${published_in}</small>
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
}

const showAllContent = () => {
  fetchData();
}

const contentDetails = (detailsId) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${detailsId}`
  fetch(url)
    .then(res => res.json())
    .then(data => showContentDetails(data.data))
}

const showContentDetails = (data) => {
  //console.log(data);
  const { description, pricing, features, integrations, image_link, input_output_examples, accuracy } = data
  const modeContentArea = document.getElementById('modal-content')
  modeContentArea.innerHTML =
    `<div class="row row-cols-1 row-cols-md-2 g-4 modal-main-div">
    <!-- Inside Modal Pricing Area -->
    <div class="col">
        <div class="card h-100 p-2 price-area">
            <div class="card-body d-flex flex-column justify-content-between">
                <div class="pb-4">
                    <h5 class="card-title fw-bold">${description ? description : 'no data found'}</h5>
                </div>
                <div class="d-flex justify-content-between align-items-center pb-4 price-box-area">
                    ${pricing ? pricing.map(element =>
      `<div class="w-100 price-box mx-1">${element.price && element.price != 0 ? element.price :
        'free'}<br>${element.plan.toLowerCase() === 'free'.toLowerCase() ? 'Basic' : element.plan}</div>`
    ).join('') : 'No Data Found'}
                </div>
                <div class="d-flex">
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
  

    <div class="card h-100 p-3">
    <div class="d-flex flex-column justify-content-between align-items-center h-100">
      <div class="details-modal-img-div">
      <div>${accuracy.score? `<div class="accuracy-banner">${accuracy.score} % accuracy</div>`: ''}</div>
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

const showDetailsFeatures = (features) => {
  let detailFeaturesList = [];
  for (const key in features) {
    console.log(`${features[key].feature_name}`);
    detailFeaturesList.push(`<li>${features[key].feature_name}</li>`);
  }
  return detailFeaturesList.join('');
}

document.getElementById('sortByDate').addEventListener('click', function () {
  const sortByDate = allFetchedData => {
    const sorter = (a, b) => {
      return new Date(a.published_in) - new Date(b.published_in);
    }
    allFetchedData.sort(sorter);
  };
  sortByDate(allFetchedData);

  showContent(allFetchedData)
})


const toggleLoader = isLoading => {
  const loaderSpinner = document.getElementById('loader')
  if (isLoading) {
    loaderSpinner.classList.remove('d-none')
  }
  else {
    loaderSpinner.classList.add('d-none')
  }
}


fetchData(6);

// This function will return random color
// function randomColor() {
//   let color = [];
//   for (let i = 0; i < 3; i++) {
//       color.push(Math.floor(Math.random() * 256));
//   }
//   return 'rgb(' + color.join(', ') + ')';
// }