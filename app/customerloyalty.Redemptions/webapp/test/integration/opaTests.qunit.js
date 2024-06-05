sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'customerloyalty/Redemptions/test/integration/FirstJourney',
		'customerloyalty/Redemptions/test/integration/pages/CustomersList',
		'customerloyalty/Redemptions/test/integration/pages/CustomersObjectPage'
    ],
    function(JourneyRunner, opaJourney, CustomersList, CustomersObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('customerloyalty/Redemptions') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheCustomersList: CustomersList,
					onTheCustomersObjectPage: CustomersObjectPage
                }
            },
            opaJourney.run
        );
    }
);