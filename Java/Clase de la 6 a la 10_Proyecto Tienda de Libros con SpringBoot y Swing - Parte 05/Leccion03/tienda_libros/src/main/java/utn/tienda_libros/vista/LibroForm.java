package utn.tienda_libros.vista;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import utn.tienda_libros.servicio.LibroServicio;
import utn.tienda_libros.modelo.Libro;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.ActionEvent;

@Component
public class LibroForm extends JFrame {

    private final LibroServicio libroServicio;

    private JButton agregarButton;
    private JButton modificarButton;
    private JButton eliminarButton;
    private JButton salirButton; // ✅ Nuevo botón
    private JTable tablaLibros;
    private JTextField libroTexto;
    private JTextField autorTexto;
    private JTextField precioTexto;
    private JTextField existenciasTexto;
    private JTextField idTexto;
    private DefaultTableModel tablaModeloLibros;

    @Autowired
    public LibroForm(LibroServicio libroServicio) {
        this.libroServicio = libroServicio;

        if (!GraphicsEnvironment.isHeadless()) {
            initComponents();
            configurarEventos();
            listarLibros();
        } else {
            System.out.println("⚠️ Modo headless detectado. No se abrirá la interfaz gráfica.");
        }
    }

    // ----------------- EVENTOS -----------------
    private void configurarEventos() {
        agregarButton.addActionListener(this::agregarLibro);
        modificarButton.addActionListener(this::modificarLibro);
        eliminarButton.addActionListener(this::eliminarLibro);
        salirButton.addActionListener(e -> salirAplicacion());

        // Rellenar campos al seleccionar una fila
        tablaLibros.getSelectionModel().addListSelectionListener(e -> {
            int fila = tablaLibros.getSelectedRow();
            if (fila != -1) {
                idTexto.setText(tablaLibros.getValueAt(fila, 0).toString());
                libroTexto.setText(tablaLibros.getValueAt(fila, 1).toString());
                autorTexto.setText(tablaLibros.getValueAt(fila, 2).toString());
                precioTexto.setText(tablaLibros.getValueAt(fila, 3).toString());
                existenciasTexto.setText(tablaLibros.getValueAt(fila, 4).toString());
            }
        });
    }

    // ----------------- VALIDACIONES -----------------
    private boolean validarCampos() {
        if (libroTexto.getText().trim().isEmpty() ||
            autorTexto.getText().trim().isEmpty() ||
            precioTexto.getText().trim().isEmpty() ||
            existenciasTexto.getText().trim().isEmpty()) {

            JOptionPane.showMessageDialog(this, "⚠️ Debes completar todos los campos antes de continuar.",
                    "Campos vacíos", JOptionPane.WARNING_MESSAGE);
            return false;
        }

        try {
            double precio = Double.parseDouble(precioTexto.getText().trim());
            int existencias = Integer.parseInt(existenciasTexto.getText().trim());
            if (precio < 0 || existencias < 0) {
                JOptionPane.showMessageDialog(this, "⚠️ Precio y existencias deben ser positivos.",
                        "Valores inválidos", JOptionPane.WARNING_MESSAGE);
                return false;
            }
        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(this, "⚠️ El precio y existencias deben ser números válidos.",
                    "Error de formato", JOptionPane.ERROR_MESSAGE);
            return false;
        }
        return true;
    }

    // ----------------- ACCIONES -----------------
    private void agregarLibro(ActionEvent e) {
        try {
            if (!validarCampos()) return;

            var libro = new Libro();
            libro.setNombreLibro(libroTexto.getText().trim());
            libro.setAutor(autorTexto.getText().trim());
            libro.setPrecio(Double.parseDouble(precioTexto.getText().trim()));
            libro.setExistencias(Integer.parseInt(existenciasTexto.getText().trim()));

            libroServicio.guardarLibro(libro);
            limpiarCampos();
            listarLibros();
            JOptionPane.showMessageDialog(this, "✅ Libro agregado correctamente.");
        } catch (Exception ex) {
            JOptionPane.showMessageDialog(this, "⚠️ Error al agregar libro: " + ex.getMessage());
        }
    }

    private void modificarLibro(ActionEvent e) {
        int fila = tablaLibros.getSelectedRow();
        if (fila != -1) {
            try {
                if (!validarCampos()) return;

                Integer idLibro = Integer.parseInt(idTexto.getText().trim());
                var libro = new Libro(idLibro,
                        libroTexto.getText().trim(),
                        autorTexto.getText().trim(),
                        Double.parseDouble(precioTexto.getText().trim()),
                        Integer.parseInt(existenciasTexto.getText().trim()));

                libroServicio.guardarLibro(libro);
                listarLibros();
                limpiarCampos();
                JOptionPane.showMessageDialog(this, "✏️ Libro modificado correctamente.");
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(this, "⚠️ Error al modificar: " + ex.getMessage());
            }
        } else {
            JOptionPane.showMessageDialog(this, "Selecciona un libro para modificar.");
        }
    }

