export default class UserData {
    species = [];
    nb_species = '-';
    nb_obs = '-';
    nb_checklists = '-';
 
    constructor(data) 
    {
      if (data != undefined) {
        var checklists = data.reduce( (acc, cur) =>  acc.indexOf(cur['Submission ID'])<0 ? acc.concat(cur['Submission ID']) : acc , [] )
        var species = data.reduce( (acc, cur) =>  acc.indexOf(cur['Common Name'])<0 ? acc.concat(cur['Common Name']) : acc , [] ) 
        this.species = species;
        this.nb_species = this.numberWithCommas(species.length);
        this.nb_obs = this.numberWithCommas(data.length);
        this.nb_checklists = this.numberWithCommas(checklists.length);
     }
    } 

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    }
    
}