import Api from "../utils/Api.js";

const getEle = (id) => document.getElementById(id);

const api = new Api();

const renderUI = (data) => {
    const contentHTML = data.reduce((content, item) => {
        return (
            content += ``
        )
    }, "")

    getEle("").innerHTML = contentHTML
}

/**
 * HANDLE ITEM TAB
 */
const tabs = document.querySelectorAll("#pills-tab a");
// receive item tab click event
tabs.forEach(tab => {
    tab.addEventListener('click', function (event) {

        // Prevent default action
        event.preventDefault()

        // get list item
        // pass in a tag id
        fetchAndRenderList(this.id)
    })
})

/**
 * GET ITEM LIST
 */
const fetchAndRenderList = (itemId) => {
    api.fetchData()
        .then((response) => {
            // hold axios response in items as json data
            const items = response.data
            const tabPanes = items.tabPanes
            // store items that 
            const matchedItems = tabPanes.filter(tab => {
                // console.log(tab.type)
                return tab.type === itemId
            })
            // console.log(matchedItems)
        })
        .catch((error) => console.log('Error: ', error));
}
