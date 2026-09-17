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

interface AppMapProps extends React.ComponentProps<typeof Map> {
    events: EventLocation[];
}

export function AppMap({
    events,
    center = [-74.006, 40.7128],
    zoom = 12,
    ...props
}: AppMapProps) {
    return (
        <Map center={center} zoom={zoom} {...props}>
            {events.map((event) => (
                <MapMarker key={event.id} longitude={event.longitude} latitude={event.latitude}>
                    <MarkerContent>
                        <button type="button" className="bg-primary size-4 rounded-full border-2 border-foreground shadow-lg cursor-pointer" aria-label={`View ${event.title}`} />
                    </MarkerContent>
                    <MarkerTooltip>{event.venue}</MarkerTooltip>
                </MapMarker>
            ))}
        </Map>
    )
}

