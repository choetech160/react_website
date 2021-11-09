
    import { FaFire } from 'react-icons/fa';
    import { BsXDiamondFill } from 'react-icons/bs';
    import { GiCrystalize } from 'react-icons/gi';

    const starter_name = 'Starter';
    const starter_price = '$1.00';
    const starter_BWLimit = '50'; // average size 75Kb => 1600 emails
    const starter_AnonReplyLimit = '600';
    const starter_customDomainLimit = '1';
    const starter_priceId = 'price_1IqJ8aFl7xS7ldB8rMCVvNcX';

    const medium_name = 'Medium';
    const medium_price = '$2.50';
    const medium_BWLimit = '120';  // average size 75Kb => 1600 emails
    const medium_AnonReplyLimit = '1200';
    const medium_customDomainLimit = '2';
    const medium_priceId = 'price_1IvjOsFl7xS7ldB84Olpkr55';

    const premium_name = 'Diamond';
    const premium_price = '$5.00';
    const premium_BWLimit = '500'; // average size 75Kb => 6666 emails
    const premium_AnonReplyLimit = '3000';
    const premium_customDomainLimit = '5';
    const premium_priceId = 'price_1IqJ9HFl7xS7ldB8bFSVnJx8';

    export const PricingData_lang = {
        EN: [
            {
                icon: <FaFire />,
                title: `${starter_name}`,
                price: `${starter_price}`,
                freq: 'per month',
                li1: `${starter_BWLimit} Mb bandwith limit`,
                li2: `${starter_AnonReplyLimit} Anonymous Reply Daily Limit`,
                li3: `${starter_customDomainLimit} custom domain`,
                priceId: `${starter_priceId}`,
                buttontitle: 'Choose Plan'
            },
            {
                icon: <BsXDiamondFill />,
                title: `${medium_name}`,
                price: `${medium_price}`,
                freq: 'per month',
                li1: `${medium_BWLimit} Mb bandwith limit`,
                li2: `${medium_AnonReplyLimit} Anonymous Reply Daily Limit`,
                li3: `${medium_customDomainLimit} custom domains`,
                priceId: `${medium_priceId}`,
                buttontitle: 'Choose Plan'
            },
            {
                icon: <GiCrystalize />,
                title: `${premium_name}`,
                price: `${premium_price}`,
                freq: 'per month',
                li1: `${premium_BWLimit} Mb bandwith limit`,
                li2: `${premium_AnonReplyLimit} Anonymous Daily Reply`,
                li3: `${premium_customDomainLimit} custom domains`,
                priceId: `${premium_priceId}`,
                buttontitle: 'Choose Plan'
            }
        
         ],
        FR : [
            {
                icon: <FaFire />,
                title: `${starter_name}`,
                price: `${starter_price}`,
                freq: 'per month',
                li1: `${starter_BWLimit} Mb bandwith limit`,
                li2: `${starter_AnonReplyLimit} Anonymous Reply Daily Limit`,
                li3: `${starter_customDomainLimit} custom domain`,
                priceId: `${starter_priceId}`,
                buttontitle: 'Choose Plan'
            },
            {
                icon: <BsXDiamondFill />,
                title: `${medium_name}`,
                price: `${medium_price}`,
                freq: 'per month',
                li1: `${medium_BWLimit} Mb bandwith limit`,
                li2: `${medium_AnonReplyLimit} Anonymous Reply Daily Limit`,
                li3: `${medium_customDomainLimit} custom domains`,
                priceId: `${medium_priceId}`,
                buttontitle: 'Choose Plan'
            },
            {
                icon: <GiCrystalize />,
                title: `${premium_name}`,
                price: `${premium_price}`,
                freq: 'per month',
                li1: `${premium_BWLimit} Mb bandwith limit`,
                li2: `${premium_AnonReplyLimit} Anonymous Daily Reply`,
                li3: `${premium_customDomainLimit} custom domains`,
                priceId: `${premium_priceId}`,
                buttontitle: 'Choose Plan'
            }
    
        ]

        
    }
