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

						 instruction = instruction.replace("Turn left", " Turn left");

					 }

					 if (instruction.indexOf("Turn right") !== -1) {

						 instruction = instruction.replace("Turn right", "Turn right");

					 }
					 if (instruction.indexOf("Keep right") !== -1) {

						 instruction = instruction.replace("Keep right", "Keep right");

					 }
					 if (instruction.indexOf("Keep left") !== -1) {

						 instruction = instruction.replace("Keep left", " Keep left");

					 }
					 if (instruction.indexOf("Continue") !== -1 || instruction.indexOf("Head") !== -1) {

						 instruction = instruction.replace("Continue", "Continue");
						 instruction = instruction.replace("Head", "Head");

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
  
}

    // function that runs when form submitted
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