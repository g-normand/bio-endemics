<template>
  <b-modal id="modal-upload" title="Which bio endemic birds have you seen?" title-class="modal-title" size="lg" hide-footer hide-header-close no-close-on-backdrop>
    <h3>How does it work?</h3>
    <div class="row">
      <div class="col-6">
        <h4>1. Download your data from eBird</h4>
          <a role="button" class="btn btn-secondary mt-3 d-block mx-auto" href="https://ebird.org/downloadMyData"
            target="_blank" id="dnwlo-btn">ebird.org/downloadMyData</a>
      </div>
      <div class="col-6">
        <h4>2. Upload your eBird File</h4>
        <p>Import your <code>MyEBirdData.csv</code> (or the ebird zip) using the upload file below. Note that the
          file is never sent to our server, only used in your browser.</p>
            <div class="mb-3">
            <input class="form-control" type="file" id="uploadMyEBirdData" @change="uploadFile" accept=".csv, .zip" >
        </div>
        <div class="progress mt-4" id="MyPg" v-show="showMyPg">
          <div ref="pgbar" id="MyPgBar" class="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>



<script>
import axios from 'axios';
import JSZip from 'jszip';
import { eventBus } from "../main";
import UserData from "./userdata.js"

export default {
  data() {
    return {
	    showMyPg: false,
      userData : new UserData(),
      pgbar_width: '0%',
    }
  },
  methods: {
    uploadFile(event) {
        let file = event.target.files[0];
        if (file.type == 'application/zip') {
          const jszip = new JSZip()
          jszip.loadAsync(file).then((zip) => {
            Object.values(zip.files)[0].async('text').then(csvData => {
                const fileType = { type: 'text/csv' };
                const blob = new Blob([csvData], fileType);
                const csvFile = new File([blob], 'temp_ebird.csv', {
                  type: fileType.type,
                  lastModified: Date.now()
                });
                this.processFile( csvFile, csvFile.size );    
            })
          })
        }
        else if (file.type == 'text/csv') {
          this.processFile( file, file.size );
        }
        else {
          alert('File is not a CSV');
        }
      },
    processFile( file, size ){
      var percent = 0;
      var progress = 0;
      const data = [];
	    this.showMyPg = true;
      const pgbar = this.$refs.pgbar;
      
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
          setTimeout(function(){handler.resume()},0)
        },
        complete: () => {
          this.userData = new UserData(data);
          eventBus.$emit("userdata-changed", this.userData);
	        this.showMyPg = false;
          this.$bvModal.hide('modal-upload');
        },
    });
    },

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
    else{
      this.$bvModal.show('modal-upload');
    }

  },
};


</script>