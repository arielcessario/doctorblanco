<?php

class Noticias extends Main{
    public function __construct($fnc, $prm, $req){
        parent::__construct(get_class($this), $prm, $fnc);
        $this->$fnc($prm);
    }


    /////// GET ////////
    /**
     * @description Obtiene las sucursales
     */
    function get()
    {
        if(!$this->params->all){
            $this->db->where('nombre <> "Deposito"');
        }
        $results = $this->db->get('sucursales');
        $this->sendResponse($results);
    }

    function getAll(){
        $results = $this->db->get('noticias');
        $this->sendResponse($results);
    }

    /* @name: create
     * @param $user
     * @description: Crea un nuevo usuario y su dirección
     * todo: Sacar dirección, el usuario puede tener varias direcciones.
     */
    function create($params)
    {

        $this->db->startTransaction();
        try {
            
            $data = array(
                'titulo' => $params->titulo,
                'detalles' => $params->detalles,
                'foto' =>$params->foto,
                'fecha' => $this->db->now(),
                'creador_id' => 0
            );

            $result = $this->db->insert('noticias', $data);

            if (!$result) {
                $this->db->rollback();
                $this->sendResponse('Caught exception: ' . $this->db->getLastError() . "\n");
                return;
            }


            $this->db->commit();
            $this->sendResponse('Ok');


        } catch
        (Exception $e) {
            $this->db->rollback();
            $this->sendResponse('Caught exception: ' . $e->getMessage() . "\n");
        }
    }

    /* @name: create
     * @param $user
     * @description: Crea un nuevo usuario y su dirección
     * todo: Sacar dirección, el usuario puede tener varias direcciones.
     */
    function update($params)
    {

        $this->db->startTransaction();
        try {
            
            $data = array(
                'titulo' => $params->titulo,
                'detalles' => $params->detalles,
                'foto' =>$params->foto,
                'creador_id' => 0
            );

            $this->db->where('noticia_id', $params->noticia_id);

            $result = $this->db->update('noticias', $data);

            if (!$result) {
                $this->db->rollback();
                $this->sendResponse('Caught exception: ' . $this->db->getLastError() . "\n");
                return;
            }


            $this->db->commit();
            $this->sendResponse('Ok');


        } catch
        (Exception $e) {
            $this->db->rollback();
            $this->sendResponse('Caught exception: ' . $e->getMessage() . "\n");
        }
    }

}