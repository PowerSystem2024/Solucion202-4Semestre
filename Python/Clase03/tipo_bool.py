# Bool contiene los valores de True y False
# Para los tipos numericos, True es 1 y False es 0

valor = 0
resultado = bool(valor)
print(f"El valor de {valor} es {resultado}") # El valor de 0 es False

valor1 = 15
resultado1 = bool(valor1)
print(f"El valor de {valor1} es {resultado1}") # El valor de 15 es True

valor2 = -5
resultado2 = bool(valor2)
print(f"El valor de {valor2} es {resultado2}") # El valor de -5 es True

valor3 = 0.0
resultado3 = bool(valor3)
print(f"El valor de {valor3} es {resultado3}") # El valor de 0.0 es False

valor4 = 3.14
resultado4 = bool(valor4)
print(f"El valor de {valor4} es {resultado4}") # El valor de 3.14 es True

# Tipo String -> Vacio es False, cualquier otro valor es True
texto = ""
resultado5 = bool(texto)
print(f"El valor de '{texto}' es {resultado5}") # El valor de '' es False

texto1 = "Hola"
resultado6 = bool(texto1)
print(f"El valor de '{texto1}' es {resultado6}") # El valor de 'Hola' es True

# Tipo colecciones -> Vacio es False, cualquier otro valor es True
# Listas
lista = []
resultado7 = bool(lista)
print(f"El valor de {lista} es {resultado7}") # El valor de [] es False

lista1 = [1, 2, 3]
resultado8 = bool(lista1)
print(f"El valor de {lista1} es {resultado8}") # El valor de [1, 2, 3] es True

# Tuplas
tupla = ()
resultado9 = bool(tupla)
print(f"El valor de {tupla} es {resultado9}") # El valor de () es False

tupla1 = (1, 2)
resultado10 = bool(tupla1)
print(f"El valor de {tupla1} es {resultado10}") # El valor de (1, 2) es True

# Diccionarios
diccionario = {}
resultado11 = bool(diccionario)
print(f"El valor de {diccionario} es {resultado11}") # El valor de {} es False 

diccionario1 = {"a": 1}
resultado12 = bool(diccionario1)
print(f"El valor de {diccionario1} es {resultado12}") # El valor de {'a': 1} es True

# Sentencias condicionales
if '':
    print("Regresa Verdadero")
else:
    print("Regresa Falso") # Regresa Falso

if bool('Hola'): # Usamos el constructor bool
    print("Regresa Verdadero") # Regresa Verdadero
else:
    print("Regresa Falso")

if 0:
    print("Regresa Verdadero")
else:
    print("Regresa Falso")  # Regresa Falso 

if bool(25): # Usamos el constructor bool
    print("Regresa Verdadero") # Regresa Verdadero
else:
    print("Regresa Falso")

# Ciclos
variable = 3
print("Ciclo while con variable =", variable)
while variable:
    print("Regresa Verdadero") # Regresa Verdadero
    break
else:
    print("Regresa Falso")