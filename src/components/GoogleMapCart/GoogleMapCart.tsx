// 'use client';
//
// import { useCallback, useState } from 'react';
// import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
// import useOnclickOutside from 'react-cool-onclickoutside';
// import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
// import styles from './googleMapStyle.module.scss';
// import LocationIcon from '../../../public/icons/locate.svg';
//
// const API_KEY = 'AIzaSyA0JXWOjbD_o0SmzV9Gpp29IZfyrqlG1QE';
//
// const containerStyle = {
//     width: '100%',
//     height: '315.56px',
// };
//
// export default function GoogleMapCart() {
//     const defaultCenter = {
//         lat: 52.2297,
//         lng: 21.0122,
//     };
//
//     const [center, setCenter] = useState(defaultCenter);
//     const { isLoaded } = useLoadScript({
//         id: 'google-maps-script',
//         googleMapsApiKey: API_KEY,
//         libraries: ['places'],
//     });
//
//     const [map, setMap] = useState<google.maps.Map | null>(null);
//
//     const onLoad = useCallback((map: google.maps.Map) => {
//         const bounds = new window.google.maps.LatLngBounds(center);
//         map.fitBounds(bounds);
//         setMap(map);
//     }, [center]);
//
//     const onUnmount = useCallback(() => {
//         setMap(null);
//     }, []);
//
//     const {
//         ready,
//         value,
//         setValue,
//         suggestions: { status, data },
//         clearSuggestions,
//     } = usePlacesAutocomplete({ debounce: 300 });
//
//     const ref = useOnclickOutside(() => {
//         clearSuggestions();
//     });
//
//     const handleSelect = ({ description }: { description: string }) => async () => {
//         setValue(description, false);
//         clearSuggestions();
//
//         const results = await getGeocode({ address: description });
//         const { lat, lng } = getLatLng(results[0]);
//
//         setCenter({ lat, lng });
//         map?.panTo({ lat, lng });
//     };
//
//     return isLoaded ? (
//         <>
//             <div ref={ref} className={styles.wrapper}>
//                 <input
//                     className={styles.input}
//                     type="text"
//                     value={value}
//                     onChange={(e) => setValue(e.target.value)}
//                   //  disabled={!ready}
//                     placeholder="Введите адрес"
//                     style={{ height: '50px', width: '100%' }}
//                 />
//                 {status === 'OK' && (
//                     <ul className={styles.ul}>
//                         {data.map(({ place_id, description }) => (
//                             <li key={place_id} className={styles.li} onClick={handleSelect({ description })}>
//                                 {description}
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//
//             <div>
//                 <GoogleMap
//                     mapContainerStyle={containerStyle}
//                     center={center}
//                     zoom={10}
//                     onLoad={onLoad}
//                     onUnmount={onUnmount}
//                 >
//                     {/*<CurrentLocationMarker position={center} />*/}
//                 </GoogleMap>
//             </div>
//         </>
//     ) : null;
// }
//
// interface ICurrentLocationMarker {
//     position: { lat: number; lng: number };
// }
//
// const CurrentLocationMarker = ({ position }: ICurrentLocationMarker) => {
//     return <Marker position={position} icon={{ url: LocationIcon }} />;
// };


