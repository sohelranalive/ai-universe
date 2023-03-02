const fetchData = async (contentCount) => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    const res = await fetch(url);
    const data = await res.json();
    showContent(data.data.tools, contentCount);
}

const showContent = (data, contentCount) => {
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerText = '';
    const showAll = document.getElementById('show-all');
    if (contentCount && data.length > 6) {
        data = data.slice(0, 6);
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none')
    }

    data.forEach(singleData => {
        // console.log(singleData);
        const { id, image, features, name, published_in } = singleData
        const singleDataContainer = document.createElement('div');
        singleDataContainer.classList.add('col');
        singleDataContainer.innerHTML =
            `<div class="card h-100 p-3">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title fw-bold">Features</h5>
                <p class="card-text">${features}</p>
            </div>
            <div class="card-footer bg-white">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 class="fw-bold">${name}</h5>
                        <small class="text-muted">${published_in}</small>
                    </div>
                    <div>
                        <button onclick="contentDetails('${id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#contentDetailsModal">
                            <i class="fa-solid fa-arrow-right"></i>
                          </button>
                    </div>
                </div>
            </div>
    </div>`;
        dataContainer.appendChild(singleDataContainer);
    });
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

const showContentDetails = (data) =>{
    console.log(data);
    const {description, pricing} = data
    const modeContentArea = document.getElementById('modal-content')
    modeContentArea.innerHTML = `
    <div class="row row-cols-1 row-cols-md-2 g-4 modal-main-div">
    <div class="col">
      <div class="card h-100">
        <div class="card-body">
          <div><h6 class="card-title">${description}</h6></div>
          <div class="d-flex justify-content-between align-items-center">
            <div>${pricing[0].plan}</div>
            <div></div>
            <div></div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card h-100">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a short card.</p>
        </div>
      </div>
    </div>
  </div>
    `
    
}


fetchData(6);
