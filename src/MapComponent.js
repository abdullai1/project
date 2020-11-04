import React, { useEffect, useRef, useState } from 'react'

export default function Map({ options, onMount, className, onMountProps }) {
  const ref = useRef()
  const [map, setMap] = useState()
  useEffect(() => {
    const onLoad = () => setMap(new window.google.maps.Map(ref.current, options))
    if (!window.google) {
      const script = document.createElement(`script`)
      script.src =
        `https://maps.googleapis.com/maps/api/js?key=` +
        "API_KEY_HERE"
      document.head.append(script)
      script.addEventListener(`load`, onLoad)
      return () => script.removeEventListener(`load`, onLoad)
    } else onLoad()
  }, [options])
  if (map && typeof onMount === `function`) onMount(map, onMountProps)
  return (
    
        <div
        style={{ height: `100vh`, margin: `1em 0`, borderRadius: `0.5em` }}
        {...{ ref, className }}
        />
    
  )
}


let markers = [{
    coords: { lat: 42, lng: 42 }, // required: latitude & longitude at which to display the marker
    title: `Marker`, // optional
    url: `https://wikipedia.org/wiki/Life,_the_Universe_and_Everything`, // optional
  }];

  function addMarkers(map, links) {
    links.forEach((link, index) => {
      const marker = new window.google.maps.Marker({
        map,
        position: link.coords,
        label: `${index + 1}`,
        title: link.title,
      })
      marker.addListener(`click`, () => {
        window.location.href = link.url
      })
    })
  };

Map.defaultProps = {
  options: {
    center: { lat: 48, lng: 8 },
    zoom: 5,
  },
  onMount: addMarkers, 
  onMountProps: markers, 
}