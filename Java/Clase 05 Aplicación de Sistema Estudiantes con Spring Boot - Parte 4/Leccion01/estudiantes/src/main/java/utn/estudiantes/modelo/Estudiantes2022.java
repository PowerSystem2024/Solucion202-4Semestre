package utn.estudiantes.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Estudiantes2022 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idestudiantes2022;
    private String nombre;
    private String apellido;
    private String telefono;
    private String email;

    public Estudiantes2022() {
    }

    public Estudiantes2022(Integer idestudiantes2022, String nombre, String apellido, String telefono, String email) {
        this.idestudiantes2022 = idestudiantes2022;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.email = email;
    }

    public Integer getIdestudiantes2022() {
        return idestudiantes2022;
    }

    public void setIdestudiantes2022(Integer idestudiantes2022) {
        this.idestudiantes2022 = idestudiantes2022;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "Estudiante [id=" + idestudiantes2022 +
                ", nombre=" + nombre +
                ", apellido=" + apellido +
                ", telefono=" + telefono +
                ", email=" + email + "]";
    }
}
