export const layers = {
    "mnLidar": {
      'type': 'arcgisraster',
      "url":"https://arcgis.dnr.state.mn.us/arcgis/rest/services/elevation/mn_hillshade_web_mercator/MapServer?f=json",
      "tileSize": 256
    },
    "colorTopo": {
      'type': 'arcgisraster',
      "url":"https://arcgis.dnr.state.mn.us/arcgis/rest/services/elevation/elevation_mn_1mDEM_cache/MapServer?f=json",
      "tileSize": 256
    }
  };
