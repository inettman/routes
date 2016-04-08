var admobid = {};
if( /(android)/i.test(navigator.userAgent) ) { // for android & amazon-fireos
    admobid = {
        banner: 'ca-app-pub-0006856964532208/6283907611', // or DFP format "/6253334/dfp_example_ad"
        interstitial: 'ca-app-pub-0006856964532208/3073089213'
    };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
    admobid = {
        banner: 'ca-app-pub-0006856964532208/6283907611', // or DFP format "/6253334/dfp_example_ad"
        interstitial: 'ca-app-pub-0006856964532208/3073089213'
    };
} else { // for windows phone
    admobid = {
        banner: 'ca-app-pub-0006856964532208/6283907611', // or DFP format "/6253334/dfp_example_ad"
        interstitial: 'ca-app-pub-0006856964532208/3073089213'
    };
}

if(AdMob) AdMob.createBanner({
    adId: admobid.banner,
    position: AdMob.AD_POSITION.BOTTOM_CENTER,
    autoShow: true });

if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false} );

// show the interstitial later, e.g. at end of game level
if(AdMob) AdMob.showInterstitial();