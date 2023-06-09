// default map layer
    let map = L.map('map', {
        layers: MQ.mapLayer(),
        center: [0, -0],
        zoom: 12
    });
        
// update location
 function updateLocation(lat, lng) {
	 L.marker([lat, lng]).addTo(map);
	 map.setView([lat, lng], 13); // Thay đổi tọa độ trung tâm của bản đồ
 }
 //
 navigator.geolocation.getCurrentPosition((position) => {
	 const {latitude, longitude} = position.coords;
	 L.marker([latitude, longitude]).addTo(map); // Tạo Marker tại vị trí này
	 map.setView([latitude, longitude], 13); // Phóng to bản đồ đến vị trí này
	 // Sử dụng fetch API để cập nhật thông tin vị trí từ địa chỉ IP
	 setInterval(() => {
		 fetch('https://geoip-db.com/json/')
				 .then((response) => response.json())
				 .then((data) => {
					 const {latitude, longitude} = data; // Lấy tọa độ từ kết quả trả về
					 updateLocation(latitude, longitude); // Cập nhật vị trí mới
					 map.setView([latitude, longitude], 13); // Cập nhật vị trí hiển thị trên bản đồ
				 })
				 .catch((error) => {
					 console.error(error);
				 });
	 }, 5000); // Thực hiện cập nhật mỗi 5 giây
 }, (error) => {
	 console.error(error);
	 // Sử dụng fetch API để cập nhật thông tin vị trí từ địa chỉ IP
	 setInterval(() => {
		 fetch('https://geoip-db.com/json/')
				 .then((response) => response.json())
				 .then((data) => {
					 const {latitude, longitude} = data; // Lấy tọa độ từ kết quả trả về
					 updateLocation(latitude, longitude); // Cập nhật vị trí mới
					 map.setView([latitude, longitude], 13); // Cập nhật vị trí hiển thị trên bản đồ
				 })
				 .catch((error) => {
					 console.error(error);
				 });
	 }, 5000); // Thực hiện cập nhật mỗi 5 giây
 });
 //
 function runDirection(start, end) {
	 // create a new map layer
	 map = L.map('map', {
		 layers: MQ.mapLayer({
			 key: 'FPEf1w0pVCwT6lGp6U7S9jLKXtqwunyx'
		 }),
		 center: [10.774450, 106.700232],
		 zoom: 13
	 });

	 // create a directions object
	 const dir = MQ.routing.directions();

	 // set the from and to locations
	 dir.route({
		 locations: [
			 { street: start },
			 { street: end }
		 ]
	 });

	 // create a customized route layer
	 const CustomRouteLayer = MQ.Routing.RouteLayer.extend({
		 createStartMarker: (location) => {
			 var custom_icon = L.icon({
				 iconUrl: 'img/placeholder.png',
				 iconSize: [20, 29],
				 iconAnchor: [10, 29],
				 popupAnchor: [0, -29]
			 });

			 var marker = L.marker(location.latLng, { icon: custom_icon }).addTo(map);

			 return marker;
		 },

		 createEndMarker: (location) => {
			 var custom_icon = L.icon({
				 iconUrl: 'img/placeholder (1).png',
				 iconSize: [20, 29],
				 iconAnchor: [10, 29],
				 popupAnchor: [0, -29]
			 });

			 var marker = L.marker(location.latLng, { icon: custom_icon }).addTo(map);

			 return marker;
		 },

		 createLine: (features, options) => {
			 var line = L.geoJSON(features, {
				 style: {
					 color: '#0096d6',
					 weight: 6
				 }
			 });

			 return line;
		 }
	 });

	 // add the route layer to the map
	 map.addLayer(new CustomRouteLayer({
		 directions: dir,
		 fitBounds: true
	 }));

	 // retrieve the route data from the MapQuest Directions API
	 const url = `https://www.mapquestapi.com/directions/v2/route?key=FPEf1w0pVCwT6lGp6U7S9jLKXtqwunyx&from=${start}&to=${end}`;

	 fetch(url)
			 .then(response => {
				 if (response.status==400) {
					 throw new Error(`Failed to retrieve route data `);
				 }
				 return response.json();
			 })
			 .then(data => {
				 // get the maneuver data for the route
				 const maneuvers = data.route.legs[0].maneuvers;

				 // create an array of instructions for the route
				 const instructions = maneuvers.map(maneuver => maneuver.narrative);
				 const direction = maneuvers.map(maneuver => maneuver.direction);
				 // display the instructions on the page
				 const instructionsContainer = document.getElementById('error-message');
				 instructions.forEach(instruction => {
					 const li = document.createElement('li');
					  li.classList.add('item');

					 if (instruction.indexOf("Turn left") !== -1) {

						 instruction = instruction.replace("Turn left", "<div><img class='img_icon_instruction' src='img/arrow_back_left_icon.png'> Turn left</div>");

					 }

					 if (instruction.indexOf("Turn right") !== -1) {

						 instruction = instruction.replace("Turn right", "<div><img class='img_icon_instruction' src='img/turn-right.png'> Turn right</div>");

					 }
					 if (instruction.indexOf("Keep right") !== -1) {

						 instruction = instruction.replace("Keep right", "<div><img class='img_icon_instruction' src='img/top-right.png'> Keep right</div>");

					 }
					 if (instruction.indexOf("Keep left") !== -1) {

						 instruction = instruction.replace("Keep left", "<div><img class='img_icon_instruction' src='img/340481594_885769662488655_4930446522493437372_n.jpg'> Keep left</div>");

					 }
					 if (instruction.indexOf("Continue") !== -1 || instruction.indexOf("Head") !== -1) {

						 instruction = instruction.replace("Continue", "<div><img class='img_icon_instruction' src='img/up-arrow.png'> Continue</div>");
						 instruction = instruction.replace("Head", "<div><img class='img_icon_instruction' src='img/up-arrow.png'> Head</div>");

					 }
					 li.innerHTML = instruction;
					 instructionsContainer.appendChild(li);

				 });
			 })
			 .catch(error => {
				 console.error(error);
				 alert('There was an error retrieving the route data. Please try again later.');
			 });
 }
 
 // Xóa tuyến đường đang tìm
 function showAlert() {
  alert("Remove Success!");
  map.remove();
  map = L.map('map', {
      layers: MQ.mapLayer({
        key: 'LkmLDVGn5JTwPZ3jy9CQMz5XSDmHX7h8'
      }),
      center: [10.774450, 106.700232],
      zoom: 12
    });
    const elements = document.querySelectorAll('.li_derec');
    elements.forEach(element => element.remove());
  	const remove = document.getElementById('myDetails');
	 remove.remove();
	 location.reload();
	 map.reset();


}


    function submitForm(event) {
        event.preventDefault();

        // delete current map layer
        map.remove();

        // getting form data
        start = document.getElementById("start").value;
        end = document.getElementById("destination").value;

        // run directions function
        runDirection(start, end);

        // reset form
        document.getElementById("form").reset();
    }

    // asign the form to form variable
    const form = document.getElementById('form');

    // call the submitForm() function when submitting the form
    form.addEventListener('submit', submitForm);
