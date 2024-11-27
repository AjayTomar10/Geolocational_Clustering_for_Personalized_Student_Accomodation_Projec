from flask import Flask, request, jsonify, render_template
import requests
import folium
from geopy.distance import geodesic
import pandas as pd
from sklearn.cluster import KMeans

app = Flask(__name__)

# Foursquare API credentials
CLIENT_ID = '5O2OQN1HOFBER5CQ4VJSEBU3PZ54Z3T31EGTNFJ0V04KSKZI'
CLIENT_SECRET = 'H2KIZ3QZRGZD2GVCOSSTL04SQ3N0Y5QWEWQKPQ1VTPQNF24R'
VERSION = '20180604'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search():
    latitude = float(request.form['latitude'])
    longitude = float(request.form['longitude'])

    # Search for apartments
    search_query = 'Apartment'
    radius = 18000  # 18km radius
    LIMIT = 200
    url = f'https://api.foursquare.com/v2/venues/search?client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&ll={latitude},{longitude}&v={VERSION}&query={search_query}&radius={radius}&limit={LIMIT}'
    results = requests.get(url).json()
    venues = results['response']['venues']
    dataframe = pd.json_normalize(venues)

    # Filter columns
    filtered_columns = ['name', 'categories'] + [col for col in dataframe.columns if col.startswith('location.')] + ['id']
    dataframe_filtered = dataframe.loc[:, filtered_columns]

    # Extract category
    def get_category_type(row):
        try:
            categories_list = row['categories']
        except:
            categories_list = row['venue.categories']
        if len(categories_list) == 0:
            return None
        else:
            return categories_list[0]['name']

    dataframe_filtered['categories'] = dataframe_filtered.apply(get_category_type, axis=1)
    dataframe_filtered.columns = [column.split('.')[-1] for column in dataframe_filtered.columns]

    # Drop unwanted columns
    dataframe_filtered.drop(['cc', 'country', 'state', 'city', 'neighborhood'], axis=1, inplace=True, errors='ignore')

    # Calculate distances and cluster
    df_evaluate = dataframe_filtered[['lat', 'lng']].copy()
    RestList = []
    FruitList = []
    for lat, lng in zip(dataframe_filtered['lat'], dataframe_filtered['lng']):
        # Count nearby restaurants
        search_query = 'Restaurant'
        url = f'https://api.foursquare.com/v2/venues/search?client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&ll={lat},{lng}&v={VERSION}&query={search_query}&radius=5000&limit={LIMIT}'
        results = requests.get(url).json()
        RestList.append(len(results['response']['venues']))

        # Count nearby grocery/fruit stores
        search_query = 'Fruit'
        url = f'https://api.foursquare.com/v2/venues/search?client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&ll={lat},{lng}&v={VERSION}&query={search_query}&radius=5000&limit={LIMIT}'
        results = requests.get(url).json()
        FruitList.append(len(results['response']['venues']))

    df_evaluate['Restaurants'] = RestList
    df_evaluate['Groceries'] = FruitList

    # Clustering
    kmeans = KMeans(n_clusters=3, random_state=0).fit(df_evaluate)
    df_evaluate['Cluster'] = kmeans.labels_.astype(str)

    # Map generation
    map_bang = folium.Map(location=[latitude, longitude], zoom_start=12)
    folium.Marker([latitude, longitude], popup="Your Location", icon=folium.Icon(color="red")).add_to(map_bang)

    def color_producer(cluster):
        if cluster == '0':
            return 'green'
        elif cluster == '1':
            return 'orange'
        else:
            return 'red'

    for i, row in dataframe_filtered.iterrows():
        folium.CircleMarker(
            [row['lat'], row['lng']],
            fill=True,
            fill_opacity=1,
            popup=row['name'],
            radius=5,
            color=color_producer(df_evaluate.iloc[i]['Cluster'])
        ).add_to(map_bang)

    # Save map to an HTML file
    map_bang.save('templates/map.html')

    return jsonify({'status': 'success'})

@app.route('/map')
def display_map():
    return render_template('map.html')

if __name__ == '__main__':
    app.run(debug=True,port=5001)