// 'use client';
//
// import React, {useEffect, useRef, useState} from "react";
// import {
//     AdvancedMarker,
//     APIProvider,
//     useAdvancedMarkerRef,
//     Map,
//     useMap,
//     useMapsLibrary
// } from "@vis.gl/react-google-maps";
// import clsx from "clsx";
// import styles from "@/src/components/AddressModule/ui/AddressModule.module.scss";
// interface GoogleMapCartProps {
//     onCoordinatesChange: (coordinates: string) => void;
//     inputValue: string
//     setInputValue: (adres: string) => void
// }
//
// export default function GoogleMapCartWrapper(props: GoogleMapCartProps) {
//     return (
//         <APIProvider apiKey="AIzaSyA0JXWOjbD_o0SmzV9Gpp29IZfyrqlG1QE">
//             <GoogleMapCart {...props} />
//         </APIProvider>
//     );
// }
//
// function GoogleMapCart({onCoordinatesChange, inputValue, setInputValue}: GoogleMapCartProps) {
//     const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
//     const [markerRef, marker] = useAdvancedMarkerRef();
//
//     const handlePlaceSelect = (place: google.maps.places.PlaceResult | null) => {
//         if (!place) return;
//         setSelectedPlace(place);
//
//         const location = place.geometry?.location;
//         if (location) {
//             const coords = `${location.lat()},${location.lng()}`;
//             onCoordinatesChange(coords);
//             setInputValue(place.formatted_address || '');
//         }
//     };
//
//     return (
//         <>
//             <Map
//                 mapId="49ae42fed52588c3"
//                 defaultZoom={18}
//                 defaultCenter={{ lat: 42.8746, lng: 74.5698 }}
//                 gestureHandling="greedy"
//                 disableDefaultUI
//                 style={{width: '100%', height: '300px'}}
//                 onClick={async (event) => {
//
//                     const lat = event.detail.latLng?.lat;
//                     const lng = event.detail.latLng?.lng;
//
//                     if (lat && lng && marker) {
//                         onCoordinatesChange(`${lat},${lng}`);
//                         marker.position = {lat, lng};
//
//                         const geocoder = new google.maps.Geocoder();
//                         const {results} = await geocoder.geocode({location: {lat, lng}});
//                         if (results[0]) {
//                             setInputValue(results[0].formatted_address);
//                         }
//                     }
//                 }}
//             >
//                 <AdvancedMarker ref={markerRef} position={null}/>
//                 <MapHandler place={selectedPlace} marker={marker}/>
//             </Map>
//             <div className={clsx(styles.AutocompleteLabel)}>
//                 <p className={styles.labelCart}>Адрес</p>
//                 <PlaceAutocomplete onPlaceSelect={handlePlaceSelect} value={inputValue} onChange={setInputValue}/>
//             </div>
//         </>
//     );
// }
//
// interface MapHandlerProps {
//     place: google.maps.places.PlaceResult | null;
//     marker: google.maps.marker.AdvancedMarkerElement | null;
// }
//
// const MapHandler = ({place, marker}: MapHandlerProps) => {
//     const map = useMap();
//
//     useEffect(() => {
//         if (!map || !place || !marker) return;
//
//         if (place.geometry?.viewport) {
//             map.fitBounds(place.geometry.viewport);
//         } else if (place.geometry?.location) {
//             map.setCenter(place.geometry.location);
//             map.setZoom(17);
//         }
//
//         marker.position = place.geometry?.location;
//     }, [map, place, marker]);
//
//     return null;
// };
//
// interface PlaceAutocompleteProps {
//     onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
//     value: string;
//     onChange: (val: string) => void;
// }
//
// const PlaceAutocomplete = ({onPlaceSelect, value, onChange}: PlaceAutocompleteProps) => {
//     const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
//     const inputRef = useRef<HTMLInputElement>(null);
//     const places = useMapsLibrary('places');
//
//     useEffect(() => {
//         if (!places || !inputRef.current) return;
//
//         const options = {
//             fields: ['geometry', 'name', 'formatted_address'],
//         };
//
//         const ac = new places.Autocomplete(inputRef.current!, options);
//         ac.addListener('place_changed', () => {
//             const place = ac.getPlace();
//             onPlaceSelect(place);
//         });
//
//         setAutocomplete(ac);
//     }, [places]);
//
//     return (
//         <input
//             ref={inputRef}
//             value={value}
//             required={true}
//             onChange={(e) => onChange(e.target.value)}
//             placeholder="Введите адрес"
//
//         />
//     );
// };


'use client';

import React, { useEffect, useRef, useState } from 'react';

import { load } from '@2gis/mapgl';
import clsx from 'clsx';
import styles from '@/src/components/AddressModule/ui/AddressModule.module.scss';

interface DgisMapProps {
    onCoordinatesChange: (coords: string) => void;
    inputValue: string;
    setInputValue: (val: string) => void;
}

