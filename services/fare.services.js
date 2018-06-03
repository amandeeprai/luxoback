// checkFare = function(req, res, next) {
//         var distance = wait.for.function(Fare.getDistance,req.body.pickup,req.body.dropoff,req.body.state);
//         Fare.getFares(function(err,fare){
//         if (err) {
//             throw err;
//         }
//         var flagfare9_17 = '';
//         var distancefare9_17 = '';
//         var basefare9_17 = '';
//         var flagfare17_9 = '';
//         var distancefare17_9 = '';
//         var basefare17_9 = '';
//         var flagfare22_4 = '';
//         var distancefare22_4 = '';
//         var basefare22_4 = '';
//         var maxitaxi = '';
//         var gstf = '';

//         fare && fare.map((index) => {
//             if(index.type === "MonSun9_17"){
//                     flagfare9_17 = index.flagfare;
//                     distancefare9_17 = index.distancefare;
//                     basefare9_17 = index.basefare;
//             }
//             if(index.type === "MonSun17_9"){
//                 flagfare17_9 = index.flagfare;
//                 distancefare17_9 = index.distancefare;
//                 basefare17_9 = index.basefare;
//             }
//             if(index.type === "FriSat22_4"){
//                 flagfare22_4 = index.flagfare;
//                 distancefare22_4 = index.distancefare;
//                 basefare22_4 = index.basefare;
//             }
//             if(index.type === "gst"){
//                 gstf = index.gst;
//             }
//             if(index.type === "maxitaxi"){
//                 maxitaxi = index.fare;
//             }
//         });

//         var datetime = new Date();
//         var d = new Date(req.body.pickupDate);
//         var n = d.getDay();		
//         var time = req.body.pickupTime.split(":");
//         time = time[0];
//         distance = distance[0].split(" ");
//         distance = distance[0];

//         if (time >= 22 || time == 1 || time == 2 || time == 3 || time == 4 && 
//             n==5 || n==6 ){

//                 var flagFall = flagfare22_4;
//                 var distanceRate = distancefare22_4;
//                 var baseFare = basefare22_4;
//                 var distanceFare = distanceRate*distance;
//                 var totalFare = distanceFare+flagFall;
//                 var gst = totalFare/100*gstf;
//                 var completeFare = totalFare+gst;
//                 var maxitaxiFare = maxitaxi;
//                 var gstmaxitaxiFare = maxitaxiFare/100*gstf;
//                 var withmaxitaxiFare = maxitaxiFare+gstmaxitaxiFare;
//                 var completeMaxitaxi = completeFare+withmaxitaxiFare;
//                 if (totalFare < baseFare) {
//                     totalFare = baseFare;
//                     flagFall = 0;
//                     distanceFare = 0;
//                     var gst = totalFare/100*gstf;
//                     var completeFare = totalFare+gst;
//                     var completeMaxitaxi = completeFare+withmaxitaxiFare;
//                 }
//             } else {
//                 if (time >= 9 && time < 17) {
//                     var flagFall = flagfare9_17;
//                     var distanceRate = distancefare9_17;
//                     var baseFare = basefare9_17;
//                     var distanceFare = distanceRate*distance;
//                     var totalFare = distanceFare+flagFall;
//                     var gst = totalFare/100*gstf;
//                     var completeFare = totalFare+gst;
//                     var maxitaxiFare = maxitaxi;
//                     var gstmaxitaxiFare = maxitaxiFare/100*gstf;
//                     var withmaxitaxiFare = maxitaxiFare+gstmaxitaxiFare;
//                     var completeMaxitaxi = completeFare+withmaxitaxiFare;
//                     if (totalFare < baseFare) {
//                             totalFare = baseFare;
//                             flagFall = 0;
//                             distanceFare = 0;
//                             var gst = totalFare/100*gstf;
//                             var completeFare = totalFare+gst;
//                             var completeMaxitaxi = completeFare+withmaxitaxiFare;
//                     }
//                 }

//                 if (time >= 17 || time < 9) {
//                     var flagFall = flagfare17_9;
//                     var distanceRate = distancefare17_9;
//                     var baseFare = basefare17_9;
//                     var distanceFare = distanceRate*distance;
//                     var totalFare = distanceFare+flagFall;
//                     var gst = totalFare/100*gstf;
//                     var completeFare = totalFare+gst;
//                     var maxitaxiFare = maxitaxi;
//                     var gstmaxitaxiFare = maxitaxiFare/100*gstf;
//                     var withmaxitaxiFare = maxitaxiFare+gstmaxitaxiFare;
//                     var completeMaxitaxi = completeFare+withmaxitaxiFare;

//                     if (totalFare < baseFare) {
//                         totalFare = baseFare;
//                         flagFall = 0;
//                         distanceFare = 0;
//                         var gst = totalFare/100*gstf;
//                         var completeFare = totalFare+gst;
//                         var completeMaxitaxi = completeFare+withmaxitaxiFare;

//                     }
//                 }
//             }

//         res.send({
//             distance:distance,
//             state:req.body.state,
//             pickup:req.body.pickup,
//             dropoff:req.body.dropoff,
//             pickupDate:req.body.pickupDate,
//             pickupTime:req.body.pickupTime,
//             NumberofPassenger:req.body.NumberofPassenger,
//             distanceFare:distanceFare.toFixed(2),
//             flagFall:flagFall,
//             totalFare:totalFare,
//             gst:gst.toFixed(2),
//             completeFare:completeFare.toFixed(2),
//             completeMaxitaxi:completeMaxitaxi.toFixed(2),
//             maxitaxiFare:maxitaxiFare
//         });
//     });
// }