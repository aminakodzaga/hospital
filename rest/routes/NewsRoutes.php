<?php
/**
 * @OA\Get(path="/news", tags={"news"},
 *         summary="Return all news from the API. ",
 *         @OA\Response( response=200, description="List of news.")
 * )
 */
Flight::route('GET /news', function(){
    Flight::json(Flight::news_service() -> get_all());
    
});


Flight::route("GET /news_by_id", function(){
  Flight::json(Flight::news_service()->get_by_id(Flight::request()->query['id']));
});

/**
 * @OA\Get(path="/news/{id}", tags={"news"},
 *         summary="Return news  by id from the API. ",
 *         @OA\Parameter(in="path", name="id", example=1, description="ID of news"),
 *         @OA\Response( response=200, description="Individual news.")
 * )
 */
Flight::route('GET /news/@id', function($id){
    Flight::json(Flight::news_service() -> get_by_id($id));
  
});

/**
* @OA\Post(
*     path="/locked/news", security={{"ApiKeyAuth": {}}},
*     description="Add news",
*     tags={"news"},
*     @OA\RequestBody(description="news ", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    			
*    				@OA\Property(property="nname", type="string", example="obavijest",	description="name"),
*    		 @OA\Property(property="description", type="string", example="nesto novo",	description="description"),
*        @OA\Property(property="image", type="string", example="blog_01.jpg",	description="image")
*    			
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="news has been added"
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('POST /locked/news', function(){
  $request = Flight::request()->data->getData();
  Flight::json(['message' => "news added successfully",
                'data' => Flight::news_service()->add($request)
               ]);
    

  });
  /**
* @OA\Put(
*     path="/locked/news/{id}", security={{"ApiKeyAuth": {}}},
*     description="Update news",
*     tags={"news"},
*     @OA\Parameter(in="path", name="id", example=1, description="news_id"),
*     @OA\RequestBody(description="news info", required=true,
*       @OA\MediaType(mediaType="application/json",
*    			@OA\Schema(
*    				@OA\Property(property="nname", type="string", example="obavijest",	description="name"),
*    		 @OA\Property(property="description", type="string", example="nesto novo",	description="description"),
*        @OA\Property(property="image", type="string", example="blog_01.jpg",	description="image")
*        )
*     )),
*     @OA\Response(
*         response=200,
*         description="news has been updated"
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
 
  Flight::route('PUT /locked/news/@id', function($id){
    $news = Flight::request()->data->getData();
    Flight::json(['message' => "news edit successfully",
                  'data' => Flight::news_service()->update($news, $id)
                 ]);
  });

/**
* @OA\Delete(
*     path="/locked/news/{id}", security={{"ApiKeyAuth": {}}},
*     description="Delete news",
*     tags={"news"},
*     @OA\Parameter(in="path", name="id", example=1, description="news_id"),
*     @OA\Response(
*         response=200,
*         description="news deleted"
*     ),
*     @OA\Response(
*         response=500,
*         description="Error"
*     )
* )
*/
Flight::route('DELETE /locked/news/@id', function($id){
    Flight::news_service()->delete($id);
    Flight::json(["message"=> "deleted"]);
});

?>