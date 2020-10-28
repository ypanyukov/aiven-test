const getDistanceBetweenCoords = (coords1, coords2) => {
  const latitudeDiff = coords1.latitude - coords2.latitude;
  const longitudeDiff = coords1.longitude - coords2.longitude;

  return (latitudeDiff ** 2 + longitudeDiff ** 2) ** 0.5;
}

const closestDataCenterSorting = (data) => {
  if (!navigator.geolocation) {
    // do nothing
    return Promise.resolve(data);
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(({coords}) => {
      data.sort((a, b) => {
        const aDistance = getDistanceBetweenCoords({
          latitude: a.geo_latitude,
          longitude: a.geo_longitude
        }, coords);
        const bDistance = getDistanceBetweenCoords({
          latitude: b.geo_latitude,
          longitude: b.geo_longitude
        }, coords);

        return aDistance - bDistance;
      });

      resolve(data);
    }, () => {
      // do nothing
      resolve(data);
    }, {
      enableHighAccuracy: true,
      timeout: 1000,
      maximumAge: 0
    });
  });
};

export default closestDataCenterSorting;
