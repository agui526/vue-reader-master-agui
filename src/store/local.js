const localEvent = {
    storageGetter(key) {
        return JSON.parse(localStorage.getItem(key))
    },
    storageSetter(key, val) {
        return localStorage.setItem(key, JSON.stringify(val))
    }
}

export default localEvent