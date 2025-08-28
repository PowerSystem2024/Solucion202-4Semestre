import math
from decimal import Decimal

# Manejo de valores infinitos en Python
infinito_positivo = float('inf') # Valor infinito positivo
infinito_negativo = float('-inf') # Valor infinito negativo

print("Infinito positivo:", infinito_positivo)
print(f'Es infinito?: {math.isinf(infinito_positivo)}')
print("Infinito negativo:", infinito_negativo)
print(f'Es infinito?: {math.isinf(infinito_negativo)}')

# Modulo Math para operaciones con infinitos
infinito_positivo = math.inf  # Otra forma de representar infinito positivo
infinito_negativo = -math.inf  # Otra forma de representar infinito negativo

print("Infinito positivo (math):", infinito_positivo)
print(f'Es infinito?: {math.isinf(infinito_positivo)}')
print("Infinito negativo (math):", infinito_negativo)
print(f'Es infinito?: {math.isinf(infinito_negativo)}')

# Modulo decimal para manejar infinitos
infinito_decimal = Decimal('Infinity')  # Representación de infinito en Decimal
infinito_decimal_negativo = Decimal('-Infinity')  # Infinito negativo en Decimal

print("Infinito positivo (Decimal):", infinito_decimal)
print(f'Es infinito?: {math.isinf(infinito_decimal)}')
print("Infinito negativo (Decimal):", infinito_decimal_negativo)
print(f'Es infinito?: {math.isinf(infinito_decimal_negativo)}')


