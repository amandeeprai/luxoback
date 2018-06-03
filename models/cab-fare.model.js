class CabFareModel {
    constructor(cabFare) {
        this.flagFallFare = cabFare.flagFallFare;
        this.distanceFare = cabFare.distanceFare;
        this.bookingFees = cabFare.bookingFees;
        this.premiumServiceCharge = cabFare.premiumServiceCharge;
        this.pickupFromAirportCharge = cabFare.pickupFromAirportCharge;
        this.totalFare = cabFare.totalFare;
        this.fareType = cabFare.fareType;
        this.gstOnElectronicPayment = cabFare.gstOnElectronicPayment;
        this.serviceType = cabFare.serviceType;
        this.limit = cabFare.limit;
        this.imgURL = cabFare.imgURL;
        this.cabName = cabFare.cabName;
        this.serviceFee = cabFare.serviceFee;
    }
}
module.exports = CabFareModel;