<template>
<b-container fluid class="h-100 bg-light" >
  <b-row class="h-100">
    <b-col class="h-100 col-xs-12 md-6 col-lg-6 d-flex flex-column py-2">
       <b-card v-if="region.name">
         <b-card-body class="overflow-auto flex-grow-1">
           <h3>Your checklist for {{ region.name }} ({{nb_species_seen()}} / {{ species_list_table().length }})</h3>
           <b v-if="region.url">More information about the region  : <a :href="region.url" 
                target="_blank">here</a></b>
           <b-table
             hover             
             responsive
             :fields="[
               { key: 'seen', label: 'Seen', sortable: true },
               { key: 'common_name', label: 'Common name', sortable: true },
               { key: 'lifelist', label: 'Life lists', sortable: true  },
             ]"
             :items="species_list_table()"
             :tbody-tr-class="rowClass"
           >
             <template #cell(seen)="sp">
               <template v-if="species_was_seen(sp)">
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
              <b-link v-if="species_was_seen(sp)"
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
import { BIcon, BIconSquare } from 'bootstrap-vue';
</script>

<script>
export default {
  data() {
    return {
      species_list: species_list,
      user_species: [],
    }
  },
  props: ['region'],
  methods: {
    species_list_table() {
          return this.species_list
            .filter((s) => s.region.includes(this.region.name));
        },
    species_was_seen(sp) {
      if(sp.item.seen === undefined){
        sp.item.seen = this.user_species.indexOf(sp.item.common_name) >= 0;
      }
      return sp.item.seen;
    },
    nb_species_seen(){
      return this.species_list
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
    });
  },
};


</script>