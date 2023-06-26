<script setup>
import SpeciesRegion from './components/SpeciesRegion.vue'
import UploadFile from './components/UploadFile.vue'
import FooterInfo from './components/FooterInfo.vue'
import regions from "./assets/regions.json";
</script>

<template>
  <UploadFile />
  <div>
    <b-button squared v-b-toggle.collapse-regions class="regions-button">See regions</b-button>
    <b-collapse id="collapse-regions" class="mt-2">
      <b-card>
        <b-button-group class="w-100 text-light" id="region-group">
          <b-button
            squared
            v-for="(r, i) in regions"
            :key="r.region"
            class="regions-button"
          @click="changeRegion(r)">
            <b-icon icon="binoculars" />
            {{ r.name }}
          </b-button>
        </b-button-group>
      </b-card>
    </b-collapse>
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
      if (window.innerHeight < 760){
        this.$root.$emit('bv::toggle::collapse', 'collapse-regions')
      }
    }
  }
}


</script>