<?php

class Principal extends Main
{
    public function __construct($fnc, $prm, $req)
    {
        parent::__construct(get_class($this), $prm, $fnc);
        $this->$fnc($prm);
    }

    /////// GET ////////
    /**
     * @description Obtiene las sucursales
     */
    public function get($params)
    {

        $results = $this->db->get('principal');
        $this->sendResponse($results);
    }

    public function update($params)
    {

        // if (!$this->user) {
        //     $this->sendError('Por favor ingrese con su usuario y contraseña');
        //     return;
        // }

        $this->db->startTransaction();

        try {

            // $productos = $this->db->get('carrito_detalles c', null, 'c.carrito_detalle_id, c.carrito_id, c.producto_id, p.nombre, c.cantidad, c.en_oferta, c.precio_unitario');
            $data = array(
                'titulo' => $params->titulo,
                'detalles' => $params->detalles,
                'foto' => $params->foto,
            );

            $this->db->where('principal_id', $params->principal_id);

            if (!$this->db->update('principal', $data)) {
                $this->db->rollback();
                $this->sendError('Caught exception: ' . $this->db->getLastError() . "\n");
                return;
            }

            $this->db->commit();
            $this->sendResponse('Ok');
        } catch (Exception $e) {
            $this->db->rollback();
            $this->sendError('Caught exception: ' . $e->getMessage() . "\n");
        }
    }

}
