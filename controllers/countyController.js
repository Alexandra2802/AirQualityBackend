const { getCountyByRegionId } = require("../models/countyModel");

const getCountyFromRegion = async (req, res) => {
  const regionId = req.params.id;

  try {
    const county = await getCountyByRegionId(regionId);

    if (!county) {
      return res.status(404).json({ message: "Judetul nu a fost gasit" });
    }

    res.json({ name: county.name, code: county.code });
  } catch (err) {
    console.error("Eroare la identificarea judetului:", err);
    res.status(500).json({ message: "Eroare interna" });
  }
};

module.exports = { getCountyFromRegion };
