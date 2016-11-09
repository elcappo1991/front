var myApp = angular.module("myApp",[]);

myApp.factory('ipaddress',function(){
    return {
        value: 'http://192.168.1.20:4000'
    }
})

myApp.factory('connectedUser',function($window) {
  return {
	value : JSON.parse($window.sessionStorage.getItem('user'))
  }
  
})


myApp.controller('APPController', function($scope,$http,$window,ipaddress,connectedUser) {
  $scope.connectedUser= connectedUser.value;
 

    console.log('APPController');
//     $window.localStorage.removeItem('hotel')



    $http.get(ipaddress.value+'/account/getListHotel').then(function(hotel){
        console.log(hotel)
        $scope.hotels=hotel.data;

    });

$scope.search=function(){


    var start_date=document.getElementById('start_date').value;
    var end_date=document.getElementById('end_date').value;
    var companion=document.getElementById('companion').options[document.getElementById('companion').selectedIndex].value;
    var hotel=document.getElementById('hotel').options[document.getElementById('hotel').selectedIndex].value;;


    var parameters = {
        start_date : start_date ,
        end_date : end_date,
        companion : companion,
        hotel : hotel
    };
    var config = {
        params: parameters
    };



    $http.get(ipaddress.value+'/account/search',config).then(function(data){
        console.log(data.data)
        $scope.roomList=data.data ;
        $('#listRoom').show();

    })
}



$scope.changeImage= function(hotel){

    var url = hotel.picture_url;

    url.toString();
    var firstCode=url.slice(0,url.lastIndexOf('upload')+7);
    const SecondPartOfCode="e_blur:365";
    var ThirdPartOfCode='/'+url.slice(url.lastIndexOf('upload')+7,url.length)

    document.getElementById('image'+hotel.id).setAttribute("src",firstCode+SecondPartOfCode+ThirdPartOfCode)
}



$scope.cancelImageChange= function(hotel){



    document.getElementById('image'+hotel.id).setAttribute("src",hotel.picture_url)

}


$scope.changeRoomImage= function(room){

    var url = room.picture_url;

    url.toString();
    var firstCode=url.slice(0,url.lastIndexOf('upload')+7);
    const SecondPartOfCode="e_blur:365";
    var ThirdPartOfCode='/'+url.slice(url.lastIndexOf('upload')+7,url.length)

    document.getElementById('room'+room.id).setAttribute("src",firstCode+SecondPartOfCode+ThirdPartOfCode)
}



$scope.cancelRoomImageChange= function(room){



    document.getElementById('room'+room.id).setAttribute("src",room.picture_url)

}









    $scope.showHotelRooms=function(hotel){
      $window.localStorage.setItem('hotel',JSON.stringify(hotel))
            console.log("click showHotelRooms function")
        
        setTimeout(function(){$window.location.href="/list"},400)
    }
    $scope.showHotelDetails=function(hotel){
      $window.localStorage.setItem('hotel',JSON.stringify(hotel))
            console.log("click showHotelDetail function")
        
        setTimeout(function(){$window.location.href="/hotelDetails"},400)
    }


});




