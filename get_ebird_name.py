print('USAGE : python3 get_ebird_name.py --key EBIRD_API_KEY')

import requests
import argparse

parser = argparse.ArgumentParser("get_ebird_name")
parser.add_argument("--key", help="Ebird API Key.", type=str)
args = parser.parse_args()
ebird_api_key = args.key

list_species = ['Megascops colombianus', 'Trogon comptus', 'Nystactes noanamae', 'Ramphastos brevis', 'Andigena laminirostris', 'Capito squamatus', 'Capito quinticolor', 'Semnornis ramphastinus', 'Piculus litae', 'Veniliornis chocoensis', 'Micrastur plumbeus', 'Pyrilia pulchra', 'Dysithamnus occidentalis', 'Sipia berlepschi', 'Pittasoma rufopileatum', 'Grallaria flavotincta', 'Scytalopus vicinior', 'Thripadectes ignobilis', 'Margarornis stellatus', 'Machaeropterus deliciosus', 'Chloropipo flavicapilla', 'Pipreola jucunda', 'Cephalopterus penduliger', 'Vireo masteri', 'Cyanolyca pulchra', 'Henicorhina negreti', 'Entomodestes coracinus', 'Chlorophonia flavirostris', 'Oreothraupis arremonops', 'Chlorospingus semifuscus', 'Hypopyrrhus pyrohypogaster', 'Habia cristata', 'Iridosornis porphyrocephalus', 'Anisognathus notabilis', 'Chlorochrysa phoenicotis', 'Chlorochrysa nitidissima', 'Bangsia flavovirens', 'Bangsia aureocincta', 'Bangsia edwardsi', 'Bangsia rothschildi', 'Bangsia melanochlamys', 'Tangara johannae', 'Chrysothlypis salmoni', 'Dacnis berlepschi', 'Dacnis hartlaubi', 'Diglossa indigotica', 'Diglossa gloriosissima']

for species_name in list_species:
    resp = requests.get(f'https://api.ebird.org/v2/ref/taxon/find?locale=en&cat=species&limit=150&key={ebird_api_key}&q={species_name}')
    if resp.status_code == 200:
        if len(resp.json()) > 0:
            print(species_name, ',', resp.json()[0]['code'])
        else:
            print(species_name, ', NO RESULT')
    else:
        print('ERROR', resp.status_code, resp.__dict__)