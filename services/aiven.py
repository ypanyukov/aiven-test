import http.client
import json

class Aiven:
    def __init__(self):
        self.conn = http.client.HTTPSConnection("api.aiven.io")

    def clouds(self):
        self.conn.request("GET", "/v1/clouds")

        res = self.conn.getresponse()
        data = res.read()
        json_data = json.loads(data.decode("utf-8"))

        return json_data['clouds']
