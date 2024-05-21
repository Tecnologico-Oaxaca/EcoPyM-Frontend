import React, { useState, useEffect, useRef } from 'react';
import './Map.css';

function loadGoogleMapsScript(callback) {
  if (window.google) {
    callback();
    return;
  }

  const existingScript = document.querySelector('script[src^="https://maps.googleapis.com"]');
  if (existingScript) {
    existingScript.addEventListener('load', callback);
    return;
  }

  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBonlfzmDEOC_JjfYJCOCD4S-5O8n1rmo4&callback=initMap`;
  script.async = true;
  script.defer = true;
  script.addEventListener('load', callback);
  document.head.appendChild(script);
}

function Map({ onLocationChange }) {
  const [permissionDenied, setPermissionDenied] = useState(true);
  const [currentLocation, setCurrentLocation] = useState({
    lat: -3.745,
    lng: -38.523,
    accuracy: null
  });
  const locationRef = useRef(currentLocation);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const accuracyCircleRef = useRef(null);
  const geocoderRef = useRef(null);

  useEffect(() => {
    window.initMap = function() {
      mapRef.current = new window.google.maps.Map(document.getElementById('map'), {
        center: locationRef.current,
        zoom: 18
      });
      

      geocoderRef.current = new window.google.maps.Geocoder();
    };

    loadGoogleMapsScript(() => window.initMap());
  }, []);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      function(position) {
        setPermissionDenied(false);
        const newPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        };
        if (!locationRef.current || Math.abs(newPosition.lat - locationRef.current.lat) > 0.0001 || Math.abs(newPosition.lng - locationRef.current.lng) > 0.0001) {
          locationRef.current = newPosition;
          setCurrentLocation(newPosition); // Solo se llama si realmente cambió la posición
          mapRef.current?.setCenter(newPosition);

          if (!markerRef.current) {
            markerRef.current = new window.google.maps.Marker({
              position: newPosition,
              map: mapRef.current,
            });

            accuracyCircleRef.current = new window.google.maps.Circle({
                strokeColor: '#CFCFCF',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#CFCFCF',
                fillOpacity: 0.50,
                map: mapRef.current,
                center: locationRef.current,
                radius: (locationRef.current.accuracy || 50) * 0.5,
              });



          } else {
            markerRef.current.setPosition(newPosition);
          }

          accuracyCircleRef.current?.setCenter(newPosition);
          accuracyCircleRef.current?.setRadius(newPosition.accuracy);

          // Geocodificación inversa para obtener la dirección
          if (geocoderRef.current) {
            geocoderRef.current.geocode({ location: newPosition }, (results, status) => {
              if (status === 'OK' && results[0]) {
                const addressComponents = results[0].address_components;
                const locationDetails = {
                  state: '',
                  district: '', // Usamos "district" para "municipio"
                  city: '',
                  street: ''
                };
                for (let component of addressComponents) {
                  if (component.types.includes('administrative_area_level_1')) {
                    locationDetails.state = component.long_name;
                  }
                  if (component.types.includes('administrative_area_level_2') || component.types.includes('locality')) {
                    locationDetails.district = component.long_name; // Interpretamos "district" como "municipio"
                  }
                  if (component.types.includes('sublocality') || component.types.includes('neighborhood')) {
                    locationDetails.city = component.long_name;
                  }
                  if (component.types.includes('route')) {
                    locationDetails.street = component.long_name;
                  }
                }
                // Llama a la función pasada desde Company con la nueva ubicación
                onLocationChange(locationDetails);
              }
            });
          }
        }
      },
      function(error) {
        if (error.code === error.PERMISSION_DENIED) {
            setPermissionDenied(true);  // Actualizar el estado si el permiso fue denegado
          }
        console.error("Error getting location", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 0
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
      window.initMap = null;
    };
  }, [onLocationChange]);  

  return (
    <div className="map-wrapper">
        {permissionDenied && <div className="map-overlay"></div>}
        <div id="map" className="map-Container">
      </div>
    </div>
  )
}

export default Map;
