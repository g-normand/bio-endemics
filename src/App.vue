<script setup>
import SpeciesRegion from './components/SpeciesRegion.vue'
import UploadFile from './components/UploadFile.vue'
import FooterInfo from './components/FooterInfo.vue'
import regions from "./assets/regions.json";
</script>

<template>
  <UploadFile />
  <div>

    <b-button squared v-b-toggle.sidebar-regions class="regions-button">See regions</b-button>
      <b-sidebar title="Regions" shadow id="sidebar-regions" class="mt-2">
          <b-overlay rounded="sm">
            <div class="px-3 py-2" id="region-group">
            <b-button
              squared
              v-for="(r, i) in regions"
              :key="r.region"
              class="regions-button"
              @click="changeRegion(r)">
              <b-icon icon="binoculars" />
              {{ r.name }}
            </b-button>
          </div>
        </b-overlay>
      </b-sidebar>
  </div>

  <SpeciesRegion :region=current_region />
  <FooterInfo />
</template>

<script>
export default {
  data() {
    return {
      regions: regions,
      current_region: "Ecuador endemics",
    }
  },
  methods: {
    changeRegion(r) {
      this.current_region = r;
      if (window.innerWidth < 760){
        this.$root.$emit('bv::toggle::collapse', 'sidebar-regions')
      }
    }
  },
  mounted: function () {   
    if (window.innerWidth > 760){
      this.$root.$emit('bv::toggle::collapse', 'sidebar-regions')
    }
  },
}


</script>
