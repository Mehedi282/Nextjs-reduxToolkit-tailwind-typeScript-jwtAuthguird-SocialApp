import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state interface
interface SubmissionState {
  submissionSuccess: boolean;
}

// Define the initial state
const initialState: SubmissionState = {
  submissionSuccess: false,
};

const submissionSlice = createSlice({
  name: 'submission',
  initialState,
  reducers: {
    setSubmissionSuccess(state, action: PayloadAction<boolean>) {
      state.submissionSuccess = action.payload;
    },
    resetSubmissionSuccess(state) {
      state.submissionSuccess = false;
    },
  },
});

// Export actions
export const { setSubmissionSuccess, resetSubmissionSuccess } = submissionSlice.actions;

// Selectors
export const selectSubmissionSuccess = (state: { submission: SubmissionState }) => state.submission.submissionSuccess;

// Export the reducer
export default submissionSlice.reducer;
