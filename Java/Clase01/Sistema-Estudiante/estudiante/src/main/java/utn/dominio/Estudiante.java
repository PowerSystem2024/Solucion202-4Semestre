package utn.dominio;

public class Estudiante {

    private int idestudiante;
    private String nombre;
    private String apellido;
    private String telefono;
    private String email;

    // Constructores
    public Estudiante(){} // Constructor vacio

    public Estudiante(int idestudiante){ // Constructor para la llave primaria
        this.idestudiante = idestudiante;
    }

    public Estudiante(String nombre, String apellido, String telefono, String email){
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.email = email;
    }

    public Estudiante (int idestudiante, String nombre, String apellido, String telefono, String email){
        this.idestudiante = idestudiante;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.email = email;
    }

    public int getIdestudiante() {
        return idestudiante;
    }

    public void setIdestudiante(int idestudiante) {
        this.idestudiante = idestudiante;
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
        return "Estudiante [idestudiante= " + idestudiante + ", nombre= " + nombre + ", apellido= " + apellido
                + ", telefono= " + telefono + ", email= " + email + "]";
    }

}
