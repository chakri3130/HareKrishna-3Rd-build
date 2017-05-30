angular.module('app.controllers').controller('publicationsCtrl', function ($scope, $sce, $stateParams, $window, PublicationsService, $ionicModal, $cordovaSocialSharing, $cordovaFileTransfer, $ionicPopup, $timeout,$ionicLoading) {
                                             
                                             if(window.Connection) {
                                             if(navigator.connection.type == Connection.NONE) {
                                             $ionicPopup.confirm({
                                                                 title: 'No Internet Connection',
                                                                 content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
                                                                 })
                                             .then(function(result) {
                                                   if(!result) {
                                                   navigator.app.exitApp();
                                                   }
                                                   });
                                             }
                                             }
                                             
                                             $scope.show = function () {
                                             $ionicLoading.show({
                                                                template: '<ion-spinner></ion-spinner><p>Loading...</p>'
                                                                });
                                             };
                                             
                                             $scope.hide = function () {
                                             $ionicLoading.hide();
                                             };
                                             
                                             $scope.progressbar = false;
                                             $scope.show($ionicLoading);
                                             $scope.disable = true;
                                             PublicationsService.getEngPublications().then(function (users) {
                                                                                           $scope.show($ionicLoading);
                                                                                           $scope.PublicationsEng = users.data;
                                                                                           $scope.hide($ionicLoading);
                                                                                           });
                                             
                                             
                                             PublicationsService.getHindiPublications().then(function (users) {
                                                                                             $scope.show($ionicLoading);
                                                                                             $scope.PublicationsHindi = users.data;
                                                                                             $scope.hide($ionicLoading);
                                                                                             });
                                             
                                             PublicationsService.getBengaliPublications().then(function (users) {
                                                                                               $scope.show($ionicLoading);
                                                                                               $scope.PublicationsBengali = users.data;
                                                                                               $scope.hide($ionicLoading);
                                                                                               });
                                             $scope.language = 'English';
                                             
                                             $scope.Publications = [];
                                             PublicationsService.getPublicationsDefault().then(function (response) {
                                                                                               $scope.show($ionicLoading);
                                                                                               var pub = response.data.Table;
                                                                                               $scope.Publications.push(pub);
                                                                                               $scope.hide($ionicLoading);
                                                                                               });
                                             
                                             $scope.PopulatePublications = function (type) {
                                             $scope.show($ionicLoading);
                                             $scope.disable = false;
                                             $scope.language = type;
                                             $scope.PublicationURL = "https://harekrishna.tecnics.com/scgm/service.svc/publications/language=" + type;
                                             PublicationsService.getPublications($scope.PublicationURL).then(function (users) {
                                                                                                             $scope.Publications = users.data;
                                                                                                             $scope.hide($ionicLoading);
                                                                                                             });
                                             };
                                             
                                             $scope.IsNew = function (date) {
                                             var tempDate = new Date();
                                             var Created_Date = new Date(date);
                                             tempDate.setDate(tempDate.getDate() - 7);
                                             return (Created_Date >= tempDate) ? true : false;
                                             };
                                             
                                             
                                             $ionicModal.fromTemplateUrl('viewPdf.html', {
                                                                         scope: $scope,
                                                                         animation: 'slide-in-up'
                                                                         }).then(function (modal) {
                                                                                 $scope.modal = modal;
                                                                                 });
                                             
                                             
                                             $scope.openPDFFileUsingSystemEditor = function (pdf, name) {
                                             console.log(pdf);
                                             PDFViewer.openPDF(encodeURI(pdf));
                                             };
                                             
                                             $scope.openModal = function (pdf, name) {
                                             var res = pdf.replace("http://", '');
                                             res = res.trim();
                                             $scope.pdfUrl = $sce.trustAsResourceUrl('https://docs.google.com/viewer?url=' + res);
                                             $scope.pdfUrll = pdf;
                                             $scope.openPopUp( $scope.pdfUrl);
                                             };
                                             
                                             
                                             $scope.socialShare = function () {
                                             window.plugins.socialsharing.share('Publications  '  + '\n\n\n' + "To download the App Click on "+ "\n  http://itunes.apple.com/us/app/APPNAME/idXXXXXXXXX", Constants.Paramhamsa_Vani, $scope.pdfUrll, + '\n\n' + "To download the App Click on  " + '\n' +  " http://itunes.apple.com/us/app/APPNAME/idXXXXXXXXX", function (errormsg) { //alert("Error: Cannot Share");
                                                                                });
                                             };
                                             
                                             
                                             $scope.downloadFile = function () {
                                             
                                             $scope.progressbar = true;
                                             var url = encodeURI($scope.pdfUrll);
                                             var filename = url.split("/").pop();
                                             //var filename = +Math.random();
                                             // Save location
                                             var targetPath = cordova.file.documentsDirectory + filename;
                                             $cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
                                                                                                           console.log('Success' + JSON.stringify(result));
                                                                                                           //alert('Downloaded Succefully');
                                                                                                           $ionicPopup.show({
                                                                                                                            title: "Downloaded Successfully!",
                                                                                                                            scope: $scope,
                                                                                                                            buttons: [
                                                                                                                                      {text: 'Ok'}]
                                                                                                                            })
                                                                                                           }, function (error) {
                                                                                                           //console.log(JSON.stringify(error));
                                                                                                           }, function (progress) {
                                                                                                           $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                                                                                           if ($scope.downloadProgress === 100) {
                                                                                                           $scope.progressbar = false;
                                                                                                           $scope.disable = true;
                                                                                                           }
                                                                                                           });
                                             
                                             
                                             };
                                             
                                             //Pop up code
                                             
                                             
                                             $scope.openPopUp = function (pdf) {
                                             $scope.disable = false;
                                             $scope.data = {};
                                             var myPopup = $ionicPopup.show({
                                                                            title: '<b>Choose Action</b>',
                                                                            scope: $scope,
                                                                            cssClass: 'my-custom-popup',
                                                                            buttons: [
                                                                                      {
                                                                                      text: '<b>Open</b>',
                                                                                      type: 'button-energized',
                                                                                      onTap: function (e) {
                                                                                      var Urll = $scope.pdfUrl;
                                                                                      var ref = window.open(Urll, 'location=no');
                                                                                      $scope.pdfName = name;
                                                                                      
                                                                                      }
                                                                                      },
                                                                                      
                                                                                      
                                                                                      {
                                                                                      text: '<b>Share</b>',
                                                                                      type: 'button-energized',
                                                                                      onTap: function (e) {
                                                                                      //alert($scope.pdfUrll);
                                                                                      console.log($scope.pdfUrl);
                                                                                      window.plugins.socialsharing.share('Publications  '  + '\n\n\n' + "To download the App Click on "+ "\n  http://itunes.apple.com/us/app/APPNAME/idXXXXXXXXX", Constants.Paramhamsa_Vani, $scope.pdfUrll, + '\n\n' + "To download the App Click on  " + '\n' +  " http://itunes.apple.com/us/app/APPNAME/idXXXXXXXXX", function (errormsg) { //alert("Error: Cannot Share");
                                                                                                                         });
                                                                                      }
                                                                                      },
                                                                                      
                                                                                      {
                                                                                      text: '<b>Download</b>',
                                                                                      type: 'button-energized',
                                                                                      onTap: function (e) {
                                                                                      $scope.progressbar = true;
                                                                                      //var urll = $scope.pdfUrl;
                                                                                      // alert($scope.pdfUrll);
                                                                                      var url = encodeURI($scope.pdfUrll);
                                                                                      // File name only
                                                                                      var filename = url.split("/").pop();
                                                                                      //var filename = +Math.random();
                                                                                      // Save location
                                                                                      var targetPath = cordova.file.documentsDirectory + filename;
                                                                                      $cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
                                                                                                                                                    console.log('Success' + JSON.stringify(result));
                                                                                                                                                    alert('Downloaded Succefully');
//                                                                                                                                                    $ionicPopup.show({
//                                                                                                                                                                     title: "Downloaded Successfully!",
//                                                                                                                                                                     scope: $scope,
//                                                                                                                                                                     buttons: [
//                                                                                                                                                                               {text: 'Ok'}]
//                                                                                                                                                                     })
                                                                                                                                                    }, function (error) {
                                                                                                                                                    //console.log(JSON.stringify(error));
                                                                                                                                                    }, function (progress) {
                                                                                                                                                    $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                                                                                                                                    if ($scope.downloadProgress === 100) {
                                                                                                                                                    $scope.progressbar = false;
                                                                                                                                                    $scope.disable = true;
                                                                                                                                                    }
                                                                                                                                                    });
                                                                                      
                                                                                      }
                                                                                      }
                                                                                      ]
                                                                            });
                                             myPopup.then(function (res) {
                                                          //console.log('Tapped!', res);
                                                          myPopup.close();
                                                          });
                                             
                                             $timeout(function () {
                                                      myPopup.close(); //close the popup after 3 seconds for some reason
                                                      }, 4000);
                                             };
                                             });
