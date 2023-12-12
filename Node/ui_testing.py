#L00150556
# Create Chrome driver
from selenium import webdriver
from selenium.webdriver.common.by import By

# Importing unittest
from unittest import TestCase

class Test_BookingandSignup(TestCase):
    
    def setUp(self):

        # Open the website
        self.driver = webdriver.Chrome()
        

    def test_booking_heading(self):

        #test on Bookings page 
        self.driver.get("http://localhost:3000/booking")
        h1 = self.driver.find_element(By.TAG_NAME, "h1")
        self.assertEqual(h1.text, "Hurlfit Booking")

        #Test on Signup page     
        self.driver.get("http://localhost:3000/signup") 

        #text method to retrieve the text on Signup button 
        button_locator = self.driver.find_element(By.XPATH, "//form/button" )

        button_text = button_locator.text
        self.assertEqual(button_text, "Sign Up")

    
        


        

     
        