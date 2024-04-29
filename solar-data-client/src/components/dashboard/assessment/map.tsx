import React, { useState, useEffect } from 'react'
import { Loader } from "@googlemaps/js-api-loader"
import { Alert, Box, Stack, Typography } from '@mui/material'
import SdTextField from '@/components/ui/SdTextField'
import { Form, Formik } from 'formik'
import { TextField } from '@mui/material'
import SdButton from '@/components/ui/SdButton'
import { useTranslation } from 'next-i18next'
import { addLocation } from '@/data/assessment/assessment.queries'
import { useToast } from '@/utils/hooks/useToast'
import { TabValueProps } from './locations'

interface Props {
    changeTab: (val: TabValueProps) => void
}
type latLngEvent = {
    latLng: any
}

const LocationMap = ({ changeTab }: Props) => {
    const [area, setArea] = useState(0)
    const [mapState, setMapState] = useState<google.maps.Map>()
    const [polygonLinesState, setPolygonlinesState] = useState<google.maps.Polygon>()
    const [finalPolygonLines, setFinalPolygonLines] = useState<google.maps.LatLng[]>([])
    const [renderMapToggle, setRenderMapToggle] = useState(true)
    const [coordinatesChanged, setCoordinatesChanged] = useState(false)
    let coordinateBool = false

    const { t } = useTranslation()
    const { showToast } = useToast()


    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string

    let lines: google.maps.Polyline
    let polygonLines: google.maps.Polygon
    let polylines: google.maps.Polyline[] = [];
    let canDrawPolylines = true

    const loader = new Loader({
        apiKey,
        version: "weekly",

    });

    const getControlBtnStyles = (controlButton: HTMLButtonElement, title: string, margin: number) => {
        controlButton.style.backgroundColor = '#fff';
        controlButton.style.border = '2px solid #fff';
        controlButton.style.borderRadius = '3px';
        controlButton.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlButton.style.color = 'rgb(25,25,25)';
        controlButton.style.cursor = 'pointer';
        controlButton.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlButton.style.fontSize = '16px';
        controlButton.style.lineHeight = '38px';
        controlButton.style.margin = '20px 2px';
        controlButton.style.padding = '0 5px';
        controlButton.style.textAlign = 'center';
        controlButton.style.height = '20px'
        controlButton.innerHTML = `<img src='https://maps.gstatic.com/mapfiles/drawing.png'/>`
        controlButton.style.overflow = 'hidden'
        const icon = (controlButton?.firstChild as unknown as HTMLImageElement)
        icon.style.marginTop = `${margin}px`

        controlButton.title = title;
        controlButton.type = 'button';
    }

    const drawShapeControl = (map: google.maps.Map) => {
        const controlButton = document.createElement('button');

        // Set CSS for the control.
        getControlBtnStyles(controlButton, 'Draw a shape', -96)


        controlButton.addEventListener('click', () => {
            map.setOptions({ draggableCursor: 'crosshair' });
            canDrawPolylines = true
        });

        return controlButton;
    }

    const stopDrawingControl = (map: google.maps.Map) => {
        const controlButton = document.createElement('button');

        // Set CSS for the control.
        getControlBtnStyles(controlButton, 'Stop drawing', -80)

        controlButton.addEventListener('click', () => {
            map.setOptions({ draggableCursor: null });
            canDrawPolylines = false
        });

        return controlButton;
    }


    const handleDrag = (polygonLines: google.maps.Polygon) => {

        google.maps.event.addListener(polygonLines, 'dragend', (e: latLngEvent) => {
            const polygonArr = polygonLines.getPath().getArray()
            setFinalPolygonLines(polygonArr)
            setCoordinatesChanged(!coordinateBool)
        })

    }
    const mapLoaderFn = (map: google.maps.Map) => {

        let lineCoordinates: google.maps.LatLngLiteral[] = [];

        const drawPolylines = (e: latLngEvent) => {
            console.log('drawing polylines')
            lineCoordinates.push(e.latLng.toJSON())

            lines = new google.maps.Polyline({
                path: lineCoordinates,
                geodesic: true,
                strokeColor: "#000000",
                strokeOpacity: 1.0,
                strokeWeight: 2,
                editable: true,
                draggable: true,
            });
            polylines.push(lines)
            lines.setMap(map)
        }


        const drawPolygon = () => {
            canDrawPolylines = false

            lineCoordinates.pop() // removes the last polyline that closes the loop
            const polygonCoordinates = [...lineCoordinates]

            lineCoordinates = []


            polygonLines = (new google.maps.Polygon({
                paths: polygonCoordinates,
                geodesic: true,
                strokeColor: "#000000",
                strokeOpacity: 1.0,
                strokeWeight: 3,
                editable: true,
                draggable: true
            }));

            setPolygonlinesState(polygonLines)


            map.setOptions({ draggableCursor: null });

            polylines.forEach((line) => {
                line.setMap(null)
            })

            polygonLines.setMap(map);
            if (!canDrawPolylines)
                handleDrag(polygonLines)

            const path = polygonLines.getPath();

            // Calculate the area of the polygon

            const area = google.maps.geometry.spherical.computeArea(path);


            setArea(area)
            setFinalPolygonLines(path.getArray())

        }

        map.setOptions({ draggableCursor: 'crosshair' });

        map.controls[google.maps.ControlPosition.TOP_LEFT].push(stopDrawingControl(map));
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(drawShapeControl(map));


        map.addListener('click', (e: latLngEvent) => {

            canDrawPolylines && drawPolylines(e)

            google.maps.event.addListener(lines, 'click', (e: latLngEvent) => {
                canDrawPolylines && drawPolylines(e)

                if (formsPolygon()) {
                    drawPolygon()
                }

            });

            const closesLoop = (vertex: google.maps.LatLngLiteral, lastVertex: google.maps.LatLngLiteral) => {
                const tolerance = 0.0050; // Tolerance for comparing latitudes and longitudes
                return Math.abs(vertex.lat - lastVertex.lat) < tolerance &&
                    Math.abs(vertex.lng - lastVertex.lng) < tolerance;
            };

            // Function to check if vertices form a valid polygon
            const formsPolygon = () => {
                if (lineCoordinates.length < 3) return false; // Need at least 3 vertices to form a polygon
                const firstVertex = lineCoordinates[0];
                const lastVertex = lineCoordinates[lineCoordinates.length - 1];
                return closesLoop(firstVertex, lastVertex) && lineCoordinates.length > 2;
            };


            if (formsPolygon()) {
                drawPolygon()
            }
        })



    }


    const renderMap = () => {

        let map: google.maps.Map;

        loader.load().then(async () => {
            const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
            map = new Map(document.getElementById("map") as HTMLElement, {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
                mapId: '4504f8b37365c3d0'
            });
            setMapState(map)
            mapLoaderFn(map)
        })

    }

    useEffect(() => {
        renderMap()
    }, [renderMapToggle])

    useEffect(() => {
        // used to rerender form after polygon is dragged using coordinatesBool variable

    }, [finalPolygonLines, coordinatesChanged])


    const transformCoordinates = (rawCoordinates: google.maps.LatLng[]) => {
        return rawCoordinates.map((coordinate) => {
            return {
                lat: coordinate.lat(),
                lng: coordinate.lng(),
            }

        })
    }

    const deleteLocations = () => {
        setArea(0)
        polylines = []
        mapState?.controls[google.maps.ControlPosition.TOP_LEFT].clear()
        polygonLinesState?.setMap(null)
        canDrawPolylines = true
        mapState?.setOptions({ draggableCursor: 'crosshair' });
        mapState && mapLoaderFn(mapState)
        setFinalPolygonLines([])
    }

    return (
        <>
            <div style={{ minHeight: '70vh', width: "100%", margin: '1em' }} id='map'>

            </div>


            <Formik
                initialValues={{ name: '', area: 0, ghi: null, isActive: false, coordinates: [{ lat: 0, lng: 0 }] }}
                onSubmit={async (values) => {
                    values.area = area
                    values.coordinates = transformCoordinates(finalPolygonLines)
                    console.log(values.coordinates, values.name, values.area)
                    await addLocation(values)
                    showToast('success', 'Location added successfully')
                    changeTab(t('headerMenu.locations'))


                }}
            >
                {() => (

                    <Form style={{ display: 'flex', flexDirection: 'column', margin: '1em' }}>
                        {area > 5000000 &&
                            <Alert severity="error">{t('errorMsg.areaLarger')}</Alert>
                        }
                        {finalPolygonLines.length > 0 && (
                            <>
                                <Typography variant='h6' alignSelf={'center'} mb={2}>Location Details</Typography>
                                <Box display={'flex'} gap={1}>
                                    <SdTextField name='name' label='Name of location' sx={{ width: '50%', margin: '16px 0' }} />
                                    <SdTextField name='area' label='Area of location (m²)' sx={{ width: '50%', margin: '16px 0' }} value={area} disabled />
                                </Box>

                                <Typography m={2}>Location Coordinates</Typography>
                                <Box display={'flex'} gap={2} flexWrap={'wrap'}>


                                    {finalPolygonLines.map((lines, index) => {
                                        return (

                                            <Box key={index} display={'flex'} gap={1}>
                                                <TextField disabled value={lines.lng()} label={`longitude ${index + 1}`} />
                                                <TextField disabled value={lines.lat()} label={`latitude ${index + 1}`} />

                                            </Box>

                                        )
                                    })}
                                </Box>
                                <Stack gap={1} my={4} width={'50%'} alignSelf={'center'}>
                                    <SdButton variant='outlined' onClick={deleteLocations}>{t('labels.deleteLocation')}</SdButton>
                                    <SdButton variant='contained' type="submit" disabled={area > 5000000}>{t('labels.addLocation')}</SdButton>
                                </Stack>

                            </>

                        )}
                    </Form>
                )}
            </Formik>




        </>
    )


}



export default LocationMap

