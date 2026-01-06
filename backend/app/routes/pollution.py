from fastapi import APIRouter
import requests

router = APIRouter(prefix="/pollution", tags=["pollution"])


AQICN_TOKEN = "709faf0abb6a700303678f2e4f26500e4a7b2140"

@router.get("/live")
def get_live_pollution(city: str):
    url = f"https://api.waqi.info/feed/{city}/"
    params = {"token": AQICN_TOKEN}

    response = requests.get(url, params=params, timeout=10)
    data = response.json()

    if data.get("status") != "ok":
        return {
            "city": city,
            "pm25": 0,
            "pm10": 0,
            "no2": 0,
            "lastUpdated": None
        }

    iaqi = data["data"].get("iaqi", {})
    time = data["data"].get("time", {}).get("s")

    pm25 = iaqi.get("pm25", {}).get("v", 0)
    pm10 = iaqi.get("pm10", {}).get("v", 0)
    no2  = iaqi.get("no2", {}).get("v", 0)

    return {
        "city": city,
        "pm25": pm25,
        "pm10": pm10,
        "no2": no2,
        "lastUpdated": time
    }
