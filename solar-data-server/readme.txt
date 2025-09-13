HOW TO RUN THE SERVER
- Rename env-example to .env and add your values for the environment variables
- Activate the venv from the root (mac) - source venv/bin/activate
- install all dependencies from requirements file by running pip3 install -r requirements.txt
- start the server by running uvicorn app.main:app --reload
- go to http://127.0.0.1:8000/docs to view api docs (swagger)