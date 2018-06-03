var CustomError = require("../error-handlers/custom-error")
var FareModel = require("../models/fare.model")
var RideInfoModel = require("../models/ride-info.model")
var moment = require("moment");
var FARE_CONSTANTS = require("../constants/fare-constants")

checkFare = (req, res, next) => {
        console.log("Check Fare called and req.body is ", req.body)
        let rideInfo = new RideInfoModel(req.body);
        checkFareType(rideInfo, res)
            //res.send(rideInfo)
    }
    //0,1,2,3,4,5,6
    //Days Sunday-Monday => 0-6
checkFareType = (rideInfo, res) => {
    let pickupDate = moment(rideInfo.pickupDate).format("YYYY-MM-DD")
    console.log("pickupDate is ", pickupDate)
    let pickupTime = moment(pickupDate + " " + rideInfo.pickupTime, 'YYYY-MM-DD HH:mm');
    console.log("pickupTime is ", pickupTime)
    let day = moment(rideInfo.pickupDate).day()
    console.log("day is ", day)
    let afterDayFareTime = moment(pickupDate + " 09:00", 'YYYY-MM-DD HH:mm');
    let beforeDayFareTime = moment(pickupDate + " 17:00", 'YYYY-MM-DD HH:mm');
    console.log("afterDayFareTime is ", afterDayFareTime)
    console.log("beforeDayFareTime is ", beforeDayFareTime)
    if (pickupTime.isBetween(afterDayFareTime, beforeDayFareTime)) {
        console.log("pickup time is between in 09-17")
            //Handle Day Fare
        handleDayFare(pickupDate, pickupTime, rideInfo, res)
    } else {
        console.log("pickup time is not between in 09-17")
            //Handle overnight fare and peak fare
        if (day == 5 || day == 6) {
            //Handle overnight fare and peak fare
            //Check night time from 10pm to 00
            let afterPeakFareTime = moment(pickupDate + " 22:00", 'YYYY-MM-DD HH:mm');
            let beforePeakFareTime = moment(pickupDate + " 00:00", 'YYYY-MM-DD HH:mm').add(1, 'days');
            //Check night time from 00pm to 04
            let afterPeakFareTime1 = moment(pickupDate + " 00:00", 'YYYY-MM-DD HH:mm');
            let beforePeakFareTime1 = moment(pickupDate + " 04:00", 'YYYY-MM-DD HH:mm');
            if (pickupTime.isBetween(afterPeakFareTime, beforePeakFareTime)) {
                //Handle peak fare
                console.log("handle peak hour between 10-00")
                handlePeakFare(pickupDate, pickupTime, rideInfo, res)
            } else if (pickupTime.isBetween(afterPeakFareTime1, beforePeakFareTime1)) {
                //Handle peak fare
                console.log("handle peak hour between 00-04")
                handlePeakFare(pickupDate, pickupTime, rideInfo, res)
            } else {
                //Handle overnight fare
                console.log("handle overnight hour between 17-09")
                handleOvernightFare(pickupDate, pickupTime, rideInfo, res)
            }
        } else {
            //Handle overnight fare
            console.log("handle overnight hour between 17-09")
            handleOvernightFare(pickupDate, pickupTime, rideInfo, res)
        }
    }

}

handleDayFare = (pickupDate, pickupTime, rideInfo, res) => {
    console.log("Inside handleDayFare")
    calculateFareByFareType(FARE_CONSTANTS.DAYFARE, pickupDate, pickupTime, rideInfo, res)
}

handleOvernightFare = (pickupDate, pickupTime, rideInfo, res) => {
    console.log("Inside handleOvernightFare")
    calculateFareByFareType(FARE_CONSTANTS.OVERNIGHT_FARE, pickupDate, pickupTime, rideInfo, res)
}

handlePeakFare = (pickupDate, pickupTime, rideInfo, res) => {
    console.log("Inside handlePeakFare")
    calculateFareByFareType(FARE_CONSTANTS.PEAK_FARE, pickupDate, pickupTime, rideInfo, res)
}

calculateFareByFareType = (fareType, pickupDate, pickupTime, rideInfo, res) => {
    FareModel.findOne({ fareType: fareType }).then(
        (data) => {
            console.log("Data is ", data)
            let totalFare = 0;
            let distance = Number(rideInfo.totalDistance.split(" ").shift());
            let distanceFare = data.distanceFare * distance;
            let flagFallFare = data.flagFallFare;
            let bookingFees = data.bookingFees;
            let premiumServiceCharge = data.premiumServiceCharge;
            let pickupFromAirportCharge = 0;
            totalFare = totalFare + flagFallFare;
            totalFare = totalFare + distanceFare;
            totalFare = totalFare + bookingFees;
            totalFare = totalFare + premiumServiceCharge;
            if (rideInfo.serviceType == FARE_CONSTANTS.FROM_AIRPORT) {
                pickupFromAirportCharge = data.pickupFromAirportCharge;
                totalFare = totalFare + data.pickupFromAirportCharge;
            }
            let wagonFare = createFareObject(flagFallFare, distanceFare, bookingFees, premiumServiceCharge, pickupFromAirportCharge, totalFare, data.fareType, data.gstOnElectronicPayment, rideInfo.serviceType, 4, FARE_CONSTANTS.WAGON_IMG_URL, FARE_CONSTANTS.WAGON)
            let sedanFare = createFareObject(flagFallFare, distanceFare, bookingFees, premiumServiceCharge, pickupFromAirportCharge, totalFare, data.fareType, data.gstOnElectronicPayment, rideInfo.serviceType, 4, FARE_CONSTANTS.SEDAN_IMG_URL, FARE_CONSTANTS.SEDAN)
            let maxiTaxiFare = createFareObject(flagFallFare, distanceFare, bookingFees, premiumServiceCharge, pickupFromAirportCharge, totalFare + data.maxiTaxiFare, data.fareType, data.gstOnElectronicPayment, rideInfo.serviceType, 10, FARE_CONSTANTS.MAXI_TAXI_IMG_URL, FARE_CONSTANTS.MAXI_TAXI)
            let finalFareList = [wagonFare, sedanFare, maxiTaxiFare];
            console.log("finalFareList is ", finalFareList)
            let finalData = {
                rideInfo: rideInfo,
                finalFareList: finalFareList
            }
            res.send(finalData)
        }
    ).catch(
        (error) => {
            console.log("Error is ", error)
            throw new CustomError("Error while fetching fare by " + fareType, 500)
        }
    )
}

createFareObject = (flagFallFare, distanceFare, bookingFees, premiumServiceCharge, pickupFromAirportCharge, totalFare, fareType, gstOnElectronicPayment, serviceType, limit, imgURL, cabName) => {
    let fareObject = {
        flagFallFare: flagFallFare,
        distanceFare: distanceFare,
        bookingFees: bookingFees,
        premiumServiceCharge: premiumServiceCharge,
        pickupFromAirportCharge: pickupFromAirportCharge,
        totalFare: totalFare,
        fareType: fareType,
        gstOnElectronicPayment: gstOnElectronicPayment,
        serviceType: serviceType,
        limit: limit,
        imgURL: imgURL,
        cabName: cabName,
        serviceFee: 5
    };
    return fareObject;
}

module.exports = {
    checkFare
}