    private void eliminarLibro(ActionEvent e) {
        int fila = tablaLibros.getSelectedRow();
        if (fila != -1) {
            Integer idLibro = Integer.parseInt(tablaLibros.getValueAt(fila, 0).toString());
            libroServicio.eliminarLibroPorId(idLibro);
            listarLibros();
            limpiarCampos();
            JOptionPane.showMessageDialog(this, "🗑️ Libro eliminado correctamente.");
        } else {
            JOptionPane.showMessageDialog(this, "Selecciona un libro para eliminar.");
        }
    }

    // ✅ Nuevo método salir
    private void salirAplicacion() {
        int opcion = JOptionPane.showConfirmDialog(this,
                "¿Deseas salir de la aplicación?",
                "Confirmar salida",
                JOptionPane.YES_NO_OPTION,
                JOptionPane.QUESTION_MESSAGE);
        if (opcion == JOptionPane.YES_OPTION) {
            dispose(); // Cierra la ventana
            System.exit(0); // Finaliza el programa
        }
    }

    // ----------------- TABLA -----------------
    private void listarLibros() {
        tablaModeloLibros.setRowCount(0);
        var libros = libroServicio.listarLibros();
        libros.forEach(libro -> {
            Object[] fila = {
                    libro.getIdLibro(),
                    libro.getNombreLibro(),
                    libro.getAutor(),
                    libro.getPrecio(),
                    libro.getExistencias()
            };
            tablaModeloLibros.addRow(fila);
        });
    }

    private void limpiarCampos() {
        idTexto.setText("");
        libroTexto.setText("");
        autorTexto.setText("");
        precioTexto.setText("");
        existenciasTexto.setText("");
        tablaLibros.clearSelection();
    }

    // ----------------- UI -----------------
    private void initComponents() {
        setTitle("📚 Tienda de Libros");
        setSize(900, 600);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        JPanel panelPrincipal = new JPanel(new BorderLayout(10, 10));
        panelPrincipal.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

        JPanel panelCampos = new JPanel(new GridLayout(5, 2, 5, 5));

        idTexto = new JTextField("");
        idTexto.setVisible(false);

        panelCampos.add(new JLabel("Libro:"));
        libroTexto = new JTextField();
        panelCampos.add(libroTexto);

        panelCampos.add(new JLabel("Autor:"));
        autorTexto = new JTextField();
        panelCampos.add(autorTexto);

        panelCampos.add(new JLabel("Precio:"));
        precioTexto = new JTextField();
        panelCampos.add(precioTexto);

        panelCampos.add(new JLabel("Existencias:"));
        existenciasTexto = new JTextField();
        panelCampos.add(existenciasTexto);

        createUIComponents();

        JScrollPane scrollPane = new JScrollPane(tablaLibros);

        JPanel panelBotones = new JPanel(new FlowLayout(FlowLayout.CENTER, 15, 10));
        agregarButton = new JButton("Agregar");
        modificarButton = new JButton("Modificar");
        eliminarButton = new JButton("Eliminar");
        salirButton = new JButton("Salir"); // ✅ Nuevo botón

        panelBotones.add(agregarButton);
        panelBotones.add(modificarButton);
        panelBotones.add(eliminarButton);
        panelBotones.add(salirButton); // ✅ Agregado al panel

        panelPrincipal.add(panelCampos, BorderLayout.NORTH);
        panelPrincipal.add(scrollPane, BorderLayout.CENTER);
        panelPrincipal.add(panelBotones, BorderLayout.SOUTH);

        add(panelPrincipal);
    }

    // ✅ Configuración de la tabla
    private void createUIComponents() {
        idTexto = new JTextField("");
        idTexto.setVisible(false);

        this.tablaModeloLibros = new DefaultTableModel(0, 5) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false; // No editable
            }
        };

        String[] cabecera = {"ID", "Libro", "Autor", "Precio", "Existencias"};
        this.tablaModeloLibros.setColumnIdentifiers(cabecera);

        this.tablaLibros = new JTable(tablaModeloLibros);

        // ✅ Solo permite seleccionar una fila a la vez
        tablaLibros.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);

        listarLibros();
    }
}
