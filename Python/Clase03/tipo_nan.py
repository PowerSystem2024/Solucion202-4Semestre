import math
from decimal import Decimal

# NaN (Not a Number)
a = float('nan')
print(f'a: {a}') # Imprime: a: nan

b = float('0.2')
print(f'b: {b}') # Imprime: b: 0.2

# Modulo Math
c = float('nan')
e = float('2.0')
print(f'Es de tipo NaN(Not a Number)?: {math.isnan(c)}') # Imprime: Es de tipo NaN(Not a Number)?: True
print(f'Es de tipo NaN(Not a Number)?: {math.isnan(e)}') # Imprime: Es de tipo NaN(Not a Number)?: False

d = math.nan
print(f'd: {d}') # Imprime: c: nan

# Modulo decimal
f = Decimal('NaN')
g = Decimal('2.0')
print(f'Es de tipo NaN(Not a Number)?: {f.is_nan()}') # Imprime: Es de tipo NaN(Not a Number)?: True
print(f'Es de tipo NaN(Not a Number)?: {g.is_nan()}') # Imprime: Es de tipo NaN(Not a Number)?: False
