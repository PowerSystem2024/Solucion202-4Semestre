package utn.conexion;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conexion {

    public static Connection getConnection(){
        Connection conexion = null;
        // Variables para conectarse a la base de datos
        var baseDatos = "estudiante2022";
        var url = "jdbc:mariadb://localhost:3306/" + baseDatos;
        var usuario = "";
        var password = "";

        // Cargamos la clase del driver de mysql en memoria
        try {
            Class.forName("org.mariadb.jdbc.Driver");
            conexion = DriverManager.getConnection(url, usuario,password);
        } catch (ClassNotFoundException | SQLException e) {
            System.out.println("ocurrio un error en la conexion: " + e.getMessage());
        } //Fin catch
        return conexion;
    } // Fin metodo conexion

}
