<?php

/**
 * @OA\Get(path="/doctors", tags={"doctor"},
 *         summary="Return all doctors from the API. ",
 *         @OA\Response( response=200, description="List of doctors.")
 * )
 */
Flight::route('GET /doctors', function(){
 
    Flight::json(Flight::doctor_service() -> get_all());
    
});

/**
 * @OA\Get(path="/doctor/{id}", tags={"doctor"},
 *         summary="Return doctor  by id from the API. ",
 *         @OA\Parameter(in="path", name="id", example=1, description="ID of doctor"),
 *         @OA\Response( response=200, description="Individual doctor.")
 * )
 */

Flight::route('GET /doctors/@id', function($id){
    $result = Flight::doctor_service() -> get_by_id($id);
    $doctor = $result[0];
    unset($doctor["dpassword"]);

    Flight::json($doctor);

    
});

/**
* @OA\Post(
*     path="/locked/doctors", security={{"ApiKeyAuth": {}}},
*     description="Add doctor",
*     tags={"doctor"},
*     @OA\RequestBody(description="doctor ", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    			
*    				@OA\Property(property="dname", type="string", example="amina",	description="name"),
*    		 @OA\Property(property="demail", type="string", example="amina@gmail.com",	description="email"),
*        @OA\Property(property="dpassword", type="string", example="123",	description="name"),
*        @OA\Property(property="specialities", type="string", example="cardiology",	description="specialities"),
*        @OA\Property(property="image", type="string", example="team-memb1",	description="image")
*    			
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="doctor has been added"
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('POST /locked/doctors', function(){
  Flight::json(Flight::doctor_service()->add(Flight::request()->data->getData()));
});

   /**
* @OA\Put(
*     path="/locked/doctors/{id}", security={{"ApiKeyAuth": {}}},
*     description="Update doctor",
*     tags={"doctor"},
*     @OA\Parameter(in="path", name="id", example=1, description="doctor_id"),
*     @OA\RequestBody(description="doctor info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="dname", type="string", example="amina",	description="name"),
*    		 @OA\Property(property="demail", type="string", example="amina@gmail.com",	description="email"),
*        @OA\Property(property="dpassword", type="string", example="123",	description="name"),
*        @OA\Property(property="specialities", type="string", example="cardiology",	description="specialities"),
*        @OA\Property(property="image", type="string", example="team-memb1",	description="image")
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="doctor has been updated"
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
  Flight::route('PUT /locked/doctors/@id', function($id){
    $doctor = Flight::request()->data->getData();
    Flight::json(['message' => "Doctor edit successfully",
                  'data' => Flight::doctor_service()->update($doctor, $id)
                 ]);
  });

/**
* @OA\Delete(
*     path="/locked/doctors/{id}", security={{"ApiKeyAuth": {}}},
*     description="Delete doctor",
*     tags={"doctor"},
*     @OA\Parameter(in="path", name="id", example=1, description="doctor_id"),
*     @OA\Response(
*         response=200,
*         description="doctor deleted"
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('DELETE /locked/doctors/@id', function($id){
    Flight::doctor_service()->delete($id);
    Flight::json(["message"=> "deleted"]);
});

Flight::route('GET /search_name_desc', function(){
  $dname = Flight::request()->query['dname'];
  Flight::json(Flight::doctor_service()->get_by_name_desc($dname));
});

?>