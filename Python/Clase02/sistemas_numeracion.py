# Profundizando en los sistemas de numeracion

# Sistema decimal
""" El sistema decimal es el sistema de numeración más comúnmente utilizado, basado en diez dígitos (0-9).
   En Python, los números decimales se representan directamente sin prefijos especiales. """
a = 10
print(f"decimal a: {a}")

# Sistema binario
""" El sistema binario utiliza dos dígitos (0 y 1) y es fundamental en la informática.
   En Python, los números binarios se representan con el prefijo '0b' o '0B'. """
b = 0b1010
print(f"binario b: {b}")
b = 0b10*5
print(f"binario b: {b}")

# Sistema octal
""" El sistema octal utiliza ocho dígitos (0-7) y es menos común, pero aún se usa en algunos contextos.
   En Python, los números octales se representan con el prefijo '0o' o '0O'. """
c = 0o12
print(f"octal c: {c}")
c = 0o10+2
print(f"octal c: {c}")

# Sistema hexadecimal
""" El sistema hexadecimal utiliza dieciséis dígitos (0-9 y A-F) y es común en programación y computación.
   En Python, los números hexadecimales se representan con el prefijo '0x' o '0X'. """
d = 0x10+6 # suma hexadecimal
print(f"hexadecimal d: {d}")
d = 0xA # resta hexadecimal
print(f"hexadecimal d: {d}")
d = 0x10-6 # resta hexadecimal
print(f"hexadecimal d: {d}")

# Conversión entre sistemas de numeración
""" Python permite convertir entre diferentes sistemas de numeración utilizando la función `int()`.
    Por ejemplo, para convertir un número binario a decimal, se puede usar `int('1010', 2)`. """
e = int('23', 10) # Convertir una cadena a entero en base 10
print(f'e base decimal: {e}')

f = int('10111', 2) # Convertir una cadena binaria a entero
print(f'f base binaria: {f}')

g = int('30', 8) # Convertir una cadena octal a entero
print(f'g base octal: {g}')

""" Para calcular el valor de un número hexadecimal, tenemos que calcular el valor de cada dígito
    multiplicando por 16 elevado a la potencia de su posición (empezando desde 0). """
h = int('A', 16) # Convertir una cadena hexadecimal a entero
print(f'h base hexadecimal: {h}')

# Base 5 sus valores son 0, 1, 2, 3, 4
""" Para convertir un número en base 5 a decimal, se multiplica cada dígito por 5 elevado a la potencia de su posición. Si coloco 346 me va a dar un error porque 6 no es un dígito válido en base 5. """
i = int('34', 5) # Convertir una cadena en base 5 a entero
print(f'i base 5: {i}')

