const beatService = require('./beat.service')
const logger = require('../../services/logger.service')

async function getBeat(req, res) {
    const beat = await beatService.getById(req.params.id)
    res.send(beat)
}
  
async function getBeats(req, res) {
    console.log(req.query);
    const beats = await beatService.query(req.query)
    logger.debug(beats);
    res.send(beats)
}

async function deleteBeat(req, res) {
    await beatService.remove(req.params.id)
    res.end()
}

async function updateBeat(req, res) {
    const beat = req.body;
    await beatService.update(beat)
    res.send(beat)
}

module.exports = {
    getBeat,
    getBeats,
    deleteBeat,
    updateBeat
}