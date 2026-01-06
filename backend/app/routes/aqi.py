import requests
from fastapi import APIRouter

router = APIRouter()

OPENAQ_URL = "https://api.openaq.org/v2/latest"

@router.get("/aqi/summary")
def get_real_aqi():
    params = {
        "country": "IN",
        "limit": 1,
        "parameter": ["pm25", "pm10", "no2"]
    }

    res = requests.get(OPENAQ_URL, params=params)
    data = res.json()

    measurements = data["results"][0]["measurements"]

    pm25 = pm10 = no2 = None

    for m in measurements:
        if m["parameter"] == "pm25":
            pm25 = round(m["value"])
        elif m["parameter"] == "pm10":
            pm10 = round(m["value"])
        elif m["parameter"] == "no2":
            no2 = round(m["value"])

    
    aqi = max(pm25 or 0, pm10 or 0, no2 or 0)

    return {
        "aqi": aqi,
        "pm25": pm25,
        "pm10": pm10,
        "no2": no2,
        "source": "OpenAQ"
    }
