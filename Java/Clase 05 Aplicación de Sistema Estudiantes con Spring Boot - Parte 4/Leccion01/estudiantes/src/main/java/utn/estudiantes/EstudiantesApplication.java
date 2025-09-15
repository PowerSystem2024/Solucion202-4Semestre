package utn.estudiantes;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import utn.estudiantes.modelo.Estudiantes2022;
import utn.estudiantes.servicio.IEstudianteServicio;

import java.util.List;
import java.util.Scanner;

@SpringBootApplication
public class EstudiantesApplication implements CommandLineRunner {

	@Autowired
	private IEstudianteServicio estudianteServicio;

	private static final Logger logger = LoggerFactory.getLogger(EstudiantesApplication.class);
	String nl = System.lineSeparator();

	public static void main(String[] args) {
		SpringApplication.run(EstudiantesApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		logger.info("Iniciando la aplicación..." + nl);
		var salir = false;
		var consola = new Scanner(System.in);

		while (!salir) {
			mostrarMenu();
			salir = ejecutarOpciones(consola);
			logger.info(nl);
		}
	}

	private void mostrarMenu() {
		logger.info(nl);
		logger.info("""
                ****** Sistema de Estudiantes ******
                1. Listar Estudiantes
                2. Buscar Estudiante
                3. Agregar Estudiante
                4. Modificar Estudiante
                5. Eliminar Estudiante
                6. Salir
                Elija una opción:""");
	}

	private boolean ejecutarOpciones(Scanner consola) {
		var opcion = Integer.parseInt(consola.nextLine());
		var salir = false;

		switch (opcion) {
			case 1 -> {
				List<Estudiantes2022> estudiantes = estudianteServicio.listarEstudiantes();
				estudiantes.forEach(est -> logger.info(est.toString() + nl));
			}

			case 2 -> {
				logger.info("Digite el id del estudiante a buscar: ");
				var idEstudiante = Integer.parseInt(consola.nextLine());
				Estudiantes2022 estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante);
				if (estudiante != null)
					logger.info("Estudiante encontrado: " + estudiante + nl);
				else
					logger.info("Estudiante NO encontrado con id: " + idEstudiante + nl);
			}

			case 3 -> {
				logger.info("Agregar estudiante:" + nl);
				logger.info("Nombre: ");
				var nombre = consola.nextLine();
				logger.info("Apellido: ");
				var apellido = consola.nextLine();
				logger.info("Telefono: ");
				var telefono = consola.nextLine();
				logger.info("Email: ");
				var email = consola.nextLine();

				var estudiante = new Estudiantes2022();
				estudiante.setNombre(nombre);
				estudiante.setApellido(apellido);
				estudiante.setTelefono(telefono);
				estudiante.setEmail(email);

				estudianteServicio.guardarEstudiante(estudiante);
				logger.info("Estudiante agregado: " + estudiante + nl);
			}

			case 4 -> {
				logger.info("Modificar estudiante:" + nl);
				logger.info("Ingrese el id del estudiante: ");
				var idEstudiante = Integer.parseInt(consola.nextLine());
				Estudiantes2022 estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante);

				if (estudiante != null) {
					logger.info("Nombre: ");
					estudiante.setNombre(consola.nextLine());
					logger.info("Apellido: ");
					estudiante.setApellido(consola.nextLine());
					logger.info("Telefono: ");
					estudiante.setTelefono(consola.nextLine());
					logger.info("Email: ");
					estudiante.setEmail(consola.nextLine());

					estudianteServicio.guardarEstudiante(estudiante);
					logger.info("Estudiante modificado: " + estudiante + nl);
				} else {
					logger.info("Estudiante con ID " + idEstudiante + " no encontrado." + nl);
				}
			}

			case 5 -> {
				logger.info("Eliminar estudiante:");
				logger.info("Ingrese el id del estudiante: ");
				var idEstudiante = Integer.parseInt(consola.nextLine());
				Estudiantes2022 estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante);

				if (estudiante != null) {
					estudianteServicio.eliminarEstudiante(estudiante);
					logger.info("Estudiante eliminado: " + estudiante + nl);
				} else {
					logger.info("Estudiante con ID " + idEstudiante + " no encontrado." + nl);
				}
			}

			case 6 -> {
				logger.info("¡Salir!");
				salir = true;
			}

			default -> logger.info("Opción no válida." + nl);
		}
		return salir;
	}
}
