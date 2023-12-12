#L00150556
# Create Chrome driver
from selenium import webdriver
from selenium.webdriver.common.by import By

# Importing unittest
from unittest import TestCase

class Test_Bookings(TestCase):
    
    def setUp(self):

        # Open the website
        self.driver = webdriver.Chrome()
        self.driver.get("http://localhost:3000/booking")

    def test_booking_heading(self):
        h1 = self.driver.find_element(By.TAG_NAME, "h1")
        self.assertEqual(h1.text, "Hurlfit Booking")

        

     
        