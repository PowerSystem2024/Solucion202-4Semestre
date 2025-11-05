from utils import utils
import read_csv
import charts
import pandas as pd

def run():
    '''
    data = read_csv.read_csv('data.csv')
    data = list(filter(lambda item: item['Continent'] == 'South America', data))

    countries = list(map(lambda x: x['Country'], data))
    precentages = list(map(lambda x: x['World Population Percentage'], data))
    charts.generate_pie_chart(countries, precentages)
    '''
    data = read_csv.read_csv('data.csv')
    df = pd.read_csv('data.csv')
    df = df[df['Continent'] == 'South America']
    countries = df['Country'].values
    percentages = df['World Population Percentage'].values

    country = input('Type Country => ')
    print(country)

    result = utils.population_by_country(data, country)