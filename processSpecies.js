import csvtojson from "csvtojson";
import fs from "fs";

const sp = await csvtojson.csv().fromFile("data/species_list.csv")


const sp_region = sp.map(s => {
    return {
        common_name: s.common_name,
        species_code: s.species_code,
        scientific_name: s.scientific_name,
        region: s.region
    }
})

await fs.writeFileSync('src/assets/species_list.json', JSON.stringify(sp_region));