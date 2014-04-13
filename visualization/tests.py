from django.test import TestCase
from visualization.models import VisualizationModelDescription
from django.test.client import Client


class VisualizationModelTests(TestCase):

    """This class deals with the testing of the visualization models"""
    def test_visualization_index_request(self):
        """
        Tests the response to the index request
        """
        client = Client()
        response = client.get('/')
        self.assertEqual(response.status_code, 200)




class AboutTests(TestCase):

    def test_network_response(self):
        """
        Tests the network response
        """
        client = Client()
        response = client.get('/about')
        self.assertEqual(response.status_code, 200, "The response should be a 200 not {}".format(response.status_code))
