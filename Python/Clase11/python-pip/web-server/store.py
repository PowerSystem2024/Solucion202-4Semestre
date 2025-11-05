import requests

def get_razas():
    r = requests.get('https://dog.ceo/api/breeds/list/all')
    print(r.status_code)
    #print(r.text)
    #print(type(r.text)) # Vamos a ver qué tipo de dato es
    # En este caso es: un string por .text, pero encontramos un diccionario con listas adentro

    razas = r.json() # Con este método convertimos el string a un diccionario
    for raza in razas.values(): # Utilizamos la funcion para ver los valores del diccionario
        print(f"Raza de los perros: {raza}") # Estamos imprimiendo las razas de los perros