<template>
    TEST
  <b-container fluid class="h-100 bg-light">
    <b-row class="h-100">
      <b-col class="h-100 col-xs-12 md-6 col-lg-4 d-flex flex-column py-2">
        <b-row>
          <b-col class="pb-2">
            <b-card class="w-100 p-2 d-flex flex-row flex-wrap align-items-center" no-body style="gap: 0.5rem">
              <b-img src="logo.svg" height="64px" class="mx-auto" />
              <div class="mx-auto" v-if="true">
                <b-form-radio-group
                  class="bg-light"
                  v-model="modeSelected"
                  :options="modeOptions"
                  button-variant="outline-primary"
                  buttons
                  size="sm"
                />
              </div>
            </b-card>
          </b-col>
        </b-row>
        <b-card>
          <b-card-body class="overflow-auto flex-grow-1">
            <Presentation :region="regions[i_region].region" />
            <h3>Espèces cibles</h3>
            <b-table
              hover
              small
              responsive
              :fields="[
                { key: 'seen', label: '', class: 'text-center' },
                { key: 'common_name', label: 'Nom commun', sortable: true },
                { key: 'prob_region', label: 'Difficulté', sortable: true, class: 'text-center' },
              ]"
              :items="species_list_table"
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
                  :href="'https://ebird.org/species/' + sp.item.species_code + '/' + regions[i_region].ebirdcode"
                  target="_blank"
                >
                  {{ sp.value }}
                </b-link>
                <template v-if="sp.item.exotic.length > 0">
                  <b-img :src="'exotic_' + sp.item.exotic + '.png'" class="h-16" v-b-modal.modal-exotic />
                </template>
                <b-badge
                  v-if="(sp.item.aba >= 3) & (sp.item.aba <= 6)"
                  :class="'ml-2 font-weight-normal bg-aba-' + sp.item.aba"
                  v-b-modal.modal-aba
                >
                  ABA-{{ sp.item.aba }}
                </b-badge>
                <b-link
                  :href="
                    'https://media.ebird.org/catalog?taxonCode=' +
                    sp.item.species_code +
                    '&sort=rating_rank_desc&userId=USER497615'
                  "
                  target="_blank"
                  v-if="sp.item.hasMedia | !sp.item.media_lifer"
                >
                  <b-icon class="ml-1" icon="camera" v-b-tooltip.hover="'Voir nos photos de cette espèces'" />
                </b-link>
              </template>
              <template #cell(prob_region)="sp">
                <b-icon
                  icon="binoculars-fill"
                  v-b-tooltip.hover="'Probabilité d\'observation régionale: ' + sp.value + '%'"
                  :variant="sp.value > 1 ? 'success' : sp.value > 0.5 ? 'warning' : 'danger'"
                />
              </template>
            </b-table>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <Modal />
  </b-container>
</template>
<script setup>
import species_list from "./assets/species_list.json";
</script>

<script>

export default {
  data() {
      species_list: species_list
  }
};

</script>