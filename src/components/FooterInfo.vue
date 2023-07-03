<template>
    <div class="footer">
        <div class="container">
          <div class="row">
            <div class="col-sm count username_col">{{ username }}</div>    
          </div>
            <div class="row">          
                <div class="col-sm count"><img class="icon-bottom" src="../assets/bird-albatross-flying-shape-2.png">
                    <span class="nb_counts">{{ nb_species }} </span>Species observed</div>
                <div class="col-sm count"><img class="icon-bottom" src="../assets/list.png">
                    <span class="nb_counts">{{ nb_checklists }}</span>Checklists</div>
                <div class="col-sm count"><img class="icon-bottom" src="../assets/binoculars-silhouette.png">
                    <span class="nb_counts">{{ nb_obs }}</span>Observations</div>
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
        username: '',
    }
  },
  created: function() {
    eventBus.$on("userdata-changed", (data) => {
      this.nb_species = data.nb_species; 
      this.nb_checklists = data.nb_checklists; 
      this.nb_obs = data.nb_obs; 
      this.username = data.username; 
      eventBus.$off("userdata-changed");
    });
  },
}
</script>