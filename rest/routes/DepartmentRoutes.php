<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

/**
 * @OA\Get(path="/department", tags={"department"},
 *         summary="Return all departments from the API. ",
 *         @OA\Response( response=200, description="List of departments.")
 * )
 */
Flight::route('GET /department', function(){
    Flight::json(Flight::department_service() -> get_all());
    
});


/**
 * @OA\Get(path="/department/{id}", tags={"department"},
 *         summary="Return department  by id from the API. ",
 *         @OA\Parameter(in="path", name="id", example=1, description="ID of department"),
 *         @OA\Response( response=200, description="Individual department.")
 * )
 */
Flight::route('GET /department/@id', function($id){
    Flight::json(Flight::department_service() -> get_by_id($id));
  
});

/**
* @OA\Post(
*     path="/locked/department", security={{"ApiKeyAuth": {}}},
*     description="Add department",
*     tags={"department"},
*     @OA\RequestBody(description="department ", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    			
*    				@OA\Property(property="name", type="string", example="oftamology",	description="name")
*    	
*    			
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="department has been added"
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('POST /locked/department', function(){
  Flight::json(Flight::department_service()->add(Flight::request()->data->getData()));
    

  });

  /**
* @OA\Put(
*     path="/locked/department/{id}", security={{"ApiKeyAuth": {}}},
*     description="Update department",
*     tags={"department"},
*     @OA\Parameter(in="path", name="id", example=1, description="department_id"),
*     @OA\RequestBody(description="department info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    			@OA\Property(property="name", type="string", example="oftamology",	description="name")
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="department has been updated"
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
  Flight::route('PUT /locked/department/@id', function($id){
    $department = Flight::request()->data->getData();
    Flight::json(['message' => "department edit successfully",
                  'data' => Flight::department_service()->update($department, $id)
                 ]);
  });

/**
* @OA\Delete(
*     path="/locked/department/{id}", security={{"ApiKeyAuth": {}}},
*     description="Delete department",
*     tags={"department"},
*     @OA\Parameter(in="path", name="id", example=1, description="department_id"),
*     @OA\Response(
*         response=200,
*         description="department deleted"
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('DELETE /locked/department/@id', function($id){
    Flight::department_service()->delete($id);
    Flight::json(["message"=> "deleted"]);
});

?>