<template>
    <div class="footer">
        <div class="container">
            <div class="row">
                <div class="col-sm count"><img class="icon-bottom" src="../assets/bird-albatross-flying-shape-2.png">
                    <span class="nb_counts">{{ nb_species }} </span><br>Species observed</div>
                <div class="col-sm count"><img class="icon-bottom" src="../assets/list.png">
                    <span class="nb_counts">{{ nb_checklists }}</span><br>Checklists</div>
                <div class="col-sm count"><img class="icon-bottom" src="../assets/binoculars-silhouette.png">
                    <span class="nb_counts">{{ nb_obs }}</span><br>Observations</div>
            </div>
        </div>
    </div>
</template>


<script>
import { eventBus } from "../main";

export default {
  data() {
    return {
        nb_species: '-',
        nb_checklists: '-',
        nb_obs : '-',
    }
  },
  created: function() {
    eventBus.$on("userdata-changed", (data) => {
      this.nb_species = data.nb_species; 
      this.nb_checklists = data.nb_checklists; 
      this.nb_obs = data.nb_obs; 
      eventBus.$off("userdata-changed");
    });
  },
}
</script>