myApp.controller('APPController1', function($scope,$http,$window,ipaddress,connectedUser) {
  $scope.connectedUser= connectedUser.value;

        $scope.hotel=JSON.parse($window.localStorage.getItem('hotel'));

            console.log($scope.hotel)


	var parameters = {
        id: $scope.hotel.id
	};
	var config = {
        params: parameters
	};
    
        $http.get(ipaddress.value+'/account/getListHotel').then(function(hotel){
        console.log(hotel)
        $scope.hotels=hotel.data;

    });

	$http.get(ipaddress.value+'/account/TypeRoomListByIdHotel',config).then(function(res){

        $scope.typeList=res.data;
        console.log($scope.typeList)
    });
  /*  $http.get('http://192.168.1.17:4000/account/optionListByIdHotel',config).then(function(res){
            console.log(res.data)
        $scope.optionList=res.data;
    });*/

	$http.get(ipaddress.value+'/account/getRoomByIdHotel',config).then(function(res){
        console.log(res.data);
        $scope.roomList=res.data;
    });
    
    
	$http.get(ipaddress.value+'/account/optionListByIdHotel',config).then(function(res){
        console.log(res.data);
        $scope.roomOption=res.data;
    });


   
    
	$http.get(ipaddress.value+'/account/getAllRoomOption',config).then(function(res){
        console.log(res.data);
        $scope.affectationOptionRoom=res.data;
    });



	$scope.changeImage= function(room){

        var url = room.picture_url;

        url.toString();
        var firstCode=url.slice(0,url.lastIndexOf('upload')+7);
        const SecondPartOfCode="e_blur:365";
        var ThirdPartOfCode='/'+url.slice(url.lastIndexOf('upload')+7,url.length)

        document.getElementById('image'+room.id).setAttribute("src",firstCode+SecondPartOfCode+ThirdPartOfCode)
    }



	$scope.cancelImageChange= function(room){



        document.getElementById('image'+room.id).setAttribute("src",room.picture_url)
    }


    
	$scope.search=function(){


    var start_date=document.getElementById('start_date').value;
    $scope.start_date =new Date(start_date);
    var end_date=document.getElementById('end_date').value;
      $scope.end_date =new Date(end_date);
    var companion=document.getElementById('companion').options[document.getElementById('companion').selectedIndex].value;
    var hotel=document.getElementById('hotel').options[document.getElementById('hotel').selectedIndex].value;


    var parameters = {
        start_date : start_date ,
        end_date : end_date,
        companion : companion,
        hotel : hotel
    };
    var config = {
        params: parameters
    };



    $http.get(ipaddress.value+'/account/search',config).then(function(data){
        console.log(data.data)
        $scope.roomList=data.data ;
      

    })
	  }


	$scope.information = function(room){
    $scope.selectedRoom=room;
    $scope.nb=[];
    for(i =1;i<parseInt(room.bed_number);i++){
     $scope.nb.push(i); 
    }
  console.log('section infrtomation');
    document.getElementById('select-room').removeAttribute('class','active')
  document.getElementById('lselect').setAttribute('class','mg-step-done');
  document.getElementById('select-room').setAttribute('class','mg-step-done tab-pane fade  in');;
  document.getElementById('linformation').setAttribute('class','active');
 
    
  document.getElementById('information').setAttribute('class','active');
   
   
   
   
   
    var parameters2 = {
       id : room.hotelId
    };
    var config2 = {
        params: parameters
    };

   
     $http.get(ipaddress.value+'/account/getReservationOption',config2).then(function(data){
        console.log(data.data)
        $scope.reservationOptionList=data.data ;
      

    })
     
     $window.scrollTo(0,250);
  
	}



	 $scope.goTo3 = function(){
   
   $scope.selectedReservationOption=document.getElementById('reservationOptionSelect').options[document.getElementById('reservationOptionSelect').selectedIndex].value;
   $scope.companion = document.getElementById('companion').options[document.getElementById('companion').selectedIndex].value;
   if(!$scope.companion || $scope.companion =="undefined" || $scope.companion == null){ $scope.companion =1;}
    else { $scope.companion =parseInt($scope.companion)+1;}
      var start_date=document.getElementById('start_date1').value;
       
   if(start_date == 'undefined' || !start_date){
     
     console.log('start date is null'+ start_date);
     console.log($scope.start_date);
         $scope.start_date1 =$scope.start_date;
  }
  else{
      $scope.start_date1 =new Date(start_date);
  }
  
    var end_date=document.getElementById('end_date1').value;
      $scope.end_date1 =new Date(end_date);
         if(start_date == 'undefined' || !end_date){
         $scope.end_date1 =$scope.end_date;
  }
  else{
      $scope.end_date1 =new Date(end_date);
  }
  console.log('section 3');
   document.getElementById('information').removeAttribute('class','active')
    document.getElementById('information').setAttribute('class','mg-step-done tab-pane fade  in');;
  document.getElementById('confirm').setAttribute('class','active');
   document.getElementById('lconfirm').setAttribute('class','active');
   
   document.getElementById('linformation').setAttribute('class','mg-step-done');
  
   if($scope.start_date1 != null){
  
   $scope.TotalPriceRoom=(Math.round(Math.abs((  $scope.start_date1.getTime() -   $scope.end_date1.getTime())/(24*60*60*1000))))* $scope.selectedRoom.price;
   }else {
     $scope.TotalPriceRoom=(Math.round(Math.abs((  $scope.start_date1.getTime() -   $scope.end_date1.getTime())/(24*60*60*1000))))* $scope.selectedRoom.price;
   }
	  }

      
    
	$scope.login=function(){
         console.log("function clicked");
	  var email = document.getElementById('login-email').value;
	var password = document.getElementById('login-password').value;
      
       console.log("login sent ");
     var credential={};
 	credential.email= email
	credential.password= password
  
     
      
      
   
         $http.post(ipaddress.value+'/login',credential,{headers:{'content-Type':'application/x-www-form-urlencoded'}}).then(function(data){	   
	      console.log(JSON.stringify(data.data))
	   $window.sessionStorage.setItem('user',JSON.stringify(data.data))
	   
	});
// 	  charset=UTF-8
	
// 	 $http({method:'POST', url:'http://192.168.1.20:4000/login', data: credential,cache:false ,headers: {'content-Type':undefined}}).then(function(data){	   
//       console.log(data)
// 	   
// 	});
       
      
    }
    
    
	$scope.goTo4 = function(){
  if( $scope.connectedUser == "undefined" ||  $scope.connectedUser == null ||  $scope.connectedUser == ""){
  
  $('#myModal').modal('show')}
  else 
  {
    
    console.log( $scope.connectedUser);
  
   console.log('section 3');
    document.getElementById('confirm').removeAttribute('class','active')
     document.getElementById('confirm').setAttribute('class','mg-step-done tab-pane fade  in');;
   document.getElementById('thank-you').setAttribute('class','active');
    document.getElementById('lthank').setAttribute('class','active');
    
    document.getElementById('lconfirm').setAttribute('class','mg-step-done');
  
    }
  
	}



});







