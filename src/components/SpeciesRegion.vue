<template>
<b-container fluid class="h-100 bg-light overflow-auto" id="specieslist">
  <b-row class="h-100">
    <b-col class="h-100 col-xs-12 md-6 col-lg-6 d-flex flex-column py-2">
       <b-card v-if="region.name">
         <b-card-body>
           <h3>Your checklist for {{ region.name }} ({{nb_species_seen}} / {{ region_list.length }})</h3>
           <b v-if="region.url">More information about the region  : <a :href="region.url" 
                target="_blank">here</a></b>
           <b-table id="species_table"
             hover             
             responsive
             :fields="[
               { key: 'seen', label: 'Seen', sortable: true },
               { key: 'common_name', label: 'Common name', sortable: true },
               { key: 'lifelist', label: 'Life lists'  },
             ]"
             :items="region_list"
             :tbody-tr-class="rowClass"
           >
             <template #cell(seen)="sp">
               <template v-if="sp.item.seen">
                 <b-icon icon="check-square" variant="success" />
               </template>
               <template v-else>
                 <b-icon icon="square" />
               </template>
             </template>
             <template #cell(common_name)="sp">
               <b-link
                 :href="'https://ebird.org/species/' + sp.item.species_code " 
                target="_blank"
              >
                {{ sp.value }}
              </b-link>
            </template>
             <template #cell(lifelist)="sp">
              <b-link v-if="sp.item.seen"
                 :href="'https://ebird.org/lifelist?time=life&spp=' + sp.item.species_code " 
                target="_blank"
              >
                My Lists
              </b-link>
            </template>
          </b-table>
        </b-card-body>
      </b-card>
      <b-card fluid class="h-100 bg-light" v-if="!region.name">
        Please select a region
      </b-card>
    </b-col>
  </b-row>
</b-container>
</template>
<script setup>
import { eventBus } from "../main";
import species_list from "../assets/species_list.json";
</script>

<script>
export default {
  data() {
    return {
      species_list: species_list,
      region_list: [],
      user_species: [],
      nb_species_seen: 0,
    }
  },
  props: ['region'],
  methods: {
    species_list_table() {
        this.region_list = this.species_list
          .filter((s) => s.region.includes(this.region.name));
        this.region_list.map(sp => sp.seen = this.user_species.indexOf(sp.common_name) >= 0);
        this.compute_nb_species_seen();
    },
    compute_nb_species_seen(){
      this.nb_species_seen = this.species_list
            .filter((s) => s.region.includes(this.region.name) & s.seen).length;
    },
    rowClass(item, type) {
      if (item && type === 'row') {
        if (item.seen === true) {
          return 'table-active'
        } else {
          return 'not-checked-species'
        } 
      } else {
        return null
      }
    }
  },
  created: function() {
    eventBus.$on("userdata-changed", (data) => {
      this.user_species = data.species;
      this.species_list_table();
    });
  },
  watch: { 
    region: function(newVal, oldVal) { // watch it
      this.species_list_table();
    }
  }
};


</script>