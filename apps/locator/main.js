var app = new Vue({
    el: "main",
    data: {
        page: "map",
        position: {
            lat: 0,
            lng: 0,
        },
        markers: []
    },
    mounted() {
        if (this.page === "map") {
            this.initMap();
        }
    },
    methods: {
        initMap() {
            let map = L.map('map').setView([0, 0], 16);
    
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);
            
            let userMarker = L.marker([0, 0], {
                icon: L.icon({
                    iconUrl: 'images/position.png',
                    iconSize: [32, 32],
                    iconAnchor: [16, 16],
                    popupAnchor: [0, -32]
                })
            }).addTo(map);

            //userMarker.setRotationAngle(20);

            function updatePosition(position) {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                userMarker.setLatLng([lat, lon]);
                map.setView([lat, lon]);
            }

            function updateCompass(event) {
                let alpha = event.alpha; // Compass direction in degrees
                userMarker.setRotationAngle(alpha);
            }

            if ("geolocation" in navigator) {
                navigator.geolocation.watchPosition(updatePosition, console.error, {
                    enableHighAccuracy: true
                });
            } else {
                console.error("Geolocation is not supported.");
            }

            if (window.DeviceOrientationEvent) {
                window.addEventListener("deviceorientation", updateCompass);
            } else {
                console.error("Compass is not supported.");
            }
        }
    }
});

// if ("geolocation" in navigator) {
//     navigator.geolocation.getCurrentPosition(
//         (position) => {
//             app.position.lat = position.coords.latitude;
//             app.position.lng = position.coords.longitude;
//         },
//         (error) => {
//             console.error("Error getting location:", error.message);
//         }
//     );
// } else {
//     console.error("Geolocation is not supported by this browser.");
// }