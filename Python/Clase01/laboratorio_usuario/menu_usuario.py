from usuario import Usuario
from usuario_dao import UsuarioDAO
from logger_base import logger

def menu():
    print('====== MENU USUARIO ======')
    print('1) Listar Usuario')
    print('2) Agregar usuario')
    print('3) Actualizar usuario')
    print('4) Eliminar usuario')
    print('5) Salir')
    return input('Seleccione una opcion: ')

def main():
    while True:
        opcion = menu()
        if opcion == '1':
            usuarios = UsuarioDAO.seleccionar()
            for u in usuarios:
                print(u)
        elif opcion == '2':
            username = input('Username: ')
            password = input('Password: ')
            usuario = Usuario(username=username, password=password)
            UsuarioDAO.insertar(usuario)
        elif opcion == '3':
            id_usuario = int(input("Id a actualizar: "))
            username = input("Nuevo username: ")
            password = input("Nuevo password: ")
            usuario = Usuario(id_usuario=id_usuario, username=username, password=password)
            UsuarioDAO.actualizar(usuario)
        elif opcion == '4':
            id_usuario = int(input("ID a eliminar: "))
            usuario = Usuario(id_usuario=id_usuario)
            UsuarioDAO.eliminar(usuario)
        elif opcion == '5':
            break
        else:
            print('Opcion invalida')

if __name__ == '__main__':
    main()