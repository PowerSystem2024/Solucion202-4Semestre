# Profundizando en Sistemas de Numeración tipo float
a = 3.0
print(f"decimal a: {a:.2f}")

# Constructor de punto flotante -> puede recibir un entero o una cadena
b = float(10) # Le pasamos un entero
c = float("10") # Le pasamos una cadena
print(f"float b: {b:.2f}")
print(f"float c: {c:.2f}")

# Notacion exponencial (valores positivos y negativos)
""" Al agregar e5 o E5, estamos indicando que el número debe ser multiplicado por 10 elevado a la potencia de 5.
    Por ejemplo, 1e3 es igual a 1000.0 y 1e-3 es igual a 0.001. """
d = 3e5 # 3 * 10^5
print(f"d: {d:.2f}")
# Cualquier calculo con notación exponencial se convierte a float automáticamente
e = 3e-5 # 3 * 10^-5
print(f"e: {e:.5f}")

f = 4.0 + 5 # Suma de float y entero, el resultado es float
print(f"f: {f}")
print(type(f)) # Verificamos el tipo de dato