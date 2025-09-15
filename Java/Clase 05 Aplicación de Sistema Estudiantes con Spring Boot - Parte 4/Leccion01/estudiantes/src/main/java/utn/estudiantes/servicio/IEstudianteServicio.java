package utn.estudiantes.servicio;

import utn.estudiantes.modelo.Estudiantes2022;

import java.util.List;

public interface IEstudianteServicio {

    List<Estudiantes2022> listarEstudiantes();

    Estudiantes2022 buscarEstudiantePorId(Integer idEstudiantes2022); // ← corregido

    void guardarEstudiante(Estudiantes2022 estudiante);

    void eliminarEstudiante(Estudiantes2022 estudiante);
}
