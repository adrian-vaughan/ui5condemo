/**
 * 
 * @On(event = { "CREATE" }, entity = "customerloyaltySrv.Purchases")
 * @param {Object} request - User information, tenant-specific CDS model, headers and query parameters
*/
module.exports = async function(request) {
    // Calculate reward points
    request.data.rewardPoints = Math.floor(request.data.purchaseValue / 10);

    // Update the related customer's total purchase value and total reward points
    const customer = await SELECT.one.from('customerloyaltySrv.Customers').where({ ID: request.data.customer_ID });
    if (customer) {
        const newTotalPurchaseValue = (customer.totalPurchaseValue || 0) + request.data.purchaseValue;
        const newTotalRewardPoints = (customer.totalRewardPoints || 0) + request.data.rewardPoints;

        await UPDATE('customerloyaltySrv.Customers')
            .set({
                totalPurchaseValue: newTotalPurchaseValue,
                totalRewardPoints: newTotalRewardPoints
            })
            .where({ ID: customer.ID });
    }
}