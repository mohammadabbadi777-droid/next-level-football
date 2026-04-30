-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Players table
CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  age INT NOT NULL,
  position VARCHAR(50) NOT NULL,
  skill_level VARCHAR(50) NOT NULL,
  strengths TEXT[],
  weaknesses TEXT[],
  playing_style VARCHAR(255),
  comparison_type VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Player profiles (AI-generated)
CREATE TABLE player_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  professional_comparison VARCHAR(255),
  playing_style_description TEXT,
  key_strengths TEXT[],
  key_weaknesses TEXT[],
  improvement_focus TEXT[],
  ai_generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Training plans
CREATE TABLE training_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  plan_type VARCHAR(50) NOT NULL,
  plan_date DATE NOT NULL,
  exercises JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Training exercises
CREATE TABLE training_exercises (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  training_plan_id UUID NOT NULL REFERENCES training_plans(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  duration INT NOT NULL,
  description TEXT,
  steps TEXT[],
  difficulty INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Player progress
CREATE TABLE player_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  week INT NOT NULL,
  dribbling INT,
  speed INT,
  shooting INT,
  passing INT,
  weak_foot INT,
  decision_making INT,
  level VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Match IQ scenarios
CREATE TABLE match_iq_scenarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  situation TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer VARCHAR(100),
  explanation TEXT,
  tactical_reasoning TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Player Match IQ answers
CREATE TABLE player_match_iq_answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  scenario_id UUID NOT NULL REFERENCES match_iq_scenarios(id),
  user_answer VARCHAR(100),
  is_correct BOOLEAN,
  explanation TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI Feedback
CREATE TABLE ai_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  feedback_type VARCHAR(50),
  message TEXT NOT NULL,
  voice_url VARCHAR(500),
  style VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_players_user_id ON players(user_id);
CREATE INDEX idx_training_plans_player_id ON training_plans(player_id);
CREATE INDEX idx_player_progress_player_id ON player_progress(player_id);
CREATE INDEX idx_match_iq_player_id ON player_match_iq_answers(player_id);
CREATE INDEX idx_ai_feedback_player_id ON ai_feedback(player_id);
CREATE INDEX idx_users_email ON users(email);