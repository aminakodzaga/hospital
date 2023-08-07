<?php

/**
 * @OA\Info(title="Hospital", version="0.1", 
 *     @OA\Contact(
 *     email="amina.kodzaga@stu.ibu.edu.ba",
 *     name="Amina Kodzaga"
 *   )),
 * @OA\OpenApi(
 *   @OA\Server(
 *       url="http://localhost/hospital/rest/",
 *       description="Development Environment"
 *   ),
 * @OA\Server(
 *       url="http://localhost/hospital/rest/",
 *       description="Production Environment"
 *   )
 * ),
 * @OA\SecurityScheme(securityScheme="ApiKeyAuth", type="apiKey", in="header", name="Authorization" )
 */

?>