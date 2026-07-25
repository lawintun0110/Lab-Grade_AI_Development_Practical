from flask import Flask, render_template, request, jsonify
import joblib
import os

app = Flask(__name__)

# ==============================
# Load Machine Learning Model
# ==============================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "employee_mood_model.pkl"
)

model = joblib.load(MODEL_PATH)


# ==============================
# Home Page
# ==============================

@app.route("/")
def home():

    employee = {
        "name": "Default User",
        "role": "ကသ-၁",
        "rank": "နည်းပြ",
        "ministry": "ပြည်ထောင်စုရာထူးဝန်အဖွဲ့",
        "photo": "images/default.png"
    }

    return render_template(
        "index.html",
        employee=employee
    )


# ==============================
# Chat Page
# ==============================

@app.route("/chat")
def chat():

    return render_template(
        "chat.html"
    )


# ==============================
# Prediction API
# ==============================

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    features = data["features"]

    prediction = model.predict(
        [features]
    )[0]


    if prediction == 1:

        message = (
            "ဝန်ထမ်း၏ စိတ်ခံစားချက် "
            "အခြေအနေ ကောင်းမွန်နိုင်ပါသည်။"
        )

    else:

        message = (
            "ဝန်ထမ်း၏ စိတ်ခံစားချက် "
            "အခြေအနေမှာ ညစ်ညူးနိုင်ပါသည်။"
        )


    return jsonify(
        {
            "result": message
        }
    )


# ==============================

if __name__ == "__main__":

    app.run(debug=True)