const input = document.getElementById("searchInput");



var apiResults;

fetch("http://localhost:8080/getSearch")
	.then(response => response.json())
	.then(data => {
		apiResults = data;
		doSomethingWithApiResults();
		doAddSearch();
	})
	.catch(error => {
		console.error(error);
	});
var availableTags = [];
function doSomethingWithApiResults() {


	for (var i = 0; i < apiResults.length; i++) {
		availableTags.push(apiResults[i].name);
	}

	var results = document.querySelector(".autocomplete-results");
	function showResults(resultsList) {
		results.innerHTML = "";
		if (resultsList.length > 0) {
			results.style.display = "block";
			for (var i = 0; i < resultsList.length; i++) {
				var li = document.createElement("li");
				li.innerText = resultsList[i];
				var deleteIcon = document.createElement("button");
				deleteIcon.classList.add("delete-icon");
				deleteIcon.innerHTML = "&#10005;";
				li.append(deleteIcon);
				results.append(li);
				deleteIcon.addEventListener("click", function() {
					var index = Array.prototype.indexOf.call(this.parentNode.parentNode.children, this.parentNode);
					availableTags.splice(index, 1);
					localStorage.setItem('autocompleteData', JSON.stringify(availableTags));
					this.parentNode.remove();
				});
				results.addEventListener('click', function(event) {
  var li = event.target.closest('li'); // tìm phần tử li chứa từ khóa được chọn
  var deleteBtn = event.target.closest('.delete-icon'); // kiểm tra xem đối tượng được click có phải là nút X hay không
  if (li && !deleteBtn) { // nếu tìm thấy phần tử li và không phải là nút X
    var selectedText = li.childNodes[0].nodeValue.trim(); // lấy giá trị của phần tử li và loại bỏ khoảng trắng thừa
    input.value = selectedText;
    results.style.display = 'none';
  } else if (deleteBtn) { // nếu đối tượng được click là nút X thì xóa từ khóa và trả về trạng thái ban đầu của ô input
    input.value = '';
  }
});
			}
		} else {
			results.style.display = "none";
		}
	}

	input.addEventListener("input", function() {
		var query = input.value;
		var resultsList = [];
		for (var i = 0; i < availableTags.length; i++) {
			if (availableTags[i].toLowerCase().indexOf(query.toLowerCase()) > -1) {
				resultsList.push(availableTags[i]);
			}
		}
		showResults(resultsList);
	});
	
	document.addEventListener("click", function(event) {
		if (!event.target.matches("#searchInput") && !event.target.matches(".delete-icon")) {			
			results.style.display = "none";
		}
	});
	
	results.addEventListener("click", function(event) {
		var selectedText = event.target.innerText;
		input.value = selectedText;
		results.style.display = "none";
	});
	
}
function doAddSearch() {
	var newTag = input.value.trim();
	if (newTag && !availableTags.includes(newTag)) {
		availableTags.push(newTag);
		localStorage.setItem('autocompleteData', JSON.stringify(availableTags));
		input.value = "";
	}

}

function searchLocation() {
	const searchInput = input.value;
	const apiKey = "LkmLDVGn5JTwPZ3jy9CQMz5XSDmHX7h8";
	const url = `https://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${encodeURIComponent(searchInput)}`;

	fetch(url)
		.then(response => response.json())
		.then(data => {

			const location = data.results[0].locations[0];
			const address = location.street || "";
			const city = location.adminArea5 || "";
			const state = location.adminArea3 || "";
			const country = location.adminArea1 || "";
			const latLng = location.latLng;
			const result = `Địa chỉ: ${address}\nThành phố: ${city}\nTỉnh/Thành: ${state}\nQuốc gia: ${country} ${latLng.lat} ${latLng.lng}`;

			/*alert(result);*/


			map.remove();
			map = L.map('map', {
				layers: MQ.mapLayer({
					key: 'LkmLDVGn5JTwPZ3jy9CQMz5XSDmHX7h8'
				}),
				center: latLng,
				zoom: 12
			});




			L.marker(latLng).addTo(map);
			doAddSearch();
		})
		.catch(error => {
			console.error(error);
			alert("Đã xảy ra lỗi khi tìm kiếm địa danh. Vui lòng thử lại sau.");
		});
}
