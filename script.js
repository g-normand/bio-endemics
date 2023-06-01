var loc

jQuery(document).ready(function() {
	jQuery('#ModalUpload').modal("toggle") //open modal as entrance page.
	
	jQuery("#uploadMyEBirdData").change(function(evt) {
	    processFile( evt.target.files[0], evt.target.files[0].size )
	});
	
	// Open my data if me in url
	if ( window.location.search.substring(1).indexOf('me') !== -1 ){
		jQuery.get("/assets/MyEBirdData.csv", function(data){
			processFile(data, data.length) 
		})
	}
})



function processFile( file, size ){
	var percent = 0;
	var progress = 0;
	const data = [];
	jQuery('#MyPg').show()
	jQuery('#loadingtitle').html('Reading the file...')
	var pgbar = document.getElementById("MyPgBar");
	Papa.parse(file, {
		header:true,
		step: function(row,handler) {
			if ( row.data[0]['Common Name'] != undefined  && row.data[0]['Common Name'].indexOf('hybrid')<0 && row.data[0]['Common Name'].indexOf('/')<0 && row.data[0]['Common Name'].indexOf('sp.')<0 ){
				row.data[0]['Common Name'] = row.data[0]['Common Name'].replace(/ *\([^)]*\) */g, "");
				data.push(row.data[0]);
			} else{
				//console.log(row.data[0]['Common Name'])
			}
			progress = progress + Object.values(row.data[0]).join(',').length;

			var newPercent = Math.round(progress / size * 100);
			if (newPercent === percent) return;
			percent = newPercent;
			handler.pause();

			pgbar.style.width = percent + '%'; 
			//pgbar.innerHTML = percent * 1  + '%';
			setTimeout(function(){handler.resume()},0)
		},
		complete: function() {
			//data = results.data;
			//fields = results.meta.fields;

			var checklists = data.reduce( (acc, cur) =>  acc.indexOf(cur['Submission ID'])<0 ? acc.concat(cur['Submission ID']) : acc , [] )
			var species = data.reduce( (acc, cur) =>  acc.indexOf(cur['Common Name'])<0 ? acc.concat(cur['Common Name']) : acc , [] )
			jQuery('#spCount').html(numberWithCommas(species.length))
			jQuery('#obsCount').html(numberWithCommas(data.length))
			jQuery('#chCount').html(numberWithCommas(checklists.length))
			jQuery('#count-sp').attr('data-content', species.join(', '))
			jQuery('#count-ch').attr('data-content', checklists.map( id => '<a href="https://ebird.org/view/checklist/'+id+'" target="_blank">'+id+'</a>' ).join(", "))

			jQuery('#ModalUpload').modal("hide");
			setTimeout(function(){
				loc_all = data.map(function(d_tmp){
					d={};
					d.Location = d_tmp.Location;
					d.Latitude = d_tmp.Latitude;
					d.Longitude = d_tmp.Longitude;
					d.region = d_tmp['State/Province'];
					return d
				})

				loc = loc_all.filter((loc_tmp, index, self) => self.findIndex(d => d.Location === loc_tmp.Location && (typeof d.Location != 'undefined') ) === index)
				
				loc = loc.map(function(loc_tmp){
					d_loc = data.filter(d => d.Location==loc_tmp.Location);
					loc_tmp.countObs = d_loc.length;
					loc_tmp.Spe = d_loc.reduce( (acc, cur) =>  acc.indexOf(cur['Common Name'])<0 ? acc.concat(cur['Common Name']) : acc , [] )
					loc_tmp.List = d_loc.reduce( (acc, cur) =>  acc.indexOf(cur['Submission ID'])<0 ? acc.concat(cur['Submission ID']) : acc , [] )
					loc_tmp.countSpe = loc_tmp.Spe.length;
					loc_tmp.countList = loc_tmp.List.length;
					return loc_tmp
				})


				jQuery('[data-toggle="popover"]').popover()
			},0)
},
});
}


const numberWithCommas = (x) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

footerfill = function(e, l){
	if (e.target.hotspot == undefined){
		var latLng = e.target.getLatLng();
		jQuery.get('https://ebird.org/ws2.0/ref/hotspot/geo?lng='+latLng.lng+'&lat='+latLng.lat+'&dist=1&fmt=json&key='+token.ebird ,function(dd){
			e.target.hotspot='';
			if (dd.length>0){
				ddd = dd.filter( val => val.locName == e.target.location );
				if (ddd.length>0) {
					e.target.hotspot = ddd[0].locId;
				}
			}

			if (e.target.hotspot.length>0){
				//var txt ='<a href="https://ebird.org/hotspot/'+e.target.hotspot+'" target="_blank"><img class="img-hotspot" title="eBird hotspot page" src="https://zoziologie.raphaelnussbaumer.com/assets/SeeYourObservations/images/hotspot-icon-hotspot.png"></a>';
				var txt ='<a href="https://ebird.org/hotspot/'+e.target.hotspot+'" target="_blank" id="stattitle-name">'+l.Location.toUpperCase()+'</a>';
				txt += '<a href="https://ebird.org/targets?&r1='+e.target.hotspot+'" target="_blank" title="Your target list" class="stattitle-link"><i class="far fa-lg fa-dot-circle img-hotspot"></i> Target</a>'
				txt += '<a href="https://ebird.org/MyEBird?cmd=list&r='+e.target.hotspot+'" target="_blank" title="Your exact list" class="stattitle-link"><i class="fas fa-lg fa-list img-hotspot"></i> List</a>'
				jQuery('#stattitle').html(txt)
			}

		})
	} else {
		jQuery('#stattitle').html('<span id="stattitle-name">'+l.Location.toUpperCase()+'</span>')	
	}

	jQuery('#spCount').html(numberWithCommas(l.countSpe))
	jQuery('#chCount').html(numberWithCommas(l.countList))
	jQuery('#obsCount').html(numberWithCommas(l.countObs))

	jQuery('#count-sp').attr('data-content', l.Spe.join(', '))
	jQuery('#count-ch').attr('data-content', l.List.map( id => '<a href="https://ebird.org/view/checklist/'+id+'" target="_blank">'+id+'</a>' ).join(", "))
}