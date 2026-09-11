import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import * as authCtrl from '../controllers/authController.js';
import * as exCtrl from '../controllers/exerciseController.js';
import * as progCtrl from '../controllers/programController.js';
import * as workCtrl from '../controllers/workoutController.js';
import * as statCtrl from '../controllers/progressController.js';

const router = express.Router();

// Health Check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', database: 'PostgreSQL (Supabase Singapore)', timestamp: new Date() });
});

// AUTH ROUTES
router.post('/auth/register', authCtrl.register);
router.post('/auth/login', authCtrl.login);
router.get('/users/me', authenticateToken, authCtrl.getMe);
router.patch('/users/me', authenticateToken, authCtrl.updateMe);

// EXERCISES
router.get('/exercises', exCtrl.getExercises);
router.get('/exercises/:id', exCtrl.getExerciseById);
router.post('/exercises', authenticateToken, exCtrl.createExercise);

// PROGRAMS
router.get('/programs', authenticateToken, progCtrl.getPrograms);
router.get('/programs/:id', authenticateToken, progCtrl.getProgramById);
router.post('/programs', authenticateToken, progCtrl.createProgram);

// WORKOUTS & SET LOGGING FLOW (Section 18)
router.get('/workouts', authenticateToken, workCtrl.getWorkouts);
router.post('/workouts', authenticateToken, workCtrl.startWorkout);
router.post('/workouts/:workoutId/exercises', authenticateToken, workCtrl.addExerciseToWorkout);
router.post('/workout-exercises/:workout_exercise_id/sets', authenticateToken, workCtrl.logSet);
router.post('/workouts/:id/complete', authenticateToken, workCtrl.completeWorkout);

// PROGRESS & STATS
router.get('/progress/strength', authenticateToken, statCtrl.getStrengthProgress);
router.get('/progress/volume', authenticateToken, statCtrl.getVolumeProgress);
router.get('/goals', authenticateToken, statCtrl.getGoals);
router.post('/goals', authenticateToken, statCtrl.createGoal);

export default router;
