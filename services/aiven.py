import http.client
import json

class Aiven:
    def __init__(self):
        self.domain = "api.aiven.io"

    def clouds(self):
        conn = http.client.HTTPSConnection(self.domain)
        conn.request("GET", "/v1/clouds")

        res = conn.getresponse()
        data = res.read()
        json_data = json.loads(data.decode("utf-8"))

        return json_data['clouds']
