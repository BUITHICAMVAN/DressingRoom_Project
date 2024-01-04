import WearingItems from "../models/WearingItems.js";
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
        filterAndRenderItems(this.id);
    });
});

// This line will ensure the default tab is loaded once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    filterAndRenderItems('topclothes');
});

/**
 * GET ALL ITEMS
 */
const getItems = () => {
    return api
        .fetchData()
        .then((response) =>  {return response.data.tabPanes})
        .catch((error) => console.log("Error: ", error));
}

/**
 * Filter ITEMS 
 */
const filterAndRenderItems = (itemId) => {
    getItems().then((items) => {
        const matchedItems = items.filter((tab) => tab.type === itemId);
        renderUI(matchedItems);
        // console.log(matchedItems)
    })
};

/**
 * Render ITEMS on screen
 */
const renderUI = (data) => {
    const contentHTML = data.reduce((content, item) => {
        return (content += `
        <div class="items-container">            
            <div class="item" data-id=${item.id} data-type=${item.type}>
                <div class="item-name">${item.name}</div>
                <img src="${item.imgSrc_jpg}" alt="${item.name}">
                <p class="item-desc">${item.desc}</p>
            </div>
        </div>
        `);
    }, "");
    getEle("pills-tabContent").innerHTML = contentHTML;
    
    handleItemPicked()
};

let itemsWearing = new WearingItems()
/**
 * Handle itemPicked
 */
const handleItemPicked = () => {
    const itemsPicked = document.querySelectorAll(".items-container .item")
    itemsPicked.forEach((itemPicked) => {
        itemPicked.addEventListener("click", function(event) {
            console.log(itemPicked)
            //get the type of the clicked product
            const itemType = this.getAttribute('data-type')
            console.log(itemType)
            const itemId = this.getAttribute('data-id')
            console.log(itemId) 

            // Create an item object
            const newItem = {
                id: itemId,
                type: itemType
            }
            console.log("newItem: ", newItem)

            // update items array
            itemsWearing.updateWearingItem(newItem)

            // wear those items on model
            wearOnModel()
        })
    })
}

/** 
 * Wear on model
 */
const wearOnModel = (bodyParts) => {
    // // Assuming you have a specific element for the model's body
    // const modelBody = getEle("model-body");
    // let itemHTML = '';

    // // Get the current items from itemsWearing
    // const currentItems = itemsWearing.getWearingItems();
    // currentItems.forEach(item => {
    //     // Construct HTML for each item. Update this according to your HTML structure.
    //     itemHTML += `<div class="wearing-item" id="${item.id}">${item.type}</div>`;
    // });

    // // Update the model's HTML
    // modelBody.innerHTML = itemHTML;

    console.log("Wore items")
};