# TradingAgents Frontend UI Design Guidelines

## Key Pages & Features

1. **Dashboard**
	- Overview of recent analyses and reports
	- Quick access to start a new analysis

2. **New Analysis Form**
	- Input for ticker symbol and analysis date
	- Analyst team selection (checkboxes or dropdowns)
	- Research depth selection (radio buttons)
	- LLM provider and model selection
	- Submit button

3. **Analysis Progress/Status**
	- Real-time or polling updates on analysis status
	- Progress bar or stepper for workflow stages

4. **Results/Reports Page**
	- Display generated reports (market, sentiment, investment plan, etc.)
	- Download or export options

5. **Authentication (if needed)**
	- Login/register forms

6. **Settings/Profile**
	- API key management
	- User preferences

7. **Navigation**
	- Sidebar or top navigation bar for easy access to all pages

---

- Use React (with Vite) in a separate `frontend/` directory.
- Communicate with backend via RESTful APIs.
- Plan for CORS and environment variable setup.
- Ensure backend exposes required endpoints for all frontend features.

---

*Reference this document before and during implementation for consistency and clarity.*
