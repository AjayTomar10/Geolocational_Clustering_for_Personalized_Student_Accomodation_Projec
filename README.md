# Geolocational Clustering for Personalized Student Accommodation

This project presents a smart, location-based solution to assist students in finding suitable accommodations near their universities. By leveraging geospatial data and machine learning clustering algorithms, it delivers personalized housing recommendations based on individual preferences like proximity to amenities such as gyms, restaurants, hospitals, and grocery stores.

## 🧠 Project Motivation

Students moving to new cities often struggle to find housing that suits their lifestyle and location preferences. This project addresses the challenge using intelligent clustering techniques that group available accommodations based on geolocation and student preferences.

## 📌 Objectives

- To recommend accommodation using real-time geospatial data.
- To implement clustering algorithms like K-Means, Gaussian Mixture Model (GMM), and Mean Shift for data analysis.
- To support multiple major Indian cities.
- To provide a user-friendly web interface for housing search.

## 🧪 Methodology

### Data Collection
- Uses the **Foursquare API** to fetch data on accommodations and surrounding amenities within a user-specified radius.

### Data Processing
- Normalization and transformation of API data for clustering input.

### Clustering Techniques
- **K-Means**: Fast and simple clustering.
- **Gaussian Mixture Model (GMM)**: Effective for overlapping clusters.
- **Mean Shift**: Does not require predefined number of clusters.

### Visualization
- Real-time maps showcasing university locations and nearby accommodation clusters.
- Highlighted density zones based on user preferences using heatmaps and colored markers.

## 🔧 Tools & Technologies

- **Python 3**: Core programming language.
- **Flask**: Web framework for building the interface.
- **Jupyter Notebook**: For data analysis and prototyping.
- **Visual Studio Code**: Development environment.
- **Foursquare API**: Geolocation data provider.

## 📈 Results

- Input: User provides location or university along with preference filters.
- Output:
  - Visualized map showing clustered apartments near the university.
  - Color-coded density zones based on selected amenities.



## 📚 References

1. Geospatial data exploration using machine learning – ICOSEC 2023, IEEE.
2. Exploratory Analysis of Geolocational Data – International Journal of Research Publication and Reviews, 2023.
3. Machine learning for spatial analyses in urban areas: a scoping review – Sustainable Cities and Society, Elsevier, 2022.
4. [IBM: What is K-means clustering?](https://www.ibm.com/think/topics/k-means-clustering)

## 👨‍💻 Contributors

- Ajay Singh Tomar    
- Nishanka Nayak K   
- Akash V
- Mohammad Saif Ul Islam



---

## 📌 License

This project is for academic and educational use only. Contact the contributors for usage permissions.
