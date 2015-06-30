import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setup(14, GPIO.OUT)

try:
    while True:
        a = raw_input()
        GPIO.output(14, a == "on")
except:
    GPIO.cleanup()
