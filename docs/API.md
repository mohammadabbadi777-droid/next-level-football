# API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### Auth

#### Register
- **POST** `/auth/register`
- **Body:** `{ email, password, name }`
- **Response:** `{ token, user }`

#### Login
- **POST** `/auth/login`
- **Body:** `{ email, password }`
- **Response:** `{ token, user }`

### Player

#### Get Player Profile
- **GET** `/player/profile/:id`
- **Response:** Player data with stats

#### Update Player Profile
- **PUT** `/player/profile/:id`
- **Body:** Updated player data
- **Response:** Updated player

#### Get Progress
- **GET** `/player/:id/progress`
- **Response:** Weekly/monthly progress data

### Training

#### Get Daily Training
- **GET** `/training/:playerId/daily`
- **Response:** Daily training plan

#### Get Weekly Training
- **GET** `/training/:playerId/weekly`
- **Response:** Weekly training plan

#### Complete Training
- **POST** `/training/:playerId/complete`
- **Body:** `{ trainingId }`
- **Response:** `{ success: true }`

### AI

#### Get Player Comparison
- **POST** `/ai/compare`
- **Body:** `{ playerId }`
- **Response:** Comparison to professional player

#### Get AI Coach Feedback
- **POST** `/ai/feedback`
- **Body:** `{ playerId }`
- **Response:** Text feedback and voice URL

#### Get Match IQ Scenario
- **GET** `/ai/match-iq/:playerId`
- **Response:** Decision-making scenario

#### Submit Match IQ Answer
- **POST** `/ai/match-iq/answer`
- **Body:** `{ playerId, scenarioId, answer }`
- **Response:** Evaluation and explanation

## Response Format

All successful responses follow this format:

```json
{
  "data": { ... },
  "message": "...",
  "timestamp": "2026-04-30T10:00:00Z"
}
```

## Error Format

All error responses:

```json
{
  "error": "Error message",
  "statusCode": 400,
  "timestamp": "2026-04-30T10:00:00Z"
}
```

## Status Codes

- `200` OK
- `201` Created
- `400` Bad Request
- `401` Unauthorized
- `403` Forbidden
- `404` Not Found
- `500` Internal Server Error