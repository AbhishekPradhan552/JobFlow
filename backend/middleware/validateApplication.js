export function validateApplication(mode) {
  return (req, res, next) => {
    const { company, role, status } = req.body;
    const allowedStatus = ["APPLIED", "INTERVIEW", "OFFER", "REJECTED"];
    //Create mode(required)
    if (mode === "create") {
      if (!company || !company.trim()) {
        return res.status(400).json({ message: "Company is required" });
      }
      if (!role || !role.trim()) {
        return res.status(400).json({ message: "Role is required" });
      }
    }
    if (mode === "update") {
      if (company !== undefined && !company.trim()) {
        return res.status(400).json({ message: "Company cannot be empty" });
      }
      if (role !== undefined && !role.trim()) {
        return res.status(400).json({ message: "Role cannot be empty" });
      }
    }
    // shared validation
    if (status && !allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    next();
  };
}
