<template>
    <div id="ModalUpload" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true" v-show="isModalVisible">
    <div class="modal-lg modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">Which bio endemic birds have you seen? </h2>
        </div>
        <div class="modal-body">
          <h3>How does it work?</h3>
          <div class="row">
            <div class="col-6">
              <h4>1. Download your data from eBird</h4>
                <a role="button" class="btn btn-secondary mt-3 d-block mx-auto" href="https://ebird.org/downloadMyData"
                  target="_blank" id="dnwlo-btn">ebird.org/downloadMyData</a>
            </div>
            <div class="col-6">
              <h4>2. Upload your eBird File</h4>
              <p>Import your <code>MyEBirdData.csv</code> using the upload file below. Note that the
                file is never sent to our server, only used in your browser.</p>
                  <div class="mb-3">
                  <input class="form-control" type="file" id="uploadMyEBirdData" @change="uploadFile" accept=".csv" >
                  </div>
              <div class="progress mt-4" id="MyPg" v-show="showMyPg">
                <div ref="pgbar" id="MyPgBar" class="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>



<script>
import axios from 'axios';
import { eventBus } from "../main";

export default {
  data() {
    return {
      isModalVisible: true,
	    showMyPg: false,
      userData : {},
      pgbar_width: '0%',
    }
  },
  methods: {
    uploadFile(event) {
        let file = event.target.files[0];
        this.processFile( file, file.size );
      },
    processFile( file, size ){
      var percent = 0;
      var progress = 0;
      const data = [];
	    this.showMyPg = true;
      const pgbar = this.$refs.pgbar;
      console.log(pgbar)
      
      this.$papa.parse(file, {
        header:true,
        step: function(row,handler) {
          if ( row.data['Common Name'] != undefined  && row.data['Common Name'].indexOf('hybrid')<0 && row.data['Common Name'].indexOf('/')<0 && row.data['Common Name'].indexOf('sp.')<0 ){
            row.data['Common Name'] = row.data['Common Name'].replace(/ *\([^)]*\) */g, "");
            data.push(row.data);
          }
          progress = progress + Object.values(row.data).join(',').length;

          var newPercent = Math.round(progress / size * 100);
          if (newPercent === percent) return;
          percent = newPercent;
          handler.pause();

          pgbar.style.width = percent + '%'; 
          console.log(percent);
          setTimeout(function(){handler.resume()},0)
        },
        complete: () => {
          var checklists = data.reduce( (acc, cur) =>  acc.indexOf(cur['Submission ID'])<0 ? acc.concat(cur['Submission ID']) : acc , [] )
          var species = data.reduce( (acc, cur) =>  acc.indexOf(cur['Common Name'])<0 ? acc.concat(cur['Common Name']) : acc , [] )
          this.userData['species'] = species;
          this.userData['nb_species'] = this.numberWithCommas(species.length);
          this.userData['nb_obs'] = this.numberWithCommas(data.length);
          this.userData['nb_checklists'] = this.numberWithCommas(checklists.length);
          eventBus.$emit("userdata-changed", this.userData);
          this.isModalVisible = false;
	        this.showMyPg = false;
    },
    });
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    }
  },
  mounted: function () {   
    if ( window.location.search.substring(1).indexOf('me') !== -1 ){
      axios.get("/data/MyEBirdData.csv").then(response => {
          const fileContent = response.data;
          this.processFile(fileContent, fileContent.length) 
        })
        .catch(error => {
          console.error(error);
        });      
    }
  },
};


</script>