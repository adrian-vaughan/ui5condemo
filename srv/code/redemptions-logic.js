/**
 * 
 * @On(event = { "CREATE" }, entity = "customerloyaltySrv.Redemptions")
 * @param {Object} req - User information, tenant-specific CDS model, headers and query parameters
*/
module.exports = async function(req) {
    const { redeemedAmount, customer_ID } = req.data;

    // Fetch the customer's current total reward points and total redeemed reward points
    const [{ totalRewardPoints, totalRedeemedRewardPoints }] = await SELECT.from('customerloyaltySrv.Customers')
        .where({ ID: customer_ID })
        .columns('totalRewardPoints', 'totalRedeemedRewardPoints');

    // Deduct the redemption amount from the customer's total reward points
    const updatedRewardPoints = totalRewardPoints - redeemedAmount;

    // Add the redemption amount to the customer's total redeemed reward points
    const updatedRedeemedPoints = totalRedeemedRewardPoints + redeemedAmount;

    // Update the customer's total reward points and total redeemed reward points
    await UPDATE('customerloyaltySrv.Customers')
        .set({
            totalRewardPoints: updatedRewardPoints,
            totalRedeemedRewardPoints: updatedRedeemedPoints
        })
        .where({ ID: customer_ID });
}