<script setup>
import SpeciesRegion from './components/SpeciesRegion.vue'
import UploadFile from './components/UploadFile.vue'
import FooterInfo from './components/FooterInfo.vue'
import regions from "./assets/regions.json";
import logo_guiguide from "./assets/logo_guiguide.png";
import logo_zoziologie from "./assets/logo_zoziologie.svg";
</script>

<template>
  <UploadFile />
  <div>

    <b-button squared v-b-toggle.sidebar-regions class="regions-button" v-show="show_regions_button">See regions</b-button>
      <b-sidebar title="Regions" shadow id="sidebar-regions" class="mt-2">
          <b-overlay rounded="sm">
            <div class="py-2" id="region-group">
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
            Made with <b-icon icon="heart" /> by
            <a href="https://guiguide.alwaysdata.net/" target="_blank" title="guiguide.alwaysdata.net"
              ><b-img :src="logo_guiguide" class="zozio"></b-img>
            Guillaume Normand</a>
          </div>
          <div class="d-flex bg-dark text-light align-items-center px-3 py-2 w-100 justify-content-between">
            Inspired by 
            <a href="https://zoziologie.raphaelnussbaumer.com/see-your-observations/" target="_blank" title="zoziologie.com"
              ><b-img :src="logo_zoziologie" class="zozio"></b-img></a>
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
      logo_zoziologie: logo_zoziologie,
      logo_guiguide: logo_guiguide,
      regions: regions,
      current_region: "Ecuador endemics",
      show_regions_button: false,
    }
  },
  methods: {
    changeRegion(r) {
      this.current_region = r;
      if (window.innerWidth < 760){
        this.$root.$emit('bv::toggle::collapse', 'sidebar-regions');
        this.show_regions_button = true;
      }
    }
  },
  mounted: function () {   
    if (window.innerWidth > 760){
      this.$root.$emit('bv::toggle::collapse', 'sidebar-regions')
    }
    else{
      this.show_regions_button = true;
    }
  },
}


</script>
