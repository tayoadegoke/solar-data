import { Autocomplete, Box, TextField } from '@mui/material'
import { Loader } from "@googlemaps/js-api-loader"
import React, { useState, useEffect } from 'react'

interface Props {
    setMapCenter: (mapCenter: google.maps.LatLng | google.maps.LatLngLiteral | null | undefined) => void
}

function MapSearch(props: Props) {
    const { setMapCenter } = props
    const [inputValue, setInputValue] = React.useState('');
    const [searchOptions, setSearchOptions] = useState([''])
    const [autocompleteService, setAutoCompleteService] = useState<google.maps.places.AutocompleteService>()
    const [placesService, setPlacesService] = useState<google.maps.places.PlacesService>()
    const [placesIdLookup, setPlacesIdLookup] = useState<google.maps.places.AutocompletePrediction[]>([])
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string



    const loader = new Loader({
        apiKey,
        version: "weekly",

    });



    const loadAuto = () => {
        loader.load().then(async () => {
            const { PlacesService, AutocompleteService, } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
            const autoComplete = new AutocompleteService()
            const div = document.getElementById('location-search')
            const places = new PlacesService(div as HTMLDivElement)

            setAutoCompleteService(autoComplete)
            setPlacesService(places)

        }).catch((e) => {
            console.log(e)
        })

    }



    useEffect(() => {
        if (inputValue == '')
            loadAuto()
    }, [])
    return (
        <Box sx={{ width: "100%", margin: '0 1em', height: '50px' }} >
            <div id="location-search"
            >

            </div>
            <Autocomplete
                disablePortal
                options={searchOptions}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="Search Nearest Location" fullWidth />}
                inputValue={inputValue}
                onInputChange={async (event, newInputValue) => {
                    setInputValue(newInputValue);

                    autocompleteService && autocompleteService.getPlacePredictions({
                        input: newInputValue,
                    }, (res) => {
                        const placeArr: string[] = []
                        const placeDetailsArr: google.maps.places.AutocompletePrediction[] = []

                        res?.map((place) => {
                            placeArr.push(place.description);
                            placeDetailsArr.push(place)


                        })
                        setSearchOptions(placeArr)
                        setPlacesIdLookup(placeDetailsArr)
                    })


                }}

                onChange={async (event, newInputValue) => {
                    const place = placesIdLookup.find((pl) => pl.description == newInputValue)

                    if (place?.place_id)
                        placesService?.getDetails({
                            placeId: place?.place_id!,
                            fields: ['geometry']
                        }, (placeDetails) => {
                            setMapCenter(placeDetails?.geometry?.location)

                        })

                }}
            />

        </ Box>
    )
}

export default MapSearch
