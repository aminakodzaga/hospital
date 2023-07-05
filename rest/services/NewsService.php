<?php
require_once 'BaseService.php';
require_once __DIR__."/../dao/NewsDao.class.php";

class NewsService extends BaseService{
    public function __construct(){
        parent::__construct(new NewsDao);
    } 
}
?>