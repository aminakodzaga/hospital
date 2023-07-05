<?php

Flight::route('GET /doctors', function(){
 
    Flight::json(Flight::doctor_service() -> get_all());
    
});

Flight::route("GET /doctor_by_id", function(){
  Flight::json(Flight::doctor_service()->get_by_id(Flight::request()->query['id']));
});


Flight::route('GET /doctors/@id', function($id){
    $result = Flight::doctor_service() -> get_by_id($id);
    $doctor = $result[0];
    unset($doctor["dpassword"]);

    Flight::json($doctor);

    
});


Flight::route('POST /doctors', function(){
  Flight::json(Flight::doctor_service()->add(Flight::request()->data->getData()));
});

 
  Flight::route('PUT /doctors/@id', function($id){
    $doctor = Flight::request()->data->getData();
    Flight::json(['message' => "Doctor edit successfully",
                  'data' => Flight::doctor_service()->update($doctor, $id)
                 ]);
  });


Flight::route('DELETE /doctors/@id', function($id){
    Flight::doctor_service()->delete($id);
    Flight::json(["message"=> "deleted"]);
});

?>