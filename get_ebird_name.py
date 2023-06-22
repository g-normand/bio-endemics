print('USAGE : python3 get_ebird_name.py --key EBIRD_API_KEY')

import requests
import argparse

parser = argparse.ArgumentParser("get_ebird_name")
parser.add_argument("--key", help="Ebird API Key.", type=str)
args = parser.parse_args()
ebird_api_key = args.key

list_species = ['Heliangelus regalis', 'Xenoglaux loweryi', 'Herpsilochmus parkeri', 'Grallaricula ochraceifrons', 'Hemitriccus cinnamomeipectus', 'Henicorhina leucoptera', 'Wetmorethraupis sterrhopteron']

for species_name in list_species:
    resp = requests.get(f'https://api.ebird.org/v2/ref/taxon/find?locale=en&cat=species&limit=150&key={ebird_api_key}&q={species_name}')
    if resp.status_code == 200:
        if len(resp.json()) > 0:
            print(species_name, ',', resp.json()[0]['code'], ',', resp.json()[0]['name'].split(' - ')[0])
        else:
            print(species_name, ', NO RESULT')
    else:
        print('ERROR', resp.status_code, resp.__dict__)