package utn.tienda_libros.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utn.tienda_libros.modelo.Libro;
import utn.tienda_libros.repositorio.LibroRepositorio;

import java.util.List;

@Service
public class LibroServicio {

    @Autowired
    private LibroRepositorio libroRepositorio;

    public List<Libro> listarLibros() {
        return libroRepositorio.findAll();
    }

    public Libro guardarLibro(Libro libro) {
        return libroRepositorio.save(libro);
    }

    // ✅ Método que faltaba
    public void eliminarLibroPorId(Integer idLibro) {
        libroRepositorio.deleteById(idLibro);
    }
}
