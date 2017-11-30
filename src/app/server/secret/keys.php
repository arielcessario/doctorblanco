<?php

// JWT Secret Key
// false local / true production
$jwt_enabled = true;
//$secret = base64_encode('asdfwearsadfasdareasdfaeasdfaefawasadf');
//$secret = ';-j}gaM#%mufc4Fp-49aG*2WSGCwQ:#MNSgFeY{f[.CwUbeg@p';
$secret = '';
// JWT Secret Key Social
$secret_social = '';
// JWT AUD
$serverName = '';
// DB

$secret_face = '';

class DBConnect{

private $db_server = 'localhost';
private $db_pass = '';
private $db_schema = 'arielces_bayres';
private $db_user = '';

    public function getServer(){
        return $this->db_server;
    }
    public function getPass(){
        return $this->db_pass;
    }
    public function getSchema(){
        return $this->db_schema;
    }
    public function getUser(){
        return $this->db_user;
    }
}