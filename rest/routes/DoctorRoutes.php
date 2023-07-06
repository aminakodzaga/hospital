<?php

/**
 * @OA\Get(path="/doctors", tags={"doctors"},
 *         summary="Return all appointments from the API. ",
 *         @OA\Response( response=200, description="List of missing people.")
 * )
 */
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


Flight::route('POST /locked/doctors', function(){
  Flight::json(Flight::doctor_service()->add(Flight::request()->data->getData()));
});

 
  Flight::route('PUT /locked/doctors/@id', function($id){
    $doctor = Flight::request()->data->getData();
    Flight::json(['message' => "Doctor edit successfully",
                  'data' => Flight::doctor_service()->update($doctor, $id)
                 ]);
  });


Flight::route('DELETE /locked/doctors/@id', function($id){
    Flight::doctor_service()->delete($id);
    Flight::json(["message"=> "deleted"]);
});

?>