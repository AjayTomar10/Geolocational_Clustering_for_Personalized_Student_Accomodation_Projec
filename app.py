from flask import Flask, request, jsonify, render_template
import requests
import folium
from geopy.distance import geodesic
import pandas as pd
from sklearn.cluster import KMeans
from concurrent.futures import ThreadPoolExecutor

app = Flask(__name__)

# Foursquare API credentials
CLIENT_ID = '5O2OQN1HOFBER5CQ4VJSEBU3PZ54Z3T31EGTNFJ0V04KSKZI'
CLIENT_SECRET = 'H2KIZ3QZRGZD2GVCOSSTL04SQ3N0Y5QWEWQKPQ1VTPQNF24R'
VERSION = '20180604'

@app.route('/')
def index():
    return render_template('index.html')

def fetch_foursquare_data(lat, lng, query, radius, limit=50):
    """Fetch data from Foursquare API for a specific query."""
    url = (
        f'https://api.foursquare.com/v2/venues/search'
        f'?client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}'
        f'&ll={lat},{lng}&v={VERSION}&query={query}&radius={radius}&limit={limit}'
    )
    response = requests.get(url)
    if response.status_code == 200:
        return len(response.json()['response']['venues'])
    return 0

@app.route('/search', methods=['POST'])
def search():
    latitude = float(request.form['latitude'])
    longitude = float(request.form['longitude'])

    # Search for apartments
    search_query = 'Apartment'
    radius = 18000  # 18km radius
    LIMIT = 50
    url = (
        f'https://api.foursquare.com/v2/venues/search?client_id={CLIENT_ID}'
        f'&client_secret={CLIENT_SECRET}&ll={latitude},{longitude}&v={VERSION}'
        f'&query={search_query}&radius={radius}&limit={LIMIT}'
    )
    results = requests.get(url).json()
    venues = results['response']['venues']
    dataframe = pd.json_normalize(venues)

    # Extract necessary columns
    dataframe['lat'] = dataframe['location.lat']
    dataframe['lng'] = dataframe['location.lng']
    dataframe = dataframe[['name', 'lat', 'lng']]

    # Use ThreadPoolExecutor for concurrent Foursquare API requests
    RestList = []
    FruitList = []
    with ThreadPoolExecutor(max_workers=10) as executor:
        restaurant_tasks = [
            executor.submit(fetch_foursquare_data, lat, lng, 'Restaurant', 5000)
            for lat, lng in zip(dataframe['lat'], dataframe['lng'])
        ]
        grocery_tasks = [
            executor.submit(fetch_foursquare_data, lat, lng, 'Fruit', 5000)
            for lat, lng in zip(dataframe['lat'], dataframe['lng'])
        ]
        RestList = [task.result() for task in restaurant_tasks]
        FruitList = [task.result() for task in grocery_tasks]

    dataframe['Restaurants'] = RestList
    dataframe['Groceries'] = FruitList

    # Clustering
    kmeans = KMeans(n_clusters=3, random_state=0).fit(dataframe[['lat', 'lng', 'Restaurants', 'Groceries']])
    dataframe['Cluster'] = kmeans.labels_.astype(str)

    # Map generation
    map_bang = folium.Map(location=[latitude, longitude], zoom_start=12)
    folium.Marker([latitude, longitude], popup="Your Location", icon=folium.Icon(color="red")).add_to(map_bang)

    def color_producer(cluster):
        return ['green', 'orange', 'red'][int(cluster)]

    for _, row in dataframe.iterrows():
        apartment_location = (row['lat'], row['lng'])
        distance = geodesic((latitude, longitude), apartment_location).kilometers
        popup_content = f"<b>{row['name']}</b><br>Distance: {distance:.2f} km"
        popup = folium.Popup(popup_content, max_width=200, min_width=150)

        folium.CircleMarker(
            [row['lat'], row['lng']],
            fill=True,
            fill_opacity=1,
            popup=popup,
            radius=5,
            color=color_producer(row['Cluster'])
        ).add_to(map_bang)

    # Save map to an HTML file
    map_bang.save('templates/map.html')

    return jsonify({'status': 'success'})

@app.route('/map')
def display_map():
    return render_template('map.html')

if __name__ == '__main__':
    app.run(debug=True, port=5001)
