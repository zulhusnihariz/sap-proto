module.exports = (sequelize, DataTypes) => {
  const StaffListing = sequelize.define("StaffListing", {
    EmpID: { type: DataTypes.STRING },
    Name: { type: DataTypes.STRING },
    BirthDt: { type: DataTypes.STRING },
    DtJoined: { type: DataTypes.STRING },
    Gender: { type: DataTypes.STRING },
    DeptID: { type: DataTypes.STRING },
    Department: { type: DataTypes.STRING },
    PositionID: { type: DataTypes.STRING },
    Position: { type: DataTypes.STRING },
    MngrID: { type: DataTypes.STRING },
    MngrName: { type: DataTypes.STRING },
    MaritalStatus: { type: DataTypes.STRING },
    CitizenDesc: { type: DataTypes.STRING },
    Race: { type: DataTypes.STRING }
  });

  return StaffListing;
};
