<?php

/**
 * @OA\Get(path="/appointment", tags={"appointment"},
 *         summary="Return all appointments from the API. ",
 *         @OA\Response( response=200, description="List of appointmentpeople.")
 * )
 */
Flight::route('GET /appointment', function(){
   Flight::json(Flight::appointment_service() -> get_all());
    
});


Flight::route("GET /appointment_by_id", function(){
  Flight::json(Flight::appointment_service()->get_by_id(Flight::request()->query['id']));
});

/**
 * @OA\Get(path="/appointment/{id}", tags={"appointment"},
 *         summary="Return appointment  by id from the API. ",
 *         @OA\Parameter(in="path", name="id", example=1, description="ID of appointment"),
 *         @OA\Response( response=200, description="Individual appointment.")
 * )
 */
Flight::route('GET /appointment/@id', function($id){
    Flight::json(Flight::appointment_service() -> get_by_id($id));
  
});

/**
* @OA\Post(
*     path="/appointment", 
*     description="Add appointment",
*     tags={"appointment"},
*     @OA\RequestBody(description="appointment ", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="date", type="datetime", example="2020-01-01 15:10:10",	description="Date"),
*    				@OA\Property(property="doctor_id", type="integer", example=1,	description="Doctor id"),
*    				@OA\Property(property="name", type="string", example="amina",	description="name"),
*    				@OA\Property(property="address", type="string", example="sarajevo",	description="address"),
*    				@OA\Property(property="country", type="string", example="BiH",	description="country")
*    			
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="appointment has been added"
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('POST /appointment', function(){
  Flight::json(Flight::appointment_service()->add(Flight::request()->data->getData()));
  });

 /**
* @OA\Put(
*     path="locked/appointment/{id}", security={{"ApiKeyAuth": {}}},
*     description="Update appointment",
*     tags={"appointment"},
*     @OA\Parameter(in="path", name="id", example=1, description="appointment_id"),
*     @OA\RequestBody(description="appointment info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="date", type="datetime", example="2020-01-01 15:10:10",	description="Date"),
*    				@OA\Property(property="doctor_id", type="integer", example=1,	description="Doctor id"),
*    				@OA\Property(property="name", type="string", example="amina",	description="name"),
*    				@OA\Property(property="address", type="string", example="sarajevo",	description="address"),
*    				@OA\Property(property="country", type="string", example="BiH",	description="country")
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="appointment has been updated"
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
  Flight::route('PUT locked/appointment/@id', function($id){
    $appointment = Flight::request()->data->getData();
    Flight::json(['message' => "appointment edit successfully",
                  'data' => Flight::appointment_service()->update($appointment, $id)
                 ]);
  });

/**
* @OA\Delete(
*     path="locked/appointment/{id}", security={{"ApiKeyAuth": {}}},
*     description="Delete appointment",
*     tags={"appointment"},
*     @OA\Parameter(in="path", name="id", example=1, description="appointment_id"),
*     @OA\Response(
*         response=200,
*         description="appointment deleted"
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('DELETE locked/appointment/@id', function($id){
    Flight::appointment_service()->delete($id);
    Flight::json(["message"=> "deleted"]);
});

?>