myApp.controller('APPController2', function($scope,$http,$window,ipaddress,connectedUser) {

  $scope.connectedUser= connectedUser.value;

        $scope.hotel=JSON.parse($window.localStorage.getItem('hotel'));

            console.log($scope.hotel)


    var parameters = {
        id: $scope.hotel.id
    };
    var config = {
        params: parameters
    };

    $http.get(ipaddress.value+'/account/TypeRoomListByIdHotel',config).then(function(res){

        $scope.typeList=res.data;
        console.log($scope.typeList)
    });
    
    

     /* $http.get('http://192.168.1.17:4000/account/optionListByIdHotel',config).then(function(res){
            console.log(res.data)
        $scope.optionList=res.data;
    });*/

    $http.get(ipaddress.value+'/account/getRoomByIdHotel',config).then(function(res){
        console.log(res.data);
        $scope.roomList=res.data;
    });

    
    $http.get(ipaddress.value+'/account/getReservationOption',config).then(function(res){
        console.log(res.data);
        $scope.reservationOption=res.data;
    });
    
    
    $http.get(ipaddress.value+'/account/optionListByIdHotel',config).then(function(res){
        console.log(res.data);
        $scope.hotelOption=res.data;
    });

    
    initMap($scope.hotel.latitude,$scope.hotel.longitude);



    $scope.showHotelRooms=function(hotel){
      $window.localStorage.setItem('hotel',JSON.stringify(hotel))
            console.log("click showHotelRooms function")
        
        setTimeout(function(){$window.location.href="/list"},400)
    }




});



myApp.controller('details', function($scope,$http,$window) {

    $scope.reservation= JSON.parse($window.localStorage.getItem('details'))
    console.log($scope.reservation);
    $http.get('/account/getListHotel').then(function(hotel){

        $scope.hotels=hotel.data;
    });

    $http.post('/account/getListCompanionPerReservation',$scope.reservation).then(function(data){
        $scope.companionList=data.data
        console.log(data.data)
    })
     $http.post('/account/getroomTypeByName',$scope.reservation).then(function(data){
        $scope.picture=data.data.picture_url;

    })

    var parameters = {
        id: $scope.reservation.id
    };
    var config = {
        params: parameters
    };


  $http.get('/account/getroomByIdReservation',config).then(function(data){

          $scope.room=data.data;

    })

    var parameters1 = {
        reservation_id: $scope.reservation.id
    };
    var config1 = {
        params: parameters1
    };



    $http.get('/account/getTokenByIdReservation',config1).then(function(data){
            $scope.token= data.data.key
         console.log(data)

    })


});






var Appl = angular.module("Appl",["ngWizard"]);
Appl.controller('checkInPage', function($scope,$http,$window){


    $scope.range = function(min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };


    $scope.reservation= JSON.parse($window.localStorage.getItem('reservation'))
    console.log($scope.reservation);
    $http.get('/account/getListHotel').then(function(hotel){

        $scope.hotels=hotel.data;
    });

    $scope.submit=function(hola){
        console.log($scope.reservation)
        var nb =$scope.reservation.companion_nb;
        console.log(nb+' nb')
        for(var i=1;i <= nb;i++){
            console.log(i+ " iiiii")
            var first_name = document.getElementById('first_name'+i).value;
            var last_name = document.getElementById('last_name'+i).value;
            var email = document.getElementById('email'+i).value;
          //  var room = document.getElementById('room'+i).value;
            var data={};
            data.first_name=first_name;
            data.last_name=last_name;
            data.email=email;
          //  data.room=room;
            data.reservation=$scope.reservation.id,


            $http.post('/account/addCompanion',data).then(function(fata){})



        }
        $http.post('/account/checkIn',$scope.reservation).then(function(fata){

            $window.location.href='/account';
        })

    }

});
