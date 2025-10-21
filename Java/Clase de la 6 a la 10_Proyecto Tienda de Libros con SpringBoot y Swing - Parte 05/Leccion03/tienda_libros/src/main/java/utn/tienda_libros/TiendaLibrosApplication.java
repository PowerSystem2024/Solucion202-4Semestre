package utn.tienda_libros;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import utn.tienda_libros.vista.LibroForm;

@SpringBootApplication
public class TiendaLibrosApplication implements CommandLineRunner {

    @Autowired
    private LibroForm libroForm;

    public static void main(String[] args) {
        // 👇 Esto desactiva el modo sin interfaz gráfica (Headless)
        System.setProperty("java.awt.headless", "false");

        SpringApplication.run(TiendaLibrosApplication.class, args);
    }

    @Override
    public void run(String... args) {
        // ✅ Solo abrir la ventana si hay entorno gráfico disponible
        if (!java.awt.GraphicsEnvironment.isHeadless()) {
            libroForm.setVisible(true);
        } else {
            System.out.println("⚠️ Entorno sin interfaz gráfica (headless). No se abrirá la ventana Swing.");
        }
    }
}
