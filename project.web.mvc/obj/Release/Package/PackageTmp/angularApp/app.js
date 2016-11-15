//var UrlDomainSite = 'http://test3.hutech.edu.vn/giamsatgiangdayv2/';
//var UrlDomainSiteFile = 'https://htdn.hutech.edu.vn';
//var UrlDomainAPI = 'http://test3.hutech.edu.vn/apihutech/';

var UrlDomainSite = 'http://localhost:44300/';
var UrlDomainSiteFile = 'https://htdn.hutech.edu.vn';
var UrlDomainAPI = 'http://localhost:15159/';
var app = angular.module("HutechApp", [
    "ui.bootstrap", //vua dung boottrap ui vua dung Material. cai nao ngon hon thi sai
    'ngMaterial',
    'pascalprecht.translate',
    'ngCookies',
    'angularMoment',
    'ui.mask',
    'material.svgAssetsCache',
    'ngMessages',
    "dynamicNumber",    // du lieu kieu so
    "ui.router" // su dung de chuyen huong
]);


/* Setup Rounting For All Pages */
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/");

    $stateProvider
        // Dashboard
        .state('CauHinhBuoiTrucIndex', {
            url: "/CauHinh/Index"
        })

        //cau hinh buoi truc
        .state("CauHinhBuoiTruc", {
            url: "/CauHinh/BuoiTruc",
            //templateUrl: "app/GiamSatHoatDongGiangDay/CauHinhBuoiTruc/CauHinhBuoiTrucList.html",
            controller: "BuoiTrucCtrl",
            params: {
                data: null
            }
        })


    //cau hinh bao bu
    .state("BaoBu", {
        url: "/GiamSatGiangDay/BaoBu",
        //templateUrl: "app/GiamSatHoatDongGiangDay/CauHinhBuoiTruc/CauHinhBuoiTrucList.html",
        controller: "BaoBuCtrl",
        params: {
            data: null
        }
    });
}]);



/* Init global settings and run the app
// su dung moment https://github.com/urish/angular-moment
*/
app.run(["$rootScope", "$state", "amMoment", function ($rootScope, $state, amMoment) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.lang = 'VN';
    amMoment.changeLocale('vi');
}]);


//Config multilanguage
app.config(['$translateProvider', function ($translateProvider) {

    var langKey = window.localStorage.NG_TRANSLATE_LANG_KEY == undefined ? "VN" : window.localStorage.NG_TRANSLATE_LANG_KEY;

    $translateProvider
    .useStaticFilesLoader({
        prefix: UrlDomainSite + '/angularApp/translations/',
        suffix: '.json'
    })
    .preferredLanguage(langKey)
    .useLocalStorage()
    //.useMissingTranslationHandlerLog()
    .useSanitizeValueStrategy(null);
}]);

//Config du lieu kieu so
app.config(['dynamicNumberStrategyProvider', function (dynamicNumberStrategyProvider) {
    dynamicNumberStrategyProvider.addStrategy('number', {
        numInt: 12,
        numFract: 3,
        numSep: ',',
        numPos: true,
        numNeg: false,
        numRound: 'round',
        numThousand: true,
        numThousandSep: '.'
    });
}]);


//Format datetime
app.config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
        return date ? moment(date).format('DD/MM/YYYY') : '';
    };
  
    $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, 'DD/MM/YYYY', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };
});

