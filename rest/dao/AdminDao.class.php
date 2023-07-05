<?php
require_once __DIR__.'/BaseDao.class.php';

class AdminDao extends BaseDao{

  /**
  * constructor of dao class
  */
  public function __construct(){
    parent::__construct("admin");
  }

  public function get_user_by_email($email){
    return $this->query_unique("SELECT * FROM admin WHERE email = :email", ['email' => $email]);
  }

}

?>