import Api from "../utils/Api.js";

const getEle = (id) => document.getElementById(id);

const api = new Api();

/**
 * HANDLE ITEM TAB
 */
const tabs = document.querySelectorAll("#pills-tab a");
// receive item tab click event
tabs.forEach((tab) => {
    tab.addEventListener("click", function (event) {
        // Prevent default action
        event.preventDefault();
        // get list item
        // pass in a tag id
        fetchAndRenderList(this.id);
    });
});

// This line will ensure the default tab is loaded once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    fetchAndRenderList('topclothes'); // Replace 'topclothes' with the id of the default tab you want to load
});

/**
 * GET ITEM LIST
 */
const fetchAndRenderList = (itemId) => {
    api
        .fetchData()
        .then((response) => {
            // hold axios response in items as json data
            const items = response.data;
            const tabPanes = items.tabPanes;
            // store items that
            const matchedItems = tabPanes.filter((tab) => {
                // console.log(tab.type)
                return tab.type === itemId;
            });
            renderUI(matchedItems);
            // console.log(matchedItems)
        })
        .catch((error) => console.log("Error: ", error));
};

const renderUI = (data) => {
    const contentHTML = data.reduce((content, item) => {
        return (content += `
        <div class="items-container">            
            <div class="item">
                <div class="item-name">${item.name}</div>
                <img src="${item.imgSrc_jpg}" alt="${item.name}">
                <p class="item-desc">${item.desc}</p>
            </div>
        </div>
        `);
    }, "");

    getEle("pills-tabContent").innerHTML = contentHTML;
};
