<template>
    <div class="modal fade" id="ModalUpload" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
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
                  <input class="form-control" type="file" id="uploadMyEBirdData" accept=".csv">
                  </div>
              <div class="progress mt-4" id="MyPg" style="display:none;">
                <div id="MyPgBar" class="progress-bar progress-bar-striped progress-bar-animated"
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