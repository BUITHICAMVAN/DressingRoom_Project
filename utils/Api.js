export default class Api {
    fetchData() {
        return axios({
            url: "../data/Data.json",
            method: "GET"
        })
    }    
}