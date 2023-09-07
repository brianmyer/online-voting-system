const router = require('express').Router();
const { Poll, Question, Response, User } = require('../../models');
const withAuth = require('../../utils/auth');

//get ALL polls (not specific to user)
// router.get('/', async (req, res) => {
//   try {
//     const pollData = await Poll.findAll({
//       include: [{ model: Question,  include: [{model: Response}]}   
//       ]});
//     res.status(200).json(pollData)
//   } 
//   catch (err) {
//   res.status(500).json(err);
//   }
// });


router.get('/', async (req, res) => {
  try {
    const pollData = await Poll.findAll( { 
      where: {user_id: req.session.user_id},
      include: [{ model: Question,  include: [{model: Response}]}   
      ]});
    res.status(200).json(pollData)
  } 
  catch (err) {
  res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const pollData = await Poll.findOne( { 
      where: {user_id: req.session.user_id, id: req.params.id},
      include: [{ model: Question,  include: [{model: Response}]}   
      ]});
    res.status(200).json(pollData)
  } 
  catch (err) {
  res.status(500).json(err);
  }
});

router.post('/',  async (req, res) => {
  try {
    const newPoll = await Poll.create(req.body);

    res.status(200).json(newPoll);
  } catch (err) {
    res.status(400).json(err);
  }
});






router.delete('/:id', async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
