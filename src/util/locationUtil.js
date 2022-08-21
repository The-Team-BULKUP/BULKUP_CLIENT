export const LocationUtils = {
    getLocation: async () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    },

    isAvailable: async () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                resolve(true);
            } else {
                reject(false);
            }
        });
    }
}