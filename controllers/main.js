const getEle = (id) => document.getElementById(id)

const api = new Api()

const test = getEle("pills-tab")

test.onclick = function() {
    console.log(test)
}