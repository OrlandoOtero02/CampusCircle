// report.js
const express = require('express');

const {
    getReports,
    getReport,
    createReport,
    deleteReport,
    updateReport,
    getReportsByUser,
    getResolvedReports,
    resolveReport,
} = require('../controllers/reportController'); // Assuming you have report controller functions
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Require authentication for all report routes
router.use(requireAuth);

// GET all reports
router.get('/', getReports);

// GET a single report
//router.get('/:id', getReport);

// GET reports submitted by the authenticated user
//router.get('/user', getReportsByUser);

// GET resolved reports
//router.get('/resolved', getResolvedReports);

// POST a new report
router.post('/', createReport);

// DELETE a report
router.delete('/:id', deleteReport);

// UPDATE a report
router.patch('/:id', updateReport);

// Mark a report as resolved
//router.patch('/resolve/:id', resolveReport);

module.exports = router;
