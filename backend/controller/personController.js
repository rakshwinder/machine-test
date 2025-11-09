
import Person from "../models/personModel.js";


export const PersonSeedData = async (req,res) => {
  try {

    await Person.deleteMany();
    console.log("Existing data cleared");
    const ramesh = await Person.create({ name: "Ramesh" });
    const deepu = await Person.create({ name: "Deepu" });
    const prem = await Person.create({ name: "Prem Chopra" });

    await Person.create({ name: "Gaurav", parent: ramesh._id });
    await Person.create({ name: "Shalu", parent: ramesh._id });

    const amit = await Person.create({ name: "Amit", parent: deepu._id });
    await Person.create({ name: "Sham Lal", parent: amit._id });
    await Person.create({ name: "Kapil", parent: deepu._id });

    return res.json({ message: "Data seeded successfully" });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};




export const getAllPersons = async (req, res) => {
  try {
    const people = await Person.find().lean();

    if (!people || people.length === 0)
      return res.status(400).json({ success: false, message: "No data found" });

    const map = {};
  people.forEach(p => map[p._id] = { ...p, children: [] });

  const roots = [];
  people.forEach(p => {
    if (p.parent) {
      if (map[p.parent]) map[p.parent].children.push(map[p._id]);
    } else {
      roots.push(map[p._id]);
    }
  });

    res.status(200).json({ success: true, data: roots });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



