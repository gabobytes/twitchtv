var app = angular.module('tvApp',[]);
app.controller('tvCtrl', function($scope,$http){
  
  /*Values to show or hide online or offline users*/
  $scope.onlineUsers = true;
  $scope.offlineUsers = true;
  
  var urlApi = "https://api.twitch.tv/kraken/streams/";

  //array of some TwitchTv users
  var users = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","comster404","OgamingSC2","thomasballinger","cretetion", "noobs2ninjas","beohoff", "sheevergaming","brunofin","ESL_SC2","pokemongo","sonyk0rzlol"];
  
  //arrays to store online and offline users
  $scope.online = [];
  $scope.offline = [];
  
  //this is just for practicing angular xD
  $scope.titleApp = "Twitch.Tv Streamers";
  
  //query every user status with urlApi
  angular.forEach(users,function(user){    
    $http.get(urlApi + user).success(function(data){
    
      if(data.stream){//if user is online
          $scope.online.push(data); 
        }else{// else, user offline and check again API to get data of user offline          
          var urlOFF = data._links.channel;
          $http.get(urlOFF).success(function(dataOFF){
          $scope.offline.push(dataOFF);  
          });//getURLOFF
        }      
    }).error(function(data,status) {//when account user is closed    
      //create an object with the data 
      var chOut = {
        stream:null,
        logo:null,
        display_name:user,
        url:"https://www.twitch.tv/"+user,
        status_account:"Account Closed"
      };
        //push closed account
        $scope.offline.push(chOut);      
      });//end error
  });//end foreach  
});