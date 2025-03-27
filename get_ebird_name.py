print('USAGE : python3 get_ebird_name.py --key EBIRD_API_KEY')

import requests
import argparse

parser = argparse.ArgumentParser("get_ebird_name")
parser.add_argument("--key", help="Ebird API Key.", type=str)
args = parser.parse_args()
ebird_api_key = args.key

with open("scientific_names.txt") as fp:
    lines = fp.readlines()
    for species_name in lines:
        name = species_name.strip()
        resp = requests.get(f'https://api.ebird.org/v2/ref/taxon/find?locale=en&cat=species&limit=150&key={ebird_api_key}&q={name}')
        if resp.status_code == 200:
            if len(resp.json()) > 0:
                print(f"{name}, https://ebird.org/species/{resp.json()[0]['code']}, {resp.json()[0]['name'].split(' - ')[0]}")
            else:
                print(name, ', NO RESULT')
        else:
            print('ERROR', resp.status_code, resp.__dict__)
