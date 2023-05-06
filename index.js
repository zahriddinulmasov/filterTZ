"use strict";

const elJobsSelectedWrapper = document.querySelector(".main__selected");
const elJobsSelectedBtn = document.querySelector(".main__selected-btn");

elJobsSelectedWrapper.style.display = "none";

const elJobsSelected = document.querySelector(".main__selected-list");
const elSelectedTemplate = document.querySelector(
  ".main__selected-template"
).content;

const elJobsList = document.querySelector(".main__list");
const elJobsTemplate = document.querySelector(".jobs__item").content;

const jobsArr = [];
const selectedArr = [];

const commonElements = [];

function renderJobs(array, wrapper) {
  wrapper.innerHTML = null;
  const fragment = document.createDocumentFragment();

  for (const item of array) {
    if (!commonElements.includes(item.role && item.level)) {
      commonElements.push(item.role, item.level, ...item.languages);
    }

    const jobsTemplate = elJobsTemplate.cloneNode(true);

    jobsTemplate.querySelector(".main__item-img").src = item.logo;
    jobsTemplate.querySelector(".main__item-name").textContent = item.company;
    jobsTemplate.querySelector(".main__item-span-new").style.display =
      item.new === true ? " block" : " none";
    jobsTemplate.querySelector(".main__item-span-featured").style.display =
      item.featured === true ? " block" : " none";
    jobsTemplate.querySelector(".main__item-title").textContent = item.position;
    jobsTemplate.querySelector(".experience").textContent = item.postedAt;
    jobsTemplate.querySelector(".type-work").textContent = item.contract;
    jobsTemplate.querySelector(".address").textContent = item.location;

    jobsTemplate.querySelector(".main__item-role").textContent = item.role;
    jobsTemplate.querySelector(".main__item-level").textContent = item.level;

    jobsTemplate.querySelector(".main__item-language0").textContent =
      item.languages[0];
    jobsTemplate.querySelector(".main__item-language0").dataset.jobId0 =
      item.id;

    jobsTemplate.querySelector(".main__item-language1").textContent =
      item.languages[1];
    jobsTemplate.querySelector(".main__item-language1").dataset.jobId1 =
      item.id;

    jobsTemplate.querySelector(".main__item-language2").textContent =
      item.languages[2];
    jobsTemplate.querySelector(".main__item-language2").dataset.jobId2 =
      item.id;

    if (!jobsTemplate.querySelector(".main__item-language0").textContent) {
      jobsTemplate.querySelector(".main__item-language0").style.display =
        "none";
    }
    if (!jobsTemplate.querySelector(".main__item-language1").textContent) {
      jobsTemplate.querySelector(".main__item-language1").style.display =
        "none";
    }
    if (!jobsTemplate.querySelector(".main__item-language2").textContent) {
      jobsTemplate.querySelector(".main__item-language2").style.display =
        "none";
    }

    fragment.appendChild(jobsTemplate);
  }

  wrapper.appendChild(fragment);
}
renderJobs(data, elJobsList);

elJobsList.addEventListener("click", function (evt) {
  const currentTechnology = evt.target.textContent;

  if (
    commonElements.includes(currentTechnology) &&
    !selectedArr.includes(currentTechnology)
  ) {
    elJobsSelectedWrapper.style.display = "flex";

    selectedArr.push(currentTechnology);

    const foundJobs = data.filter(
      (item) =>
        item.level === currentTechnology ||
        item.role === currentTechnology ||
        item.languages.includes(currentTechnology)
    );

    jobsArr.splice(0);
    jobsArr.push(...foundJobs);

    renderJobs(jobsArr, elJobsList);
  }

  renderSelected(selectedArr, elJobsSelected);
});

const renderSelected = function (array, wrapper) {
  const fragment = document.createDocumentFragment();

  for (const item of array) {
    const selectedTemplate = elSelectedTemplate.cloneNode(true);

    selectedTemplate.querySelector(".main__selected-title").textContent = item;
    selectedTemplate.querySelector(
      ".main__selected-close"
    ).dataset.selectedDeleteId = array.indexOf(item);

    fragment.appendChild(selectedTemplate);
  }

  elJobsSelected.innerHTML = null;
  wrapper.appendChild(fragment);
};

renderSelected(selectedArr, elJobsSelected);

elJobsSelected.addEventListener("click", function (evt) {
  const currentDeleteBtn = evt.target.dataset.selectedDeleteId * 1;

  if (currentDeleteBtn + 1 > 0) {
    selectedArr.splice(currentDeleteBtn, 1);
    renderJobs(jobsArr, elJobsList);
    renderSelected(selectedArr, elJobsSelected);
  }
  if (selectedArr.length === 0) {
    elJobsSelectedWrapper.style.display = "none";
    renderJobs(data, elJobsList);
  }
});

elJobsSelectedBtn.addEventListener("click", function (evt) {
  if (evt.target.textContent === "Clear") {
    elJobsSelectedWrapper.style.display = "none";
  }

  selectedArr.splice(0);
  renderSelected(selectedArr, elJobsSelected);
  renderJobs(data, elJobsList);
});
