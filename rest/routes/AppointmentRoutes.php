<?php

/**
 * @OA\Get(path="/appointment", tags={"appointment"},
 *         summary="Return all appointments from the API. ",
 *         @OA\Response( response=200, description="List of appointments.")
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
 *         summary="Return appointments by id from the API. ",
 *         @OA\Parameter(in="path", name="id", example=1, description="ID of appointment"),
 *         @OA\Response( response=200, description="Individual appointment.")
 * )
 */
Flight::route('GET /appointment/@id', function($id){
    Flight::json(Flight::appointment_service() -> get_by_id($id));
  
});

/**
* @OA\Post(
*     path="/appointment", security={{"ApiKeyAuth": {}}},
*     description="Add appointment ",
*     tags={"appointment"},
*     @OA\RequestBody(description="appointment info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="date", type="date", example="2020-01-01 15:10:10",	description="Title of the note"),
*    				@OA\Property(property="doctor_id", type="number", example=1,	description="Title of the note"),
*    				@OA\Property(property="user_id", type="number", example=1,	description="Title of the note")
*    			
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="appointment person has been added"
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
*     path="/appointment/{id}", security={{"ApiKeyAuth": {}}},
*     description="Update appointment ",
*     tags={"appointment"},
*     @OA\Parameter(in="path", name="id", example=1, description="appointment_id"),
*     @OA\RequestBody(description="appointment  info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    		@OA\Property(property="date", type="date", example="2020-01-01 15:10:10",	description="Title of the note"),
*    				@OA\Property(property="doctor_id", type="number", example=1,	description="Title of the note"),
*    				@OA\Property(property="user_id", type="number", example=1,	description="Title of the note"),
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
  Flight::route('PUT /appointment/@id', function($id){
    $appointment = Flight::request()->data->getData();
    Flight::json(['message' => "appointment edit successfully",
                  'data' => Flight::appointment_service()->update($appointment, $id)
                 ]);
  });

/**
* @OA\Delete(
*     path="/appointment/{id}", security={{"ApiKeyAuth": {}}},
*     description="Delete appointment",
*     tags={"appointment"},
*     @OA\Parameter(in="path", name="id", example=1, description="appointment_id"),
*     @OA\Response(
*         response=200,
*         description="appointment  deleted"
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('DELETE /appointment/@id', function($id){
    Flight::appointment_service()->delete($id);
    Flight::json(["message"=> "deleted"]);
});

?>