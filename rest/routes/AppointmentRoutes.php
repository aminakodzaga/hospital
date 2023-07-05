<?php

Flight::route('GET /appointment', function(){
   Flight::json(Flight::appointment_service() -> get_all());
    
});


Flight::route("GET /appointment_by_id", function(){
  Flight::json(Flight::appointment_service()->get_by_id(Flight::request()->query['id']));
});


Flight::route('GET /appointment/@id', function($id){
    Flight::json(Flight::appointment_service() -> get_by_id($id));
  
});


Flight::route('POST /appointment', function(){
  $request = Flight::request()->data->getData();
  $doctor_id = Flight::doctor_service()->get_doctor_by_name($request['doctor_name'])['id'];

  unset($request['doctor_name']);
  $request['doctor_id'] = $doctor_id;
/*   var_dump($request); die; */
  Flight::json(['message' => "appointment added successfully",
                 'data' => Flight::appointment_service()->add($request) 
               ]);
    

  });

 
  Flight::route('PUT /appointment/@id', function($id){
    $appointment = Flight::request()->data->getData();
    Flight::json(['message' => "appointment edit successfully",
                  'data' => Flight::appointment_service()->update($appointment, $id)
                 ]);
  });


Flight::route('DELETE /appointment/@id', function($id){
    Flight::appointment_service()->delete($id);
    Flight::json(["message"=> "deleted"]);
});

?>