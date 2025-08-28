# Profundizando en el tipo String
# Concatenación automatica
# El operador + se utiliza para concatenar cadenas de texto
# Si se utiliza el operador + entre dos cadenas de texto, se concatenan
# Si se utiliza el operador + entre una cadena de texto y otro tipo de dato, se produce un error
# Si se utiliza el operador + entre una cadena de texto y un número, se produce un error
# Si se utiliza el operador + entre una cadena de texto y un booleano, se produce un error
# Si se utiliza el operador + entre una cadena de texto y una lista, se produce un error
# Si se utiliza el operador + entre una cadena de texto y una tupla, se produce un error
# Si se utiliza el operador + entre una cadena de texto y un diccionario, se produce un error
# Si se utiliza el operador + entre una cadena de texto y un None, se produce un error

import math

mensaje = "Hola" " Alumnos"
print(mensaje)

variable = "Adios"
mensaje2 = "Hola " + variable
mensaje2 += ", Terminamos"
# print(mensaje2) # Hola Adios, Terminamos

# usamos la claase help para ver la documentación de un tipo de dato (built-in)
help(str) # Nos muestra toda la documentación del tipo str
help(str.capitalize) # Nos muestra la documentación del método capitalize de la clase str

help(math) # Nos muestra toda la documentación del módulo math
help(math.isnan) # Nos muestra la documentación de la función isnan del módulo math



