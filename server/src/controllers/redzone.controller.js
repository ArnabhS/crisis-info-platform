import getRedZoneCoordinates from "../utils/getRedZoneAreas.js";

export const getRedZones = async(req,res)=>{
    try {
    const coordinates = await getRedZoneCoordinates();
    res.json({ coordinates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}