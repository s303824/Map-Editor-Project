const Report = require('../model/report-model')

sendReport = async(req, res) => {
    const {report, mapInfo_id} = req.body;

    const newReport = new Report({report: report, mapInfo_id: mapInfo_id})
    Report.create(newReport)
    return res.status(200).json({
        success:true
    })
}

module.exports = {
    sendReport
}