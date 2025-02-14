from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
import torch

# Set up the model pipeline
device = 0 if torch.cuda.is_available() else -1
classifier = pipeline(
    "text-classification",
    model="agentlans/snowflake-arctic-xs-grammar-classifier",
    device=device,
)

# Initialize FastAPI
app = FastAPI()

# Define input data format
class InputData(BaseModel):
    text: str

# Define route for prediction
@app.post("/predict")
def predict(data: InputData):
    result = classifier(data.text)
    return {"label": result[0]['label'], "confidence": result[0]['score']}
