<?php
require_once 'BaseService.php';
require_once __DIR__."/../dao/DepartmentDao.class.php";

class DepartmentService extends BaseService{
    public function __construct(){
        parent::__construct(new DepartmentDao);
    } 
    public function get_by_name($name) {
        return $this->dao->get_by_name($name);
    }
}
?>