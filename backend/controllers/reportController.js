// reportController.js
const Report = require('../models/reportModel');

// Get all reports
const getReports = async (req, res) => {
  try {
      const reports = await Report.find({ isResolved: false });
      res.status(200).json({ reports });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// Get a single report by ID
const getReportById = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json({ report });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new report
const createReport = async (req, res) => {
    //const { user_id, content } = req.body;
    const reportMessage = req.body


    try {
    const bodyarr = JSON.stringify(reportMessage).split("\"")

        const newReport = new Report({
            user_id: bodyarr[7],
            content: "Report comment: " + bodyarr[3],
        });

        const savedReport = await newReport.save();
        console.log(savedReport)
        res.status(201).json({ report: savedReport });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a report by ID
const deleteReport = async (req, res) => {
    try {
        const deletedReport = await Report.findByIdAndDelete(req.params.id);
        if (!deletedReport) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a report by ID
const updateReport = async (req, res) => {
    const { content, imageUrls, location } = req.body;

    try {
        const updatedReport = await Report.findByIdAndUpdate(
            req.params.id,
            { content, imageUrls, location },
            { new: true }
        );

        if (!updatedReport) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.status(200).json({ report: updatedReport });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const resolveReport = async (req, res) => {
  try {
    const resolvedReport = await Report.findByIdAndUpdate(
      req.params.id,
      { isResolved: true },
      { new: true }
    );

    if (!resolvedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.status(200).json({ report: resolvedReport });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    getReports,
    getReportById,
    createReport,
    deleteReport,
    updateReport,
    resolveReport,
};
