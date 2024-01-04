export default class WearingItems {
    constructor(_itemArray) {
        this.itemArray = []
    }

    updateWearingItem(newItem) {
        const index = this.itemArray.findIndex(item => item.type === newItem.type)
        if (index !== -1) {
            // Item of the same type exists, update it
            this.itemArray[index] = newItem;
        } else {
            // New item, push it to the array
            this.itemArray.push(newItem);
        }
    }

    // Method to get the items array
    getWearingItems() {
        return this.itemArray;
    }
}