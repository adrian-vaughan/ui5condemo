sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'customerloyalty/Customers/test/integration/FirstJourney',
		'customerloyalty/Customers/test/integration/pages/CustomersList',
		'customerloyalty/Customers/test/integration/pages/CustomersObjectPage'
    ],
    function(JourneyRunner, opaJourney, CustomersList, CustomersObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('customerloyalty/Customers') + '/index.html'
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