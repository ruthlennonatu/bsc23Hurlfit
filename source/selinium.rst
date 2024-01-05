Test_BookingandSignup Selenium Test Script
==========================================

.. py:function:: Test_BookingandSignup

    This module contains Selenium test cases for the "Booking" and "Signup" pages.

    .. note::
        Before running the tests, make sure your Selenium WebDriver (Chrome driver) is properly installed and configured.

    .. py:method:: setUp()

        Set up the Selenium WebDriver and open the website.

    .. py:method:: test_booking_heading()

        Test the heading on the "Bookings" page.

        1. Open the "Bookings" page.
        2. Locate the h1 element.
        3. Assert that the heading text is "Hurlfit Booking".

        4. Open the "Signup" page.
        5. Locate the button element within the form.
        6. Retrieve the text on the Signup button.
        7. Assert that the button text is "Sign Up".
