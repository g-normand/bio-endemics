<template>
<b-container fluid class="h-100 bg-light" >
  <b-row class="h-100">
    <b-col class="h-100 col-xs-12 md-6 col-lg-6 d-flex flex-column py-2">
       <b-card v-if="region.name">
         <b-card-body class="overflow-auto flex-grow-1">
           <h3>Your checklist for {{ region.name }} ({{ species_list_length() }})</h3>
           <b v-if="region.url">More information about the region  : <a :href="region.url" 
                target="_blank">here</a></b>
           <b-table
             hover
             small
             responsive
             :fields="[
               { key: 'seen', label: '', class: 'text-center' },
               { key: 'common_name', label: 'Common name', sortable: true },
             ]"
             :items="species_list_table()"
           >
             <template #cell(seen)="sp">
               <template v-if="sp.value">
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
import species_list from "../assets/species_list.json";
</script>

<script>
export default {
  data() {
    return {
      species_list: species_list,
    }
  },
  props: ['region'],
  methods: {
    species_list_table() {
          return this.species_list
            .filter((s) => s.region.includes(this.region.name));
        },
    species_list_length() {
      return this.species_list
            .filter((s) => s.region.includes(this.region.name)).length;
    }
  }
};


</script>