// src/data/products.js
const products = [
    //    custom products below
    {
        vinCheckId: 178,
        shopId: 488,
        id: 488,
        name: 'BMW Map Update',
        price: 170,
        cable: false,
        showOnStartUp: false,
        bestseller: false,
        custom: true,
        smallDescription: 'BMW map update ensures you\'ll always know the best and fastest routes to get to your destination.',
        description: "<div class='product-moving-description'>They say time is money, so finding your way around as quickly as possible should be a priority. BMW map update ensures you'll always know the best and fastest routes to get to your destination.<br><br>When you regularly perform BMW navigation update, your map shows you:<br><span class='bullet'>&bull;</span>New roads opened or existing ones closed<br><span class='bullet'>&bull;</span>Time-saving detours for your usual rides<br><span class='bullet'>&bull;</span>Almost 300 000 new points of interest added each year (hotels, gas stations, cafes, etc.) <br><br>BMW recommends performing a BMW GPS update at least once a year. For anybody who drives a lot, though, it's better to do a BMW map update download every three to six months. <br><br>At BimmerTech we offer a quick and easy BMW USB map update process, all in the comfort of your home. </div>",
        video: '<iframe class="product-video-youtube" src="https://www.youtube.com/embed/2Phqd3-i6T8" frameborder="0" allowfullscreen></iframe>',
        icon: "map.svg",
        image: "traffic-information.jpg",
        filters: {
            navigation: true,
        }
    },
    {
        vinCheckId: 29,
        shopId: 367,
        minMaxId: 367,
        id: 'enhanced_bluetooth',
        name: 'BMW Enhanced Bluetooth',
        price: 225,
        cable: false,
        bestseller: true,
        showOnStartUp: true,
        blockLowerPrice: true,
        smallDescription: 'Stream music from your phone or USB and do more with BMW Enhanced Bluetooth activation.',
        description: 'With BMW Enhanced Bluetooth and USB activated in your car, it\'s possible to stream music from your phone via Bluetooth or USB, pair up multiple devices via Bluetooth at once, connect iOS devices via USB cable, read text messages and emails on the iDrive screen through Mobile Office, access calendar, tasks, notes, reminders, etc., and use Bluetooth Voice Control to make calls without taking your hands off the wheel.',
        image: "enchanted-blootooth.png",
        video: '<iframe class="product-video-youtube" src="https://www.youtube.com/embed/rjp0PgUSj7Y" frameborder="0" allowfullscreen></iframe>',
        icon: "bluetooth.svg",
        filters: {
            sound: true,
            infotainment: true
        }
    },
    {
        vinCheckId: 129,
        shopId: 470,
        minMaxId: 470,
        id: 'apple_car_play_activation',
        name: 'BMW Apple CarPlay Activation',
        price: 399,
        cable: false,
        bestseller: true,
        smallDescription: 'Use your iPhone apps straight from the iDrive screen with BMW CarPlay activation.',
        description: "Want to use your iPhone apps straight from the iDrive screen? BMW CarPlay activation is the one for you! With BMW Apple CarPlay activation, you'll connect an iPhone to your BMW and use iOS apps on the factory iDrive display.",
        video: '<iframe class="product-video-youtube" src="https://www.youtube.com/embed/dqR7QeoUI7Q" frameborder="0" allowfullscreen></iframe>',
        image: 'apple_carplay.jpg',
        icon: "apple_car_play.svg",
        showOnStartUp: true,
        filters: {
            infotainment: true,
            navigation: true
        }
    },
    {
        vinCheckId: 30,
        shopId: 369,
        minMaxId: 111,
        id: 'legal_disclaimer_deactivation',
        name: 'BMW Legal Disclaimer Deactivation',
        price: 35,
        cable: false,
        bestseller: true,
        showOnStartUp: true,
        smallDescription: 'Turn off the legal disclaimer on BMW and never see it or the Night Vision pop-up ever again.',
        description: "Are you tired of seeing the legal disclaimer on your iDrive screen every time you start your car or drive in reverse? We know the feeling. What if we told you it was possible to turn off the legal disclaimer on BMW so you would never see it ever again?",
        icon: "legal_disclaimer.svg",
        image: 'legal-disclaimer-deactivation.png',
        video: '<iframe class="product-video-youtube" src="https://www.youtube.com/embed/O94oTEmcjW4" frameborder="0" allowfullscreen></iframe>',
        filters: {
            display: true
        }
    },
    {
        vinCheckId: 31,
        minMaxId: 122,
        shopId: "254c",
        showOnStartUp: true,
        id: 'video_in_motion',
        name: 'BMW Video in Motion',
        price: 99,
        cable: false,
        bestseller: true,
        smallDescription: 'Activate the BMW Video in Motion feature and play movies for your passengers through DVD.',
        description: "Do your passengers keep asking 'Are we there yet'? Would you like to be able to entertain them with a movie on your iDrive screen and just enjoy driving your car? We know the secret! It is... playing videos in motion!",
        icon: "video_in_motion.svg",
        image: "video-in-motion.png",
        video: '<iframe class="product-video-youtube" src="https://www.youtube.com/embed/LGv7O-q_a-I" frameborder="0" allowfullscreen></iframe>',
        filters: {
            video: true,
            infotainment: true
        }
    },
    {
        vinCheckId: 32,
        shopId: 373,
        minMaxId: 112,
        id: 'rdc_safety',
        name: 'RDC Safety',
        price: 35,
        cable: false,
        showOnStartUp: true,
        bestseller: true,
        smallDescription: 'Code RDC control unit and access PSI information with just a few clicks through your iDrive menu.',
        description: "Check PSI tire pressure without an external device. After coding your RDC control unit, you'll access PSI information with just a few clicks through your iDrive menu, and always keep tabs on your tire pressure! Remember, safety comes first.",
        video: '<iframe class="product-video-youtube" src="https://www.youtube.com/embed/c2StJ-0AsWc" frameborder="0" allowfullscreen></iframe>',
        icon: "rdc.svg",
        filters: {
            service_diagnostic: true
        }
    },
    {
        vinCheckId: 53,
        shopId: 291,
        minMaxId: 169,
        id: 'mirrors_folding',
        name: 'Remote Power Folding',
        price: 45,
        cable: true,
        bestseller: true,
        smallDescription: 'Fit into narrow gaps and protect your wing mirrors in tight spaces with Remote Power Folding!',
        description: "Fit into narrow gaps and protect your wing mirrors in tight spaces with Remote Power Folding! With this BMW coding feature activated, you can fold and unfold the mirrors using your key fob.",
        video: '<iframe class="product-video-youtube" src="https://www.youtube.com/embed/BTQw01acvPw" frameborder="0" allowfullscreen></iframe>',
        icon: "mirrors.svg",
        showOnStartUp: true,
        filters: {
            doors_trunk: true,
            control: true
        }
    }
    // Add more products here from your full list...
];

export default products;