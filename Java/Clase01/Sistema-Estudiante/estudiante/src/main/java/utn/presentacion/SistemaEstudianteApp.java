package utn.presentacion;

//import utn.conexion.*;
import utn.datos.EstudianteDAO;
import utn.dominio.Estudiante;

import java.util.List;
import java.util.Scanner;

public class SistemaEstudianteApp {

    public static void main(String[] args) {
        
        var salir = false;
        var consola = new Scanner(System.in); //para leer datos del teclado
        var estudianteDAO = new EstudianteDAO();
        // Creamos una instancia fuera del ciclo while
        while(!salir){
            try {
                System.out.println("----------------------------------");
                mostrarMenu(); //Este metodo muestra el menu de opciones
                salir = ejecutarOpciones(consola, estudianteDAO);
            } catch (Exception e) {
                System.out.println("Ocurrio un error al ejecutar la operacion: " + e.getMessage());
            }
        } // Fin while

        System.out.println("Gracias por usar el sistema de estudiantes");
        consola.close();
    } // Fin main

    private static void mostrarMenu() {
        System.out.print("""
                ***** Sistema de Estudiantes *****

                1. Listar estudiantes
                2. Buscar estudiante por id
                3. Agregar estudiante
                4. Actualizar estudiante
                5. Eliminar estudiante
                6. Salir

                Seleccione una opcion: """);
        
    } // Fin mostrarMenu
    
    // Metodo para ejecutar las opciones del menu
    // Si modifica el estado de salir, retorna true
    // Si no modifica el estado de salir, retorna false
    // Si se ingresa una opcion invalida, retorna false
    // Si se ingresa una opcion valida, retorna true
    private static boolean ejecutarOpciones(Scanner consola, EstudianteDAO estudianteDAO) {

        var opcion = Integer.parseInt(consola.nextLine());
        System.out.println("----------------------------------");
        var salir = false;

        switch (opcion) {
            case 1 -> {
                // Listar estudiantes
                System.out.print("");
                System.out.println("Listado de estudiantes: ");
                List<Estudiante> estudiantes = estudianteDAO.listarEstudiantes();
                estudiantes.forEach(System.out::println); // Funcion lambda
                
            }
            case 2 -> {
                // Buscar estudiante por id
                System.out.print("Ingrese el id del estudiante a buscar: ");
                var idestudiante = Integer.parseInt(consola.nextLine());
                var estudiante = new Estudiante(idestudiante);
                var encontrado = estudianteDAO.buscarEstudiantePorId(estudiante);
                if (encontrado) {
                    System.out.println("Estudiante encontrado: " + estudiante);
                } else {
                    System.out.println("No se encontro el estudiante: " + estudiante);
                }
                
            }
            case 3 -> {
                // Agregar estudiante
                System.out.println("Agregar estudiante: ");
                System.out.print("Ingrese el nombre del estudiante: ");
                var nombre = consola.nextLine();
                System.out.print("Ingrese el apellido del estudiante: ");
                var apellido = consola.nextLine();
                System.out.print("Ingrese el telefono del estudiante: ");
                var telefono = consola.nextLine();
                System.out.print("Ingrese el email del estudiante: ");
                var email = consola.nextLine();

                var nuevoEstudiante = new Estudiante(nombre, apellido, telefono, email);
                var agregado = estudianteDAO.agregarEstudiante(nuevoEstudiante);
                if (agregado) {
                    System.out.println("Estudiante agregado: " + nuevoEstudiante);
                } else {
                    System.out.println("No se pudo agregar el estudiante: " + nuevoEstudiante);
                }
                
            }
            case 4 -> {
                // Actualizar estudiante
                System.out.println("Actualizar estudiante: ");
                System.out.print("Ingrese el id del estudiante a modificar: ");
                var idestudiante = Integer.parseInt(consola.nextLine());
                                
                System.out.print("Ingrese el nuevo nombre del estudiante: ");
                var nombre = consola.nextLine();
                System.out.print("Ingrese el nuevo apellido del estudiante: ");
                var apellido = consola.nextLine();
                System.out.print("Ingrese el nuevo telefono del estudiante: ");
                var telefono = consola.nextLine();
                System.out.print("Ingrese el nuevo email del estudiante: ");
                var email = consola.nextLine();

                var estudianteModificado = new Estudiante(idestudiante, nombre, apellido, telefono, email);
                // Llamamos al metodo modificarEstudiante del DAO

                var modificado = estudianteDAO.modificarEstudiante(estudianteModificado);
                if (modificado) {
                    System.out.println("Estudiante modificado: " + estudianteModificado);
                } else {
                    System.out.println("No se pudo modificar el estudiante: " + estudianteModificado);
                }
                
            }
            case 5 -> {
                // Eliminar estudiante
                System.out.println("Eliminar estudiante: ");
                System.out.print("Ingrese el id del estudiante a eliminar: ");
                var idestudiante = Integer.parseInt(consola.nextLine());
                var estudianteEliminar = new Estudiante(idestudiante);
                var eliminado = estudianteDAO.eliminarEstudiante(estudianteEliminar);
                if (eliminado) {
                    System.out.println("Estudiante eliminado: " + estudianteEliminar);
                } else {
                    System.out.println("No se elimino el estudiante: " + estudianteEliminar);
                }
                
            }
            case 6 -> {
                // Salir
                System.out.println("Saliendo del sistema...");
                salir = true;
            }
            default -> {
                System.out.println("Opcion invalida, por favor intente nuevamente.");
            }
        } // Fin switch

        return salir;   
    } // Fin metodo ejecutarOpciones

} // Fin clase SistemaEstudianteApp

