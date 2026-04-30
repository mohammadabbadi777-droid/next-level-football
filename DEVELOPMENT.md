# Development Guide

## MVP Phase 1: Core Onboarding & Dashboard

### Week 1-2: Backend Setup
- [ ] Express API structure
- [ ] PostgreSQL database setup
- [ ] Authentication (JWT)
- [ ] User model & onboarding endpoints
- [ ] AI integration (OpenAI)

### Week 2-3: Frontend Setup
- [ ] Next.js project initialization
- [ ] Authentication flow
- [ ] Onboarding form
- [ ] Dashboard layout

### Week 3-4: Feature Integration
- [ ] AI player profile generation
- [ ] Player comparison to professionals
- [ ] Daily training generation
- [ ] Progress tracking

## MVP Phase 2: Training & AI Features
- [ ] Weekly training generator
- [ ] Match IQ scenarios
- [ ] AI voice coach integration
- [ ] Progress visualization

## MVP Phase 3: Polish & Launch
- [ ] Testing (unit + integration)
- [ ] Performance optimization
- [ ] Mobile responsiveness
- [ ] Documentation

## Running Locally

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- OpenAI API key

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Access at `http://localhost:3000`

## Database Setup

```bash
cd database
psql -U postgres -d next_level_football -f schema.sql
```

## Environment Variables

See `.env.example` files in backend and frontend directories.

## API Documentation

API endpoints documented in `docs/API.md`