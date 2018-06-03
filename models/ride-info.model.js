class RideInfo {

    constructor(rideInfo) {
        this.pickupLocation = new GeoLocation(rideInfo.pickupLocation.latitude, rideInfo.pickupLocation.longitude);
        this.destinationLocation = new GeoLocation(rideInfo.destinationLocation.latitude, rideInfo.destinationLocation.longitude);
        this.pickupAddress = rideInfo.pickupAddress;
        this.destinationAddress = rideInfo.destinationAddress;
        this.passengers = rideInfo.passengers;
        this.pickupDate = rideInfo.pickupDate;
        this.pickupTime = rideInfo.pickupTime;
        this.serviceType = rideInfo.serviceType;
        this.totalDistance = rideInfo.totalDistance;
    }
}

class GeoLocation {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

module.exports = RideInfo;