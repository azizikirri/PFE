import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    quizData: localStorage.getItem('quizData') ? JSON.parse(localStorage.getItem('quizData')) : null
}

const quizSlice = createSlice({
    name:'quiz',
    initialState,
    reducers:{
        setQuizData: (state,action) =>{
            state.userInfo = action.payload ;   //user data (nom , prenom,_id)
            localStorage.setItem('quizData',JSON.stringify(action.payload)) 
        },

    }
})

export const {setQuizData} = quizSlice.actions

export default quizSlice.reducer