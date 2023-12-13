
/**
 * The Haversine Formula is derived from the Law of Haversines and can be used to calculate distance.
 * @param coords
 * @returns {number}
 */
export const calcDistanceToTelAviv = (coords) => {
  const coordsTelAviv = {
    lat: 32.0853,
    lng: 34.7818
  }

  const R = 6371;
  const p1 = coords.lat * Math.PI/180;
  const p2 = coordsTelAviv.lat * Math.PI/180;
  const deltaLon = coordsTelAviv.lng - coords.lng;
  const deltaLambda = (deltaLon * Math.PI) / 180;
  const distance = Math.acos(
    Math.sin(p1) * Math.sin(p2) + Math.cos(p1) * Math.cos(p2) * Math.cos(deltaLambda),
  ) * R;

  return parseFloat(distance.toFixed(1));
}
