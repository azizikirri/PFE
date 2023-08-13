import express from 'express'
const router = express.Router()

// import user controllers 
import { authUser,registerUser,logoutUser,getUserProfile,updateUserProfile } from '../controllers/userController.js'

// import Quiz controllers 
import {postQuiz,getUserQuizs,deleteOneQuiz,passQuiz,storeQuizRes,fetchQuizsResPassedByUser,quiz,fetchPassedQuizForUSer} from '../controllers/QuizController.js'

import { protect } from '../middleware/authMiddleware.js'


//user
router.post('/auth', authUser)

router.post('/', registerUser)

router.post('/logout', logoutUser)

router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)


// quiz routers
router.post('/profile/create-quiz',protect,postQuiz)

router.get('/profile/get-user-quizs/:userId',protect,getUserQuizs)

router.delete('/profile/delete/:id',protect,deleteOneQuiz)

router.post('/pass-quiz',protect,passQuiz)

router.get('/quiz/:code',protect,quiz)

router.post('/quiz-res',protect,storeQuizRes)

router.get('/profile/fetch-quizes-res/:QuizId',protect,fetchQuizsResPassedByUser)

router.get('/profile/get-passed-quizes/:userId',protect,fetchPassedQuizForUSer)


export default router