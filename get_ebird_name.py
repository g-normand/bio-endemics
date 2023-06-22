print('USAGE : python3 get_ebird_name.py --key EBIRD_API_KEY')

import requests
import argparse

parser = argparse.ArgumentParser("get_ebird_name")
parser.add_argument("--key", help="Ebird API Key.", type=str)
args = parser.parse_args()
ebird_api_key = args.key

list_species = ['Pyrrhura orcesi', 'Eriocnemis nigrivestis', 'Metallura baroni', 'Chaetocercus berlepschi', 'Scytalopus robinsonii', 'Atlapetes pallidiceps', 'Oreotrochilus cyanolaemus', 'Metallura baroni', 'Metallura odomae', 'Eriocnemis nigrivestis', 'Daptrius carunculatus', 'Bolborhynchus ferrugineifrons', 'Cinclodes excelsior', 'Asthenes griseomurina', 'Doliornis remseni', 'Tephrophilus wetmorei', 'Urothraupis stolzmanni', 'Oxypogon guerinii', 'Penelope barbata', 'Heliangelus viola', 'Coeligena iris', 'Hapalopsittaca pyrrhops', 'Grallaria gigantea', 'Grallaricula lineifrons', 'Nephelomyias lintoni', 'Atlapetes leucopis', 'Zenaida galapagoensis', 'Laterallus spilonota', 'Buteo galapagoensis', 'Myiarchus magnirostris', 'Mimus trifasciatus', 'Mimus parvulus', 'Mimus macdonaldi', 'Mimus melanotis', 'Certhidea olivacea', 'Platyspiza crassirostris', 'Camarhynchus psittacula', 'Camarhynchus pauper', 'Camarhynchus parvulus', 'Camarhynchus heliobates', 'Camarhynchus pallidus', 'Geospiza fuliginosa', 'Geospiza fortis', 'Geospiza magnirostris', 'Geospiza scandens', 'Geospiza difficilis', 'Geospiza conirostris', 'Spheniscus mendiculus', 'Leucophaeus fuliginosus', 'Pterodroma phaeopygia', 'Pyrocephalus nanus', 'Geospiza acutirostris', 'Geospiza propinqua', 'Geospiza septentrionalis', 'Talaphorus chlorocercus', 'Nonnula brunnea', 'Thamnophilus praecox', 'Pithys castaneus', 'Myrmoborus melanurus', 'Grallaria dignissima', 'Heterocercus aurantiivertex', 'Poecilotriccus calopterus', 'Myiophobus cryptoxanthus', 'Polioptila clementsi', 'Cacicus sclateri']

for species_name in list_species:
    resp = requests.get(f'https://api.ebird.org/v2/ref/taxon/find?locale=en&cat=species&limit=150&key={ebird_api_key}&q={species_name}')
    if resp.status_code == 200:
        if len(resp.json()) > 0:
            print(species_name, ',', resp.json()[0]['code'], ',', resp.json()[0]['name'].split(' - ')[0])
        else:
            print(species_name, ', NO RESULT')
    else:
        print('ERROR', resp.status_code, resp.__dict__)