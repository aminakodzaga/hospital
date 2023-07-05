<?php
require_once "BaseDao.class.php";

 class NewsDao extends BaseDao{


  public function __construct(){
    parent::__construct("news");
  }
 }
 ?>