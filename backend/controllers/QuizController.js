import asyncHandler from 'express-async-handler'
import Quiz from '../models/QuizModel.js'
import User from '../models/userModel.js'
import Res from '../models/ResModel.js'



// post quiz data
const postQuiz = asyncHandler(async(req,res)=>{
    const {quizTitle,quizCreatorEmail,quizCode,questions,time} = req.body
    const em = await User.findOne({email:quizCreatorEmail}).exec()  
    
    if(!em){
        res.status(400).json({
            message:'Not a Valid Email !'
        })
    if(!quizTitle || !quizCreatorEmail || !quizCode || !questions ||!time){
        res.status(400).json({
            message:"please fill the form to create your quiz"})
    }
    }else{
        const quiz= await Quiz.create({
            quizTitle:quizTitle,
            quizCreatorEmail,
            quizCode:quizCode,
            questions:questions,
            time
        })
        res.status(201).json({
            message:"quiz created",
            quiz,
        })

    }
    
})
// fetch all quizs
const getUserQuizs = asyncHandler(async(req,res)=>{  

    // get the creator of the quiz
    const userId = req.params.userId
    const userEmail = await User.findOne({_id:userId})
    const quizes = await Quiz.find({ quizCreatorEmail : userEmail.email })
    

    if(quizes) {

        res.status(201).json({
            data:quizes
        })

    } else {

        res.status(401)
        throw new Error('error while trying to fetch your quizes')
        
            }

})
// delete one quiz
const deleteOneQuiz = asyncHandler(async(req,res)  =>  {
    const quizId= req.params.id
    const deletedQuiz = await Quiz.findOneAndDelete({ _id: quizId })

    if (!deletedQuiz) {
        // No quiz found with the provided ID
        return res.status(404).json({ message: 'Quiz not found.' });
      }
  
      // Quiz successfully deleted
      return res.status(200).json({ message: 'Quiz deleted successfully.' });
    })

// get quiz data and pass the quiz
const passQuiz=asyncHandler(async(req,res) => {

    const {quizCode,userId} = req.body
    const q = await Quiz.findOne({quizCode})

   

    if(!q){
        res.status(400).json({ message:"Quiz Not Found, Invalid quiz code"})
    }

    const QuizExistID = q._id.toString()
    const r = await Res.findOne({ QuizId:QuizExistID,userId })
    

    // console.log(r);

    if (r) {
        return res.status(422).json({
                message: "You have already passed this quiz!",
      })
      
    }
    
    res.status(201).json(q)

    })

// store quiz res
const storeQuizRes = asyncHandler(async (req, res) => {
  const { userId, QuizId, QuizRes, quizTitle } = req.body;

  // Check if the user has already passed this specific quiz
  const existingQuizRes = await Res.findOne({ userId, QuizId });
  if (existingQuizRes) {
    return res.status(422).json({
      message: "You have already passed this quiz!",
    });
  }

  // Store the result for a new quiz
  try {
    const rr = await Res.create({
      userId,
      QuizId,
      QuizRes,
      quizTitle
    });

     // Find and remove duplicate objects
  
}
   catch (error) {
    if (error.code === 11000) {
      return res.status(422).json({
        message: "Duplicate error",
      });
    }
    
  }
  const duplicateRes = await Res.find({ userId, QuizId });
  if (duplicateRes.length > 1) {
    // Remove duplicates except for the most recent one
    const duplicateIds = duplicateRes.map((res) => res._id);
    const latestResId = duplicateIds.pop();
    await Res.deleteMany({ _id: { $in: duplicateIds } });

    res.status(201).json({
      message: `Your quiz result is: ${QuizRes}`,
      QuizId,
      userId,
      quizTitle
    });
  }
  res.json({
    message:'res submitted'
  })
});


const fetchQuizsResPassedByUser = asyncHandler(async (req, res) => {
    const { QuizId } = req.params;
    const q = await Res.find({ QuizId });
  
    if (!q) {
      res.status(422).json({
        message: 'Invalid user data',
      });
    } else {
      const userIds = q.map((result) => result.userId);
      const names = {};
  
      for (const userId of userIds) {
        const user = await User.findById(userId);
        if (user) {
          names[userId] = user.nom;
        }
      }
  
      const qWithNames = q.map((result) => ({
        ...result.toObject(),
        nom: names[result.userId],
      }));
  
      res.status(201).json({
        q: qWithNames,
      });
    }
  });
  

// his own Quizes in the profile 
const fetchPassedQuizForUSer = asyncHandler(async(req,res)=>{
    const {userId} = req.params
    const userQuizes = await Res.find({userId})

    if(!userQuizes || userQuizes.length==0){
        res.status(244).json({
            message:'No resaults Now, maybe you didn not Pass any quizes yet !'
        })
    }else{
        res.json({
            data:userQuizes 
        })
    }
})


// get quiz data
const quiz = asyncHandler(async(req,res)=>{
    const {code}= req.params
    const q = await Quiz.findOne({quizCode:code})
    if(!q){
        res.status(422).json({
            message:'quiz not found please insert a valid code'
        })
    }else{
        res.status(201).json({
             q,
        })
    }
    
})


export {
    postQuiz,
    getUserQuizs,
    deleteOneQuiz,
    passQuiz,
    storeQuizRes,
    fetchQuizsResPassedByUser,
    quiz,
    fetchPassedQuizForUSer
}

