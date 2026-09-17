"use client"

import { Map, MapMarker, MarkerContent, MarkerTooltip } from "@/components/ui/map";


export interface EventLocation {
    id: string;
    date: string;
    title: string;
    venue: string;
    longitude: number;
    latitude: number;
    coordinates?: [number, number];
}

interface AppMapProps {
    events: EventLocation[];
    center?: [number, number];
    zoom?: number;
}

export function AppMap({
    events,
    center = [-74.006, 40.7128],
    zoom = 12,
}: AppMapProps) {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <Map center={center} zoom={zoom} >
                {events.map((event) => (
                    <MapMarker key={event.id} longitude={event.longitude} latitude={event.latitude}>
                        <MarkerContent>
                            <button type="button" className="bg-primary size-4 rounded-full border-2 border-foreground shadow-lg cursor-pointer" aria-label={`View ${event.title}`} />
                        </MarkerContent>
                        <MarkerTooltip>{event.venue}</MarkerTooltip>
                    </MapMarker>
                ))}
            </Map>
        </div>
    )
}