export default function DgisMap({ onCoordinatesChange, inputValue, setInputValue }: DgisMapProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<any>(null);
    const markerRef = useRef<any>(null);
    const [suggestions, setSuggestions] = useState<any[]>([]);

    const DGIS_API_KEY = '897871d2-12a8-4490-8bce-3b4646a0a87e';

    useEffect(() => {
        let destroyed = false;

        load().then((mapglAPI) => {
            if (!mapContainerRef.current || destroyed) return;

            const map = new mapglAPI.Map(mapContainerRef.current, {
                center: [74.5698, 42.8746],
                zoom: 18,
                key: DGIS_API_KEY,
            });

            const marker = new mapglAPI.Marker(map, {
                coordinates: [74.5698, 42.8746],
            });

            mapRef.current = map;
            markerRef.current = marker;

            map.on('click', async (e) => {

                if (destroyed) return;

                const targetId = e?.targetData?.id;

                if (targetId) {

                    const url = `https://catalog.api.2gis.com/3.0/items/byid` +
                        `?id=${targetId}` +
                        `&fields=items.point,items.address` +
                        `&key=${DGIS_API_KEY}`;

                    const res = await fetch(url);
                    const data = await res.json();

                    const item = data?.result?.items?.[0];
                    if (item) {
                        const name = item?.name || '';
                        const address = item?.address_name || '';
                        const lat = item?.point?.lat;
                        const lng = item?.point?.lon;

                        // map.addPopup({
                        //     coordinates: e.lngLat,
                        //     html: `<strong>${name}</strong><br/>${address}`,
                        // });

                        if (lat && lng) {
                            marker.setCoordinates([lng, lat]);
                            map.setCenter([lng, lat]);
                            map.setZoom(18);
                            setInputValue(address);
                            onCoordinatesChange(`${lat},${lng}`);
                        }
                    }
                } else {
                    // Клик вне объекта
                    const [lng, lat] = e.lngLat;

                    marker.setCoordinates([lng, lat]);
                    onCoordinatesChange(`${lat},${lng}`);

                    const res = await fetch(
                        `https://catalog.api.2gis.com/3.0/items/geocode?q=${lng},${lat}&key=${DGIS_API_KEY}`
                    );
                    const data = await res.json();

                    const address = data?.result?.items?.[0]?.full_name || '';
                    setInputValue(address);
                }
            });
        });

        return () => {
            destroyed = true;
            markerRef.current?.destroy();
            mapRef.current?.destroy();
            mapRef.current = undefined;
            markerRef.current = undefined;
        };
    }, []);




    const handleInputChange = async (val: string) => {
        setInputValue(val);

        if (!val) {
            setSuggestions([]);
            return;
        }

        const url = `https://catalog.api.2gis.com/3.0/suggests` +
            `?q=${encodeURIComponent(val)}` +
            `&region_id=112` +
            `&fields=items.point,items.address` +
            `&key=${DGIS_API_KEY}`;

        try {
            const res = await fetch(url);
            const data = await res.json();

            const items = data?.result?.items || [];
            setSuggestions(items);
        } catch (error) {
            console.error("Suggest API error:", error);
        }
    };

    const handleSuggestionClick = (item: any) => {

        const address = item.full_name || item.address_name || item.name || '';
        setInputValue(address);
        setSuggestions([]);

        const lat = item?.point?.lat;
        const lng = item?.point?.lon;

        if (lat && lng) {
            onCoordinatesChange(`${lat},${lng}`);
            markerRef.current?.setCoordinates([lng, lat]);
            mapRef.current?.setCenter([lng, lat]);
            mapRef.current?.setZoom(17);
        }
    };

    return (
        <>
            <div
                ref={mapContainerRef}
                style={{ width: '100%', height: '300px' }}
            />

            <div className={clsx(styles.AutocompleteLabel)}>
                <p className={styles.labelCart}>Адрес</p>
                <input
                    value={inputValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="Введите адрес"
                    required
                />
                {suggestions.length > 0 && (
                    <ul
                        style={{
                            listStyle: 'none',
                            margin: 0,
                            padding: '4px',
                            border: '1px solid #ccc',
                            background: '#fff',
                            position: 'absolute',
                            zIndex: 10,
                            width: '100%',
                            maxHeight: 200,
                            overflowY: 'auto',
                            top: 70
                        }}
                    >
                        {suggestions.map((item) => (
                            <li
                                key={item.id}
                                style={{ padding: '6px', cursor: 'pointer' }}
                                onClick={() => handleSuggestionClick(item)}
                            >
                                {item.full_name || item.name}
                                {/*{item.address_name}*/}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}


