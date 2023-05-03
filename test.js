// Set up the initial request URL with the user ID and page 1
const userId = 106656;
const perPage = 200;
const auth_link = "https://www.strava.com/oauth/token"

reAuthorize()
const initialRequestUrl = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}&per_page=${perPage}&page=1`

// Make the initial API request using fetch()
fetch(initialRequestUrl)
  .then(response => response.json())
  .then(data => {
    let activities = data;

    // Loop through subsequent pages of activities and concatenate the data
    let nextPage = 2;
    while (data.length === perPage) {
      const requestUrl = `https://www.strava.com/api/v3/athlete/activities?access_token=<INSERT_ACCESS_TOKEN_HERE>&per_page=${perPage}&page=${nextPage}`;

      fetch(requestUrl)
        .then(response => response.json())
        .then(data => {
          activities = activities.concat(data);
          nextPage++;
        }) }

        (function (activities){
            
            var map = L.map('map').setView([45.508, -73.6], 11.5);
    
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
    
            for(var x = 0; x<activities.length; x++){
                
                console.log(activities[x].map.summary_polyline) //get polyline data
                var coordinates = L.Polyline.fromEncoded(activities[x].map.summary_polyline).getLatLngs()
                console.log(coordinates)
    
                L.polyline(
    
                    coordinates,
                    
                    {
                        color:"green",
                        weight:5,
                        opacity:.7,
                        lineJoin:'round'
    
                    }
                ).addTo(map)
            }
    
            }
            
            )



    }
  )
            
            
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
