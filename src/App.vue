<script setup>
import SpeciesRegion from './components/SpeciesRegion.vue'
import UploadFile from './components/UploadFile.vue'
import FooterInfo from './components/FooterInfo.vue'
import regions from "./assets/regions.json";
import logo from "./assets/logo.svg";
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
        <template #footer>
          <div class="d-flex bg-dark text-light align-items-center px-3 py-2 w-100 justify-content-between">
            Inspired by 
            <a href="https://zoziologie.raphaelnussbaumer.com/see-your-observations/" target="_blank" title="zoziologie.com"
              ><b-img :src="logo" class="zozio"></b-img></a>
          </div>
        </template>
      </b-sidebar>
  </div>

  <SpeciesRegion :region=current_region />
  <FooterInfo />
</template>

<script>
export default {
  data() {
    return {
      logo: logo,
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
