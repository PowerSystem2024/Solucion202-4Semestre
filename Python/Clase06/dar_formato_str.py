# Dar formato a una cadena de texto

nombre = "Juan"
edad = 28
mensaje_con_formato = 'Mi nombre es %s y tengo %d años.' % (nombre, edad) 
# Siempre respetar el orden de las variables
# print(mensaje_con_formato)

persona = ('Carla', 'Gomez', 50000.00) # tupla
mensaje_con_formato1 = 'Hola, %s %s. Tu sueldo es: %.2f' #% persona
#print(mensaje_con_formato1 % persona)

nombre = 'Ana'
edad = 19
sueldo = 75000.5678
mensaje_con_formato2 = 'Nombre: {}, edad: {} y sueldo: {:.2f}'.format(nombre, edad, sueldo)
# print(mensaje_con_formato2)

# mensaje = 'Nombre: {0} edad: {1} y sueldo: {2:.2f}'.format(nombre, edad, sueldo)
# mensaje1 = 'Sueldo: {2:.2f}, edad: {1} y nombre: {0} '.format(nombre, edad, sueldo)
# print(mensaje1)

mensaje2 = 'Nombre: {n}, Edad: {e} y Sueldo: {s:.2f}'.format(n=nombre, e=edad, s=sueldo)
# print(mensaje2)

diccionario = {'nombre': 'Pedro', 'edad': 30, 'sueldo': 60000.00}
mensaje3 = 'Nombre: {persona[nombre]}, edad: {persona[edad]} y sueldo: {persona[sueldo]:.2f}'.format(persona=diccionario)
print(mensaje3)