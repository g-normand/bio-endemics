# bio endemics

Which bio endemic birds have you seen? 

Inspired by <a href="https://github.com/Zoziologie">Zoziologie</a> web apps :)

# Installation

```
git clone git@github.com:g-normand/bio-endemics.git
cd bio-endemics
npm install

FOR DEV:
npm run dev

FOR PROD:
npm run build
sed -i 's/\/assets/assets/g' dist/index.html
scp -r dist/* guiguide@ssh-guiguide.alwaysdata.net:/home/guiguide/www/bio_endemics/
```

To add regions:
```
Add region in regions.json

Add species in species_list.csv
npm run processSpecies
```
