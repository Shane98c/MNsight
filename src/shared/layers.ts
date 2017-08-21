export const layers = {
    "mnLidarSource": {
      'type': 'arcgisraster',
      "url":"https://arcgis.dnr.state.mn.us/arcgis/rest/services/elevation/mn_hillshade_web_mercator/MapServer?f=json",
      "tileSize": 256
    },
    "mnLidarLayer": {
       'id': 'mnLidar',
       'type': 'raster',
       'source':"mnLidar",
       'maxzoom': 18,
       'minzoom': 7
     },
    "colorTopoSource": {
      'type': 'arcgisraster',
      "url":"https://arcgis.dnr.state.mn.us/arcgis/rest/services/elevation/elevation_mn_1mDEM_cache/MapServer?f=json",
      "tileSize": 256
    },
    "colorTopoLayer": {
       'id': 'colorTopo',
       'type': 'raster',
       'source':"colorTopo",
       'maxzoom': 18,
       'minzoom': 7
     }
  };
