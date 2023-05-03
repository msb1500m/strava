
const auth_link = "https://www.strava.com/oauth/token"

//get the actitivy thought dynamic access from reAuthorize instead of hardcoding

function getActivities(res) {

    var map = L.map('map').setView([45.508, -73.6], 11.5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    //loop through all activities - 10 pages.

    for (let pagenumber = 1; pagenumber < 11; pagenumber++) {
    
    const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}&per_page=200&page=${pagenumber}`
    fetch(activities_link)
        .then((res) => res.json()) //callback 
        .then(function (data){
        
        for(var x = 0; x<data.length; x++){
            if ( data[x].type == "Run") {

            console.log(data[x].map.summary_polyline) //get polyline data
            var coordinates = L.Polyline.fromEncoded(data[x].map.summary_polyline).getLatLngs()
            console.log(coordinates)

            L.polyline(

                coordinates,
                
                {
                    color: "red",
                    weight:4,
                    opacity:.3,
                    lineJoin:'round'

                }
            ).addTo(map)
            }
        }

        }
        
        )
}

//add markers to my favourite running spots in montreal

var marker0 = L.marker([45.500440, -73.589150]).bindPopup("<b>Mont Royal</b><br>Large park with 12.5km main gravel path as well as singletrack trails.").addTo(map); //mtn
var marker1 = L.marker([45.466112, -73.607016]).bindPopup("<b>Falaise St-Jacques</b><br>4km soft gravel path, opened in 2021.").addTo(map); //falaise
var marker2 = L.marker([45.471798, -73.580542]).bindPopup("<b>Canal Lachine</b><br>14.5km flat bike path with dirt and gravel sections.").addTo(map); //canal
var marker3 = L.marker([45.560443, -73.632484]).bindPopup("<b>Parc Frederic Back</b><br>5.5km gravel loop with slight hills.").addTo(map); //fred back

}

function reAuthorize(){
    fetch(auth_link,{
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({

            client_id: '106656',
            client_secret: 'e87328a644db9c8238e18a16f92e5fea6407dfd8',
            refresh_token: '9f2a635e2af7e9787970e8d5881d580d5875de69',
            grant_type: 'refresh_token'
        })  
    }).then(res => res.json())
        .then(res => getActivities(res)) //callback 
}

reAuthorize()