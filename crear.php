<?php
include './config/db.php';
$db = conexion();

$json = file_get_contents('php://input');
$obj = json_decode($json);

$caso = $obj->{'caso'};
$i = $caso;

switch ($i) {

    case 0:

        $formulario = $obj->{'formulario'};

        $sql = "INSERT INTO contactos(nombre, apellido, telefono, correo) VALUES 
         ('" . $formulario->nombre . "','" . $formulario->apellido . "', '" . $formulario->telefono . "', '" . $formulario->correo . "')";
        mysqli_set_charset($db, "utf8");
        if (mysqli_query($db, $sql)) {
            echo json_encode("Se inserto correctamente");
        } else {
            echo json_encode("Error: " . $sql . "<br>" . mysqli_error($db));
        }
        break;

    case 1:
        $sql = "SELECT * FROM contactos";
        $result = $db->query($sql);
        if ($result->num_rows > 0) {
            $arreglo = [];
            while ($row = $result->fetch_assoc()) {
                $arreglo[] = array_map("utf8_encode", $row);
            }
            echo json_encode($arreglo);
        } else {
            echo "";
        }
        break;

    case 2:
        $arreglo = [];
        $id = $obj->{'id'};
        $sql = "SELECT * FROM contactos WHERE id = ${id}";
        $result = $db->query($sql);
        while ($row = $result->fetch_assoc()) {
            $arreglo[] = array_map("utf8_encode", $row);
        }
        echo json_encode($arreglo);
        break;

    case 3:
        $formulario = $obj->{'formulario'};
        $id = $obj->{'id'};
        $nombre = $formulario->nombre;
        $apellido = $formulario->apellido;
        $telefono = $formulario->telefono;
        $correo = $formulario->correo;
        $sql = "UPDATE contactos SET 
        nombre = '$nombre', apellido = '$apellido', telefono = '$telefono', correo = '$correo'
        WHERE id = ${id}";
        mysqli_set_charset($db, "utf8");
        if (mysqli_query($db, $sql)) {
            echo json_encode("Se inserto actualizo correctamente");
        } else {
            echo json_encode("Error: " . $sql . "<br>" . mysqli_error($db));
        }
        break;

    case 4:
        $id = $obj->{'id'};
        $sql = "DELETE FROM contactos WHERE id = ${id}";
        $result = $db->query($sql);
        break;

    default:
        # code...
        break;